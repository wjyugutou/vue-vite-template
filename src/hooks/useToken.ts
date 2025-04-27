import Cookies from 'universal-cookie'

// const tokenKey = 'token'
const cookiesKey = 'token'

const cookies = new Cookies(null, { path: '/' })

export function useToken(token?: string | true) {
  if (typeof token === 'string') {
    cookies.set(cookiesKey, token)
  }
  else if (token === true) {
    cookies.remove(cookiesKey)
  }
  else {
    return cookies.get(cookiesKey)
  }
}
