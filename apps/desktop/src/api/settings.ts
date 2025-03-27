import router from '@/router'
import { setInterceptor } from 'api'

const codeMap: Record<string, string> = {
  401: '请先登录',
  403: '您没有权限访问',
  404: '请求的资源不存在',
  500: '服务器内部错误',
}

setInterceptor({
  beforeRequest: (method) => {
    method.config.headers.Authorization = `Bearer ${useToken()}`
  },
  responded: {
    onSuccess: async (response, instance) => {
      if (response.status === 200 && response.ok) {
        if (instance.meta?.blob) {
          return await response.blob()
        }
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          const res = await response.json()

          if (res.code === 200) {
            return instance.meta?.original ? res : res.data
          }
          else {
            ElMessage.error(`${instance.url}: ${codeMap[res.code as string] || res.msg}`)

            if (res.code === 401) {
              router.push({
                path: '/login',
                query: {
                  redirect: router.currentRoute.value.fullPath,
                },
              })
            }
            return Promise.reject(res)
          }
        }

        return await response.text()
      }
      else {
        ElMessage.error(`${instance.url}: ${response.statusText}`)
        return Promise.reject(response)
      }
    },
    onError: (error, instance) => {
      ElMessage.error(`${instance.url}: ${error.message}`)
      return Promise.reject(error)
    },
  },
})
