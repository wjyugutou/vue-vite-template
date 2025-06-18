import type { InterceptorsConfig, InterceptorsResponse } from '@repo/api'
import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { request } from '@repo/api'
import { ElMessage } from 'element-plus'
import router from '@/router'

request.interceptors.request.use(
  (config: InterceptorsConfig) => {
    console.log('请求拦截器desktop', config)

    // 是否需要设置 token
    const isToken = config.isToken !== false

    console.log('isToken', isToken)

    if (isToken) {
      const token = useToken()

      console.log('token', token)

      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`)
        // .Authorization = `Bearer ${token}` // 让每个请求携带自定义token 请根据实际情况自行修改
      }
    }

    config.alertFn = (type, message) => {
      ElMessage({
        type,
        message,
      })
    }
    config.unLoginFn = () => {
      console.log('未登录', window.location.href)

      router.push('/login')
    }
    console.log('请求拦截器desktop----end', config)

    return config
  },
  (error) => {
    console.error(error)

    return Promise.reject(error)
  },
)

// request.interceptors.response.use(
//   (response: InterceptorsResponse) => {
//     console.log('响应拦截器desktop', response)

//     if (response.config) {
//     }

//   },
//   (error) => {
//     console.error({ error })

//     // alert((`${error.message} 服务器错误，请重试`))

//     return null
//   },
// )

export const vueQuerySettings: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        enabled: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  },
}
