import type { Method, RespondedHandlerRecord } from 'alova'
import { handleParams } from '@repo/utils'
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import vueHook from 'alova/vue'

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: CustomMeta
  }
}

export interface CustomMeta {
  /** 是否携带token */
  token?: false
  /** 是否过滤data */
  original?: true
  /** blob */
  blob?: boolean
  /** 是否隐藏错误提示 */
  hideAlert?: true
}

export interface Interceptor {
  beforeRequest?: (config: Method) => void
  responded?: RespondedHandlerRecord<any>
}

const codeMap: Record<string, string> = {
  401: '请先登录',
  403: '您没有权限访问',
  404: '请求的资源不存在',
  500: '服务器内部错误',
}

const alova = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  statesHook: vueHook,
  // 默认只缓存get请求 cacheFor
  cacheFor: {
    GET: 1000 * 60 * 1, // 1min
  },
  requestAdapter: adapterFetch(),
  beforeRequest: (method) => {
    // 请求需要携带cookie
    // method.config.credentials = 'include'

    if (method.config.params) {
      method.config.params = handleParams(method.config.params)
    }
    method.config.headers.Authorization = `Bearer ${useToken()}`
  },
  responded: {
    onSuccess: async (response, instance) => {
    },
    onError: (error, instance) => {
      ElMessage.error(`${instance.url}: ${error.message}`)
      return Promise.reject(error)
    },
  },
})

export type Instance = Method

export default alova
