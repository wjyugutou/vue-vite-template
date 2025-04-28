import type { DeptTreeSelect, LoginParams, LoginResult, RouterResult, UserInfoResult } from './common.type'
import { del, get, post } from '~/request'

export * from './common.type'

/**
 * 获取部门树
 * ~returns
 */
export function deptTreeSelectApi() {
  return get<DeptTreeSelect[]>('/system/user/deptTree')
}

/**
 * 登录
 */
export function loginApi(data: LoginParams) {
  return post<LoginResult>('/auth/login', data, {
    isToken: false,
  })
}

/**
 * 退出登录
 */
export function logoutApi() {
  return del('/auth/logout')
}

/**
 * 用户信息
 */
export function userInfoApi() {
  return get<UserInfoResult>('/system/user/getInfo', {
    original: true,
  })
}

/**
 * 用户路由
 */
export function userRouterApi() {
  return get<RouterResult>('/system/menu/getRouters')
}

/**
 * 通用下载
 */
export function downloadApi(url: string, data?: Record<string, any>) {
  return post<Blob>(url, data, {
    blob: true,
  })
}
