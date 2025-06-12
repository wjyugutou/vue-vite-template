import type { InterceptorsConfig, InterceptorsResponse } from '@repo/api'
import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { request } from '@repo/api'

request.interceptors.request.use(
  (config: InterceptorsConfig) => {
    // 是否需要设置 token
    const isToken = config.isToken !== false

    // if (isToken) {
    //   const token = useToken().access_token

    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}` // 让每个请求携带自定义token 请根据实际情况自行修改
    //   }
    // }

    console.log('请求拦截器2222 config', config)

    return config
  },
  (error) => {
    console.error(error)

    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response: InterceptorsResponse) => {
    const showMsg = response.config.showMsg ?? true
    console.log('响应拦截器 222')

    const res = response.data

    if (res instanceof Blob) {
      return response.data
    }
    else if (res.code === 200) {
      return res.data
    }
    else {
      // showMsg && alert(res.msg || '网络错误，请重试')

      if (res.code === 401) {
        // router.push('/login')
        // return null
      }
      return null
    }
  },
  (error) => {
    console.error({ error })

    // alert((`${error.message} 服务器错误，请重试`))

    return null
  },
)

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
