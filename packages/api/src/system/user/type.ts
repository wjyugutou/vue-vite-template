import type { EnumBasicStatus } from 'src/common.type'

export interface User {
  id: number
  username: string
  email: string
  phonenumber: string
  status: EnumBasicStatus
  createTime: string
  nickName: string
  deptId: string
  userName: string
  password: string
  sex: string
  posts: Post[]
  roles: Role[]
  remark: string
}

export interface UserParams {
  userId?: number
  nickName?: string
  deptId?: string
  userName?: string
  password?: string
  sex?: string
  email?: string
  phonenumber?: string
  status?: string
  postIds?: number[]
  roleIds?: number[]
  remark?: string
}

export interface SystemUser {
  data?: User
  roleIds?: number[]
  postIds?: number[]
  roles: Role[]
  posts: Post[]
}

export interface Post {
  postId: number
  postName: string
  postCode: string
  status: EnumBasicStatus
}

export interface Role {
  roleId: number
  roleName: string
  roleKey: string
  status: EnumBasicStatus
  remark: string
}
