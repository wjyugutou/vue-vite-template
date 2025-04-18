import type { RouteRecordRawC } from './type'
import { BasicLayout } from '@/layouts'

export const basicRoutes: RouteRecordRawC[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '/',
    redirect: '/',
    name: 'Index',
    component: BasicLayout,
    children: [
      {
        path: '/',
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
      {
        path: '/system/dict-data/:dictId(\\d+)',
        hidden: true,
        component: () => import('@/pages/system/dict/data.vue'),
        name: 'Data',
        meta: { title: '字典数据', activePath: '/system/dict', permissions: ['system:dict:list'] },
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [{
      path: ':pathMatch(.*)*',
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

const routes: RouteRecordRawC[] = [...basicRoutes]

export default routes
