import type { RouterResult, RouterResultItem } from '@repo/api'
import router from '@/router'
import { ErrorRoute } from '@/router/routes'

/**
 * 注册动态路由
 */
export function setupRoutes(routes: RouterResult, parentName: string = 'Index', suffix: string = '') {
  routes.forEach((route) => {
    const component = route.component
    route.path = suffix ? `${suffix}/${route.path}` : route.path
    if (component) {
      route.component = getComponent(route)
      router.addRoute(parentName, route)
    }

    if (route.children) {
      // 组件不存在，说明是菜单
      setupRoutes(route.children, component ? route.name : undefined, component ? '' : route.path)
    }
  })
  // 最后添加Error路由
  router.addRoute(ErrorRoute)
}

const allView = import.meta.glob(['@/pages/**/*.vue'])

function getComponent(route: RouterResultItem) {
  const component = route.component
  if (typeof component === 'string') {
    const view = allView[`/src/pages/${component}.vue`] || allView[`/src/pages/${component}/index.vue`]

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
