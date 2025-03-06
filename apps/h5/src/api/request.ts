import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import vueHook from 'alova/vue'
import { showFailToast } from 'vant'

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

// 默认只缓存get请求 cacheFor
const alovaInstance = createAlova({
  baseURL: '/api',
  timeout: 5000,
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
              if (instance.meta?.hideAlert !== true) {
                showFailToast(res.message)
              }
              return Promise.reject(res.msg)
            }
          }
        }
      }
      else {
        if (instance.meta?.hideAlert !== true) {
          showFailToast(response.statusText)
        }
        return Promise.reject(response.statusText)
      }
    },
    onError: (error, instance) => {
      if (instance.meta?.hideAlert !== true) {
        showFailToast(error.message)
      }
      return Promise.reject(error)
    },
  },
})

export default alovaInstance
