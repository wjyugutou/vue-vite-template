import type { LoginResult, RouterResult, UserInfo } from '@repo/api'
import type { RouteRecordRawC } from '@/router/type'
import { logoutApi, userInfoApi, userRouterApi } from '@repo/api'
import router from '@/router'

interface UserState {
  userInfo: UserInfo | null
  routes: RouterResult
  menus: RouteRecordRawC[]
  roles: string[]
  permissions: string[]
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    routes: [],
    menus: setupMenu([]),
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

        const { menuState, tags } = storeToRefs(useAppStore())
        menuState.value.openeds = []
        menuState.value.active = ''
        // 退出登录清空路由
        clearRoutes(this.routes)
        // 退出登录清空tags
        tags.value = [{ path: '/', title: '首页' }]

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

      this.menus = setupMenu(userRoutes)
      setupRoutes(userRoutes)
    },
  },
  persist: [
    { key: 'user-info', pick: ['userInfo'], storage: localStorage },
  ],
})
