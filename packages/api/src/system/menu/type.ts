export const enum MenuType {
  dir = 'M',
  menu = 'C',
  btn = 'F',
}

export const enum MenuStatus {
  正常 = '0',
  停用 = '1',
}

export const enum MenuVisible {
  显示 = '0',
  隐藏 = '1',
}

export const enum MenuIsFrame {
  是 = '0',
  否 = '1',
}

export const enum MenuIsCache {
  是 = '0',
  否 = '1',
}

export interface AddMenuParams {
  menuName: string
  parentId: number
  orderNum: number
  path: string
  visible: MenuVisible
  component: string
  query?: string
  isFrame: MenuIsFrame
  isCache: MenuIsCache
  menuType: MenuType
  status: MenuStatus
  icon?: string
  perms?: string
}

export interface EditMenuParams extends AddMenuParams {
  menuId: number
}

export interface Menu extends AddMenuParams {
  children: Menu[]
  component: string
  createBy: string
  createTime: string
  icon: string
  isCache: MenuIsCache
  isFrame: MenuIsFrame
  menuId: number
  menuName: string
  menuType: MenuType
  orderNum: number
  parentId: number
  parentName: string
  path: string
  perms: string
  query: string
  remark: string
  status: MenuStatus
  updateBy: string
  updateTime: string
  visible: MenuVisible
}
