export const enum MenuType {
  DIR = 'M',
  MENU = 'C',
  BUTTON = 'F',
}

export interface Menu {
  children: Menu[]
  component: string | null
  createBy: string | null
  createTime: string
  icon: string
  isCache: string
  isFrame: string
  menuId: number
  menuName: string
  menuType: MenuType
  orderNum: number
  parentId: number
  parentName: string | null
  path: string
  perms: string
  query: string | null
  remark: string | null
  status: string
  updateBy: string | null
  updateTime: string
  visible: string
}
