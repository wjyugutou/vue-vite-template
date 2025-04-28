import type { AddMenuParams, Menu } from './type'
import { del, get, post, put } from '~/request'

export * from './type'

// 查询菜单列表
export function getListMenuApi(query: any) {
  return get<Menu[]>('/system/menu/list', {
    params: query,
  })
}

// 查询菜单详细
export function getMenuApi(menuId: string | number) {
  return get<Menu>(`/system/menu/${menuId}`)
}

// 查询菜单下拉树结构
export function getTreeselectApi() {
  return get('/system/menu/treeselect')
}

// 根据角色ID查询菜单下拉树结构
export function getRoleMenuTreeselectApi(roleId: string | number) {
  return get(`/system/menu/roleMenuTreeselect/${roleId}`)
}

// 新增菜单
export function addMenuApi(data: AddMenuParams) {
  return post('/system/menu', data)
}

// 修改菜单
export function updateMenuApi(data: any) {
  return put('/system/menu', data)
}

// 删除菜单
export function delMenuApi(menuId: string | number) {
  return del(`/system/menu/${menuId}`)
}
