import { setInterceptor } from 'api'

setInterceptor({
  // beforeRequest: (config) => {
  //   console.log('beforeRequest', config)
  // },
  responded: {
    onSuccess: async (response, instance) => {
      if (response.status === 200 && response.ok) {
        if (instance.meta?.blob) {
          return await response.blob()
        }
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          const res = await response.json()

          if (res.code === 200) {
            return res.data
          }
          else {
            ElMessage.error(`${instance.url}: ${res.msg}`)
            return Promise.reject(res.msg)
          }
        }

        return await response.text()
      }
      else {
        ElMessage.error(`${instance.url}: ${response.statusText}`)
        return Promise.reject(response.statusText)
      }
    },
    onError: (error, instance) => {
      ElMessage.error(`${instance.url}: ${error.message}`)
      return Promise.reject(error.message)
    },
  },
})
