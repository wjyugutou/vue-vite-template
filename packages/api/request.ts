import type { Method, RespondedHandler, RespondedHandlerRecord } from 'alova'
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import vueHook from 'alova/vue'

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

export interface Interceptor {
  beforeRequest?: (config: Method) => void
  responded?: RespondedHandler<any>
}

const interceptor: Interceptor = {
  beforeRequest: undefined,
  responded: undefined,
}

// 设置拦截器
export function setInterceptor(ic: typeof interceptor) {
  interceptor.beforeRequest = ic.beforeRequest
  interceptor.responded = ic.responded
}

console.log('createAlova')

const alova = createAlova({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  statesHook: vueHook,
  // 默认只缓存get请求 cacheFor
  cacheFor: {
    GET: 1000 * 60 * 1, // 1min
  },
  requestAdapter: adapterFetch(),
  beforeRequest: (config) => {
    interceptor.beforeRequest?.(config)
  },
  responded: (response, instance) => {
    return interceptor.responded?.(response, instance)
  },
})

export type Instance = Method

export default alova
