import type { DeptTreeSelect, LoginParams, LoginResult, RouterResult, UserInfoResult } from './common.type'
import request from '../request'

export * from './common.type'

/**
 * 获取部门树
 * @returns
 */
export function deptTreeSelectApi() {
  return request.Get<DeptTreeSelect[]>('/system/user/deptTree')
}

/**
 * 登录
 */
export function loginApi(data: LoginParams) {
  return request.Post<LoginResult>('/auth/login', data, {
    meta: {
      token: false,
    },
  })
}

/**
 * 退出登录
 */
export function logoutApi() {
  return request.Delete('/auth/logout')
}

/**
 * 用户信息
 */
export function userInfoApi() {
  return request.Get<UserInfoResult>('/system/user/getInfo', {
    meta: {
      original: true,
    },
  })
}

/**
 * 用户路由
 */
export function userRouterApi() {
  return request.Get<RouterResult>('/system/menu/getRouters')
}

/**
 * 通用下载
 */
export function downloadApi(url: string, data?: Record<string, any>) {
  return request.Post<Blob>(url, data, {
    meta: {
      blob: true,
    },
  })
}
