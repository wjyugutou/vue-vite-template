import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import vueHook from 'alova/vue'

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
    // console.log('beforeRequest', config)
    // const token = localStorage.getItem('token')
    // if (token)
    // config.config.headers.Authorization = `Bearer ${token}`
  },
  responded: {
    onSuccess: async (response, instance) => {
      if (response.status === 200 && response.ok) {
        if (instance.meta?.blob) {
          return {
            data: response.blob(),
            fileName: response.headers.get('content-disposition')?.split('filename=')[1],
          }
        }
        else {
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
                ElMessage.error(res.message)
              }
              return Promise.reject(res.message)
            }
          }
        }
      }
      else {
        if (instance.meta?.hideAlert !== true) {
          ElMessage.error(response.statusText)
        }
        return Promise.reject(response.statusText)
      }
    },
    onError: (error, instance) => {
      if (instance.meta?.hideAlert !== true) {
        ElMessage.error(error.message)
      }
      return Promise.reject(error)
    },
  },
})

export default alovaInstance
