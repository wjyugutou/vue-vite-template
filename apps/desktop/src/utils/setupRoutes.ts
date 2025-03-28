import type { RouteRecordRawC } from '@/router/type'
import type { RouterResult, RouterResultItem } from '@repo/api'
import type { RouteComponent } from 'vue-router'
import ErrorComponent from '@/pages/Error.vue'
import router from '@/router'
import { ErrorRoute } from '@/router/routes'

/**
 * 注册动态路由
 */
export function setupRoutes(routes: RouterResult) {
  addRoute(routes)
  // // 最后添加Error路由
  router.addRoute(ErrorRoute)
}

function addRoute(routes: RouterResult, parentName: string = 'Index', suffix?: string) {
  routes.forEach((route) => {
    const component = getComponent(route)
    if (component) {
      const _route: RouteRecordRawC = {
        name: route.name,
        meta: route.meta,
        path: suffix ? `${suffix}/${route.path}` : route.path,
        component,
      }
      router.addRoute(parentName, _route)
    }

    if (route.children) {
      // 组件不存在，说明是菜单
      addRoute(route.children, component ? route.name : undefined, component ? '' : route.path)
    }
  })
}

const allView = import.meta.glob(['@/pages/**/*.vue'])

function getComponent(route: RouterResultItem): RouteComponent | null {
  const component = route.component
  if (typeof component === 'string') {
    if (component === 'Layout') {
      return null
    }

    const view = allView[`/src/pages/${component}.vue`] || allView[`/src/pages/${component}/index.vue`]

    if (view) {
      return view
    }
    else {
      return h(ErrorComponent, {
        title: `Path: ${route.path}`,
      })
    }
  }
  else {
    return h(ErrorComponent, {
      title: `Path: ${route.path}`,
    })
  }
}
