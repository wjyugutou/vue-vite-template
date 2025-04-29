import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

export type Result<T = any, B = object> = Promise<{
  code: number
  msg: string
  data: T
  [key: string]: any
} & B>

export interface CustomConfig {
  /** 是否需要设置token */
  isToken?: boolean
  /** 是否需要显示错误提示 */
  showMsg?: boolean
  // loading?: boolean
  // headers?: Record<string, any>
  /** 原始输出 */
  original?: boolean
  /** blob */
  blob?: boolean
}

export type RequestConfig = AxiosRequestConfig & CustomConfig

export type InterceptorsConfig = InternalAxiosRequestConfig & CustomConfig

export interface InterceptorsResponse extends AxiosResponse {
  config: InterceptorsConfig
}

export const baseURL = import.meta.env.VITE_API_BASE_URL

export const request = axios.create({
  baseURL, // url = base url + request url
  timeout: 15000, // request timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use(
  (config: InterceptorsConfig) => {
    console.log('请求拦截器1111 config', config)

    return config
  },
  (error) => {
    console.error('请求拦截器 error', error)

    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response: InterceptorsResponse) => {
    console.log('响应拦截器 111')

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
      return Promise.reject(res)
    }
  },
  (error) => {
    console.error({ error })

    // alert((`${error.message} 服务器错误，请重试`))

    return Promise.reject(error)
  },
)

export function get<T = unknown, B = object>(url: string, config?: RequestConfig): Result<T, B> {
  return request.get(url, config)
}

export function post<T = unknown, B = object>(url: string, data?: any, config?: RequestConfig): Result<T, B> {
  return request.post(url, data, config)
}

export function put<T = unknown, B = object>(url: string, data?: any, config?: RequestConfig): Result<T, B> {
  return request.put(url, data, config)
}

export function del<T = unknown, B = object>(url: string, config?: RequestConfig): Result<T, B> {
  return request.delete(url, config)
}
