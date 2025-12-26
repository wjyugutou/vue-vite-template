/**
 * 根据接口返回路由数组注册动态路由
 */

import type { RouterResult, RouterResultItem } from '@repo/api'
import type { RouteComponent } from 'vue-router'
import type { RouteRecordRawC } from '@/router/type'
import ErrorComponent from '@/pages/Error.vue'
import router from '@/router'

function hasPermission(permissions: string[]) {
  return permissions.some((permission) => {
    return useUserStore().permissions.includes(permission)
  })
}

function hasRole(roles: string[]) {
  return roles.some((role) => {
    return useUserStore().roles.includes(role)
  })
}

/**
 * 注册动态路由
 */
export function setupRoutes(routes: RouterResult) {
  addRoute(routes)
}

/**
 * 退出登录清空路由
 */
export function clearRoutes(routes: RouterResult) {
  routes.forEach((route) => {
    router.removeRoute(route.name as string)
    if (route.children) {
      clearRoutes(route.children)
    }
  })
}

function addRoute(routes: RouterResult, parentName: string = 'Index', suffix?: string) {
  routes.forEach((route) => {
    if (route?.permissions && !hasPermission(route.permissions)) {
      return
    }

    if (route?.roles && !hasRole(route.roles)) {
      return
    }

    const component = getComponent(route)

    const path = suffix ? `${suffix}/${route.path}` : route.path
    const name = getRouteName(path)
    if (component) {
      const _route: RouteRecordRawC = {
        name,
        meta: {
          hidden: route.hidden,
          keepAlive: !route.meta?.noCache,
          icon: route.meta?.icon,
          title: route.meta?.title,
          order: route.meta?.order,
          activePath: route.meta?.activeMenu,
        },
        path,
        component,
      }

      router.addRoute(parentName, _route)
    }

    if (route.children) {
      // 组件不存在，说明是菜单
      addRoute(route.children, component ? name : undefined, component ? '' : route.path)
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

/**
 * 获取路由名称
 * @param path 路由路径 /system/menu
 * @returns 路由名称 SystemMenu
 */
function getRouteName(path: string) {
  return path.split('/').map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1)
  }).join('')
}
