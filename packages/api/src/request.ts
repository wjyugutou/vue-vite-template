import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

export type Result<T = any, B = object> = Promise<T & B>

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
  // 提示函数 desktop,mobile 内部实现
  alertFn?: (type: 'warning' | 'error', msg: string) => void
  // 未登录
  unLoginFn?: () => void
  [key: string]: any
}

export type RequestConfig = AxiosRequestConfig & CustomConfig

export type InterceptorsConfig = InternalAxiosRequestConfig & CustomConfig

export interface InterceptorsResponse extends AxiosResponse {
  config: InterceptorsConfig
}

// export

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
    console.log('请求拦截器@repo/api', config)
    config.headers.set('dddddd', 'aaaaaa')
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response: InterceptorsResponse) => {
    const config = response.config

    const res = response.data

    if (config.original) {
      return res
    }

    if (res instanceof Blob) {
      return response.data
    }
    else if (res.code === 200) {
      return res.data
    }
    else {
      if (config.showMsg) {
        config.alertFn?.('error', res.msg || '网络错误，请重试')
      }

      if (res.code === 401) {
        config.unLoginFn?.()
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
