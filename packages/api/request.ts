import type { Method } from 'alova'
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'

import vueHook from 'alova/vue'

// export * from 'alova'
export * from 'alova/client'

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: CustomMeta
  }
}

export interface CustomMeta {
  /** 是否过滤data */
  original?: true
  /** blob */
  blob?: boolean
  /** 是否隐藏错误提示 */
  hideAlert?: true
}

export const alova = createAlova({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  statesHook: vueHook,
  // 默认只缓存get请求 cacheFor
  cacheFor: {
    GET: 1000 * 60 * 1, // 1min
  },
  requestAdapter: adapterFetch(),
  // beforeRequest: (config) => {
  // },
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
                errorHandler(res.msg, instance)
              }
              return Promise.reject(res.msg)
            }
          }
        }
        else {
          if (instance.meta?.hideAlert !== true) {
            errorHandler(response.statusText, instance)
          }
          return Promise.reject(response.statusText)
        }
      }
    },
    onError: (error, instance) => {
      if (instance.meta?.hideAlert !== true) {
        errorHandler(error.message, instance)
      }
      return Promise.reject(error)
    },
  },
})

function errorHandler(message: string, instance: Method) {
  console.error(`${instance.url} requestError:`, message)
  window.errAlert(message, instance)
}

export type Instance = Method

export default alova
