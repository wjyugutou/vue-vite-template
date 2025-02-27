import type { RouteRecordRawC } from './type'
import { BasicLayout } from '@/layouts'

export const basicRoutes: RouteRecordRawC[] = [
  {
    path: '/',
    redirect: '/',
    name: 'Index',
    component: BasicLayout,
    children: [
      {
        path: '',
        name: 'Home',
        meta: {
          title: '首页',
        },
        component: () => import('@/pages/index.vue'),
      },
      {
        path: 'hi/:name',
        meta: {
          title: '你好',
          hideInMenu: true,
        },
        component: () => import('@/pages/hi/index.vue'),
      },
    ],
  },

]

const staticRoutes: RouteRecordRawC[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [{
      path: 'error/:status',
      name: 'Error',
      meta: {
        title: 'Error',
        hideInMenu: true,
        hideInTab: true,
        hideInBreadcrumb: true,
      },
      component: () => import('@/pages/Error.vue'),
    }],
  },
]
export const NotFoundRoute: RouteRecordRawC = {
  path: '/:pathMatch(.*)*',
  redirect(to) {
    return {
      path: '/error/404',
      query: to.query,
      params: to.params,
    }
  },
}

const routes: RouteRecordRawC[] = [...basicRoutes, ...staticRoutes]

export default routes
