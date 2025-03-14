import type { RouteRecordRawC } from './type'
import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import routes, { NotFoundRoute } from './routes'

const router = createRouter({
  routes,
  // routes,
  history: createWebHistory(),
})

export default router

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

/**
 * 注册动态路由
 */
export function resetRouter(routes: RouteRecordRawC[], parentName: RouteRecordRawC['name'] = 'Index') {
  routes.forEach((route) => {
    route.component = () => import(`@/pages/test.vue`)
    router.addRoute(parentName, route)
    if (route.children) {
      resetRouter(route.children, route.name)
    }
  })
  router.addRoute(NotFoundRoute)
}
