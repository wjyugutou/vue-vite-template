import type { Post, Role, SystemUser, User, UserParams } from './type'
import { del, get, post, put } from '../../request'

export * from './type'

// 查询用户列表
export function getListUserApi(query: any) {
  return get<{
    rows: User[]
    total: number
  }>('/system/user/list', {
    params: query,
    original: true,
  })
}

// 查询岗位和角色
export function getPostsRolesApi() {
  return get<{
    posts: Post[]
    roles: Role[]
  }>('/system/user/', {
    original: true,
  })
}

// 查询用户详细
export function getUserInfoApi(userId?: string | number) {
  return get<SystemUser>(`/system/user/${userId}`, {
    original: true,
  })
}

// 新增用户
export function addUserApi(data: UserParams) {
  return post('/system/user', data)
}

// 修改用户
export function updateUserApi(data: UserParams) {
  return put('/system/user', data)
}

// 删除用户
export function delUserApi(userId: string | number) {
  return del(`/system/user/${userId}`)
}

// 用户密码重置
export function resetUserPwdApi(userId: string, password: string) {
  const data = {
    userId,
    password,
  }
  return put('/system/user/resetPwd', data)
}

// 用户状态修改
export function changeUserStatusApi(userId: string | number, status: string) {
  const data = {
    userId,
    status,
  }
  return put('/system/user/changeStatus', data)
}

// 查询用户个人信息
export function getUserProfileApi() {
  return get('/system/user/profile')
}

// 修改用户个人信息
export function updateUserProfileApi(data: any) {
  return put('/system/user/profile', data)
}

// 用户密码重置
export function updateUserPwdApi(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword,
  }
  return put('/system/user/profile/updatePwd', data)
}

// 用户头像上传
export function uploadAvatarApi(data: any) {
  return post('/system/user/profile/avatar', data)
}

// 查询授权角色
export function getAuthRoleApi(userId: string | number) {
  return get(`/system/user/authRole/${userId}`)
}

// 保存授权角色
export function updateAuthRoleApi(data: any) {
  return put('/system/user/authRole', data)
}

// 查询部门下拉树结构
export function getDeptTreeApi() {
  return get('/system/user/deptTree')
}

// 用户导入
export function importUserApi(data: any) {
  return post('/system/user/importData', data)
}
