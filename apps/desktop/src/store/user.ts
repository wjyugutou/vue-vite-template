import type { RouteRecordRawC } from '@/router/type'
import type { LoginResult, UserInfo } from 'api'
import router, { resetRouter } from '@/router'
import { basicRoutes } from '@/router/routes'
import { getUserMenuApi, logoutApi, userInfoApi } from 'api'

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
    routes: [] as RouteRecordRawC[],
    menus: [] as RouteRecordRawC[],
    roles: [] as string[],
    permissions: [] as string[],
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
      const userRoutes = (await getUserMenuApi<RouteRecordRawC>()).data
      this.routes = userRoutes

      const menus = [...basicRoutes].find(item => item.name === 'Index')!.children!.concat(userRoutes)
      this.menus = menus

      resetRouter(userRoutes)
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
