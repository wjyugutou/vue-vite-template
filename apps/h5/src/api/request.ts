import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import vueHook from 'alova/vue'

export interface CustomMeta {
  /** 是否过滤data */
  original?: true
  /** blob */
  blob?: boolean
}

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: CustomMeta
  }
}

// 默认只缓存get请求 cacheFor
const alovaInstance = createAlova({
  baseURL: '/api',
  timeout: 10000,
  statesHook: vueHook,
  cacheFor: {
    GET: 1000 * 60 * 1, // 1min
    POST: 1000 * 60 * 1, // 1min
  },
  requestAdapter: adapterFetch(),
  beforeRequest: (config) => {
    console.log('beforeRequest', config)
    // const token = localStorage.getItem('token')
    // if (token)
    // config.config.headers.Authorization = `Bearer ${token}`
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
              return Promise.reject(res.msg)
            }
          }
        }
      }
    },
    onError: (error) => {
      return Promise.reject(error)
    },
  },
})

export default alovaInstance
