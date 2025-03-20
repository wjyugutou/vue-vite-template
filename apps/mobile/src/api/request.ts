import { setInterceptor } from 'api'

setInterceptor({
  beforeRequest: (config) => {
    console.log('beforeRequest', config)
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
                console.error(`${instance.url}: ${res.msg}`)
                showFailToast(res.msg)
              }
              return Promise.reject(res.msg)
            }
          }
        }
        else {
          return response
        }
      }
      else {
        if (instance.meta?.hideAlert !== true) {
          console.error(`${instance.url}: ${response.statusText}`)
          showFailToast(response.statusText)
        }
        return Promise.reject(response.statusText)
      }
    },
    onError: (error, instance) => {
      if (instance.meta?.hideAlert !== true) {
        console.error(`${instance.url}: ${error.message}`)
        showFailToast(error.message)
      }
      return Promise.reject(error)
    },
  },
})
