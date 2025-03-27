export interface DeptTreeSelect {
  id: string
  label: string
  children: DeptTreeSelect[]
}
export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  access_token: string
  expires_in: number
  hasFastRegister: boolean
  phone_no: string
  role_name: string
}

export interface UserInfoResult {
  code: number
  msg: string
  permissions: string[]
  roles: string[]
  user: UserInfo
}

export interface UserInfo {
  userId: string
  username: string
  nickname: string
  avatar: string
  roles: string[]
  dept: Dept
  deptId: number
  email: string
  phonenumber: string
  createTime: string
}

export interface Dept {
  id: string
  name: string
}
