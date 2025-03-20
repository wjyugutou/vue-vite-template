import request from '../../../request'

// 查询菜单列表
export function getListMenuApi(query: any) {
  return request.Get('/system/menu/list', {
    params: query,
  })
}

// 查询菜单详细
export function getMenuApi(menuId: string | number) {
  return request.Get(`/system/menu/${menuId}`)
}

// 查询菜单下拉树结构
export function getTreeselectApi() {
  return request.Get('/system/menu/treeselect')
}

// 根据角色ID查询菜单下拉树结构
export function getRoleMenuTreeselectApi(roleId: string | number) {
  return request.Get(`/system/menu/roleMenuTreeselect/${roleId}`)
}

// 新增菜单
export function addMenuApi(data: any) {
  return request.Post('/system/menu', data)
}

// 修改菜单
export function updateMenuApi(data: any) {
  return request.Put('/system/menu', data)
}

// 删除菜单
export function delMenuApi(menuId: string | number) {
  return request.Delete(`/system/menu/${menuId}`)
}
