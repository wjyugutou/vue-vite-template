import type { Post, Role, SystemUser, User, UserParams } from './type'
import { usePagination } from 'alova/client'
import request from '../../../request'

export * from './type'

// 查询用户列表
export function getListUserApi(query: any) {
  return request.Get<{
    rows: User[]
    total: number
  }>('/system/user/list', {
    params: query,
    meta: { original: true },
  })
}

// 查询岗位和角色
export function getPostsRolesApi() {
  return request.Get<{
    posts: Post[]
    roles: Role[]
  }>('/system/user/', {
    meta: { original: true },
  })
}

// 查询用户详细
export function getUserInfoApi(userId?: string | number) {
  return request.Get<SystemUser>(`/system/user/${userId}`, {
    meta: { original: true },
    cacheFor: null,
  })
}

// 新增用户
export function addUserApi(data: UserParams) {
  return request.Post('/system/user', data)
}

// 修改用户
export function updateUserApi(data: UserParams) {
  return request.Put('/system/user', data)
}

// 删除用户
export function delUserApi(userId: string | number) {
  return request.Delete(`/system/user/${userId}`)
}

// 用户密码重置
export function resetUserPwdApi(userId: string, password: string) {
  const data = {
    userId,
    password,
  }
  return request.Put('/system/user/resetPwd', data)
}

// 用户状态修改
export function changeUserStatusApi(userId: string | number, status: string) {
  const data = {
    userId,
    status,
  }
  return request.Put('/system/user/changeStatus', data)
}

// 查询用户个人信息
export function getUserProfileApi() {
  return request.Get('/system/user/profile')
}

// 修改用户个人信息
export function updateUserProfileApi(data: any) {
  return request.Put('/system/user/profile', data)
}

// 用户密码重置
export function updateUserPwdApi(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword,
  }
  return request.Put('/system/user/profile/updatePwd', data)
}

// 用户头像上传
export function uploadAvatarApi(data: any) {
  return request.Post('/system/user/profile/avatar', data)
}

// 查询授权角色
export function getAuthRoleApi(userId: string | number) {
  return request.Get(`/system/user/authRole/${userId}`)
}

// 保存授权角色
export function updateAuthRoleApi(data: any) {
  return request.Put('/system/user/authRole', data)
}

// 查询部门下拉树结构
export function getDeptTreeApi() {
  return request.Get('/system/user/deptTree')
}

// 用户导入
export function importUserApi(data: any) {
  return request.Post('/system/user/importData', data)
}
