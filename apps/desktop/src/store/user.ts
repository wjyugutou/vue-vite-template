import type { RouteRecordRawC } from '@/router/type'
import { resetRouter } from '@/router'
import { basicRoutes } from '@/router/routes'
import { getUserMenuApi } from 'api'

interface UserState {
  userInfo: {
    name: string
    age: number
    email: string
  }
  routes: RouteRecordRawC[]
  menus: RouteRecordRawC[]
  roles: string[]
  permissions: string[]
}

export const useUserStore = defineStore('user', {
  // 持久化
  state: () => ({
    userInfo: useLocalStorage('user-userInfo', {
      // Define your state properties here
      name: '',
      age: 0,
      email: '',
    }),
    routes: [] as RouteRecordRawC[],
    menus: [] as RouteRecordRawC[],
    roles: [] as string[],
    permissions: [] as string[],
  }),
  getters: {
    // Define your getters here

  },
  actions: {
    // Define your actions here
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo
    },
    async getUserRoutes() {
      const userRoutes = (await getUserMenuApi<RouteRecordRawC>()).data
      this.routes = userRoutes

      const menus = [...basicRoutes].find(item => item.name === 'Index')!.children!.concat(userRoutes)
      this.menus = menus

      resetRouter(userRoutes)
    },
  },
})
