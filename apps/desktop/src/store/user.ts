import type { RouteRecordRawC } from '@/router/type'
import type { LoginResult, UserInfo } from '@repo/api'
import router from '@/router'
import { logoutApi, userInfoApi, userRouterApi } from '@repo/api'

interface UserState {
  userInfo: UserInfo | null
  routes: RouteRecordRawC[]
  menus: RouteRecordRawC[]
  roles: string[]
  permissions: string[]
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    routes: [],
    menus: [],
    roles: [],
    permissions: [],
  }) as UserState,
  getters: {
  },
  actions: {
    async login(data: LoginResult) {
      try {
        useToken(data.access_token)
      }
      catch (error) {
      }
    },
    async logout() {
      try {
        await logoutApi()
        useToken(true)
        this.userInfo = null
        this.routes = []
        this.menus = []
        this.roles = []
        this.permissions = []
        router.replace('/login')
      }
      catch (error) {
      }
    },
    // Define your actions here
    async getUserInfo() {
      try {
        const res = await userInfoApi()

        this.userInfo = res.user
        this.permissions = res.permissions
        this.roles = res.roles
      }
      catch (error) {
        this.logout()
        // 返回错误，让路由终止跳转
        return Promise.reject(error)
      }
    },
    async getUserRoutes() {
      const userRoutes = (await userRouterApi())

      this.routes = userRoutes

      const menus = setupMenu(userRoutes)
      this.menus = menus

      setupRoutes(structuredClone(userRoutes))
    },
  },
  persist: [
    {
      key: 'user-info',
      pick: ['userInfo'],
      storage: localStorage,
    },
  ],
})
