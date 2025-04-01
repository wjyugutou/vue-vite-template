import type { User } from './type'
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

// 查询用户详细
export function getUser(userId: string | number) {
  return request.Get(`/system/user/${userId}`)
}

// 新增用户
export function addUser(data: any) {
  return request.Post('/system/user', data)
}

// 修改用户
export function updateUser(data: any) {
  return request.Put('/system/user', data)
}

// 删除用户
export function delUser(userId: string | number) {
  return request.Delete(`/system/user/${userId}`)
}

// 用户密码重置
export function resetUserPwd(userId: string, password: string) {
  const data = {
    userId,
    password,
  }
  return request.Put('/system/user/resetPwd', data)
}

// 用户状态修改
export function changeUserStatus(userId: string | number, status: string) {
  const data = {
    userId,
    status,
  }
  return request.Put('/system/user/changeStatus', data)
}

// 查询用户个人信息
export function getUserProfile() {
  return request.Get('/system/user/profile')
}

// 修改用户个人信息
export function updateUserProfile(data: any) {
  return request.Put('/system/user/profile', data)
}

// 用户密码重置
export function updateUserPwd(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword,
  }
  return request.Put('/system/user/profile/updatePwd', data)
}

// 用户头像上传
export function uploadAvatar(data: any) {
  return request.Post('/system/user/profile/avatar', data)
}

// 查询授权角色
export function getAuthRole(userId: string | number) {
  return request.Get(`/system/user/authRole/${userId}`)
}

// 保存授权角色
export function updateAuthRole(data: any) {
  return request.Put('/system/user/authRole', data)
}

// 查询部门下拉树结构
export function getDeptTreeApi() {
  return request.Get('/system/user/deptTree')
}
