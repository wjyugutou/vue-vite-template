import type { Method } from 'alova'
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import vueHook from 'alova/vue'
import options from 'virtual:request-options'

export interface CustomMeta {
  /** 是否过滤data */
  original?: true
  /** blob */
  blob?: boolean
  /** 是否隐藏错误提示 */
  hideAlert?: true
}

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: CustomMeta
  }
}

export interface Options {
  baseURL?: string
  timeout?: number
  msgField?: string
  alertErr?: (msg: string) => void
  beforeRequest?: (method: Method) => void | Promise<void>
}

const defaultOptions: Options = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  msgField: 'msg',
  alertErr: msg => console.error('requestError:', msg),
}

const _options = {
  ...defaultOptions,
  ...options,
}

const alova = createAlova({
  baseURL: _options?.baseURL ?? defaultOptions.baseURL,
  timeout: _options?.timeout ?? defaultOptions.timeout,
  statesHook: vueHook,
  // 默认只缓存get请求 cacheFor
  cacheFor: {
    GET: 1000 * 60 * 1, // 1min
  },
  requestAdapter: adapterFetch(),
  beforeRequest: (config) => {
    _options?.beforeRequest?.(config)
  },
  responded: {
    onSuccess: async (response, instance) => {
      if (response.status === 200 && response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
          const res = await response.json()
          if (instance.meta?.original === true) {
            return res
          }
          else {
            if (res.code === 200) {
              return res.data
            }
            else {
              if (instance.meta?.hideAlert !== true) {
                console.log('res', res)

                _options?.alertErr?.(res[_options?.msgField])
              }
              return Promise.reject(res.msg)
            }
          }
        }
        else {
          if (instance.meta?.hideAlert !== true) {
            _options?.alertErr?.(response.statusText)
          }
          return Promise.reject(response.statusText)
        }
      }
    },
    onError: (error, instance) => {
      if (instance.meta?.hideAlert !== true) {
        _options?.alertErr?.(error.message)
      }
      return Promise.reject(error)
    },
  },
})

export default alova
