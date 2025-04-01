import type { RouteRecordRawC } from '@/router/type'
import type { RouterResult, RouterResultItem } from '@repo/api'
import { basicRoutes } from '@/router/routes'

export function setupMenu(routes: RouterResult) {
  const defaultMenu = [...basicRoutes].find(item => item.name === 'Index')!.children!

  const userMenu = getMenu(routes)

  const menu = defaultMenu.concat(userMenu)

  return menu
}

function getMenu(routes: RouterResult): RouteRecordRawC[] {
  const menu = routes.map((item) => {
    if (item.hidden) {
      return null
    }

    const child = hasOneShowingChild(item.children, item)

    if (child) {
      return child
    }

    const menu = {
      path: item.path,
      name: item.name,
      component: item.component,
      meta: {
        hidden: item.hidden,
        keepAlive: !item.meta?.noCache,
        icon: item.meta?.icon,
        title: item.meta?.title,
        order: item.meta?.order,
      },
      children: item.children ? getMenu(item.children) : undefined,
    } as unknown as RouteRecordRawC
    return menu
  }).filter(Boolean) as RouteRecordRawC[]

  return menu
}

/**
 * 判断是否只有一个显示的子路由
 * @param children
 * @param parent
 * @returns
 */
function hasOneShowingChild(children: RouterResultItem[] = [], parent: RouterResultItem) {
  if (!children) {
    children = []
  }
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    }
    return true
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return showingChildren[0]
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    return showingChildren[0]
  }

  return false
};
