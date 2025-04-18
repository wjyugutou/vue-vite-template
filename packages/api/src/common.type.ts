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

export interface RouterResultItem {
  children: RouterResultItem[]
  component: string
  hidden: boolean
  name: string
  path: string
  redirect: string
  alwaysShow: boolean
  permissions?: string[]
  roles?: string[]
  meta: {
    /** 标题 */
    title: string
    /** 图标 */
    icon?: string
    /** 排序 */
    order?: number
    /** 是否缓存 */
    noCache?: boolean
    /** 是否显示面包屑 如果设置为false，则不会在breadcrumb面包屑中显示 */
    breadcrumb?: boolean
    /** 激活菜单 */
    activeMenu?: string
  }
}

export type RouterResult = RouterResultItem[]

export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

export const enum EnumBasicStatus {
  /** 正常 */
  ENABLE = '0',
  /** 停用 */
  DISABLE = '1',
}
