import type { DeptTreeSelect, LoginParams, LoginResult, UserInfoResult } from './common.type'
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
