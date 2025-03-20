import type { RouteRecordRawC } from './type'
import Error from '@/pages/Error.vue'
import NProgress from 'nprogress'
import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes, { ErrorRoute } from './routes'

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
export function resetRouter(routes: RouteRecordRawC[], parentName: RouteRecordRawC['name'] = 'Index', suffix: string = '') {
  routes.forEach((route) => {
    const component = route.component
    route.path = suffix ? `${suffix}/${route.path}` : route.path
    if (component) {
      route.component = getComponent(route)
      router.addRoute(parentName, route)
    }

    if (route.children) {
      // 组件不存在，说明是菜单
      resetRouter(route.children, component ? route.name : undefined, component ? '' : route.path)
    }
  })
  // 最后添加Error路由
  router.addRoute(ErrorRoute)
}

const allView = import.meta.glob(['@/pages/**/*.vue', '!@/pages/*.vue'])

function getComponent(route: RouteRecordRawC) {
  const component = route.component

  if (typeof component === 'string') {
    const view = allView[`/src/pages/${component}.vue`]
    if (view) {
      return view
    }
    else {
      return h(Error, {
        title: `Path: ${route.path}`,
      })
    }
  }
  else {
    return h(Error, {
      title: `Path: ${route.path}`,
    })
  }
}
