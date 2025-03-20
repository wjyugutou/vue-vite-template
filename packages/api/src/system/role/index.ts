import request from '../../../request'

// 查询角色列表
export function listRole(query: any) {
  return request.Get('/system/role/list', {
    params: query,
  })
}

// 查询角色详细
export function getRole(roleId: string | number) {
  return request.Get(`/system/role/${roleId}`)
}

// 新增角色
export function addRole(data: any) {
  return request.Post('/system/role', data)
}

// 修改角色
export function updateRole(data: any) {
  return request.Put('/system/role', data)
}

// 角色数据权限
export function dataScope(data: any) {
  return request.Put('/system/role/dataScope', data)
}

// 角色状态修改
export function changeRoleStatus(roleId: string | number, status: string) {
  const data = {
    roleId,
    status,
  }
  return request.Put('/system/role/changeStatus', data)
}

// 删除角色
export function delRole(roleId: string | number) {
  return request.Delete(`/system/role/${roleId}`)
}

// 查询角色已授权用户列表
export function allocatedUserList(query: any) {
  return request.Get('/system/role/authUser/allocatedList', {
    params: query,
  })
}

// 查询角色未授权用户列表
export function unallocatedUserList(query: any) {
  return request.Get('/system/role/authUser/unallocatedList', {
    params: query,
  })
}

// 取消用户授权角色
export function authUserCancel(data: any) {
  return request.Put('/system/role/authUser/cancel', data)
}

// 批量取消用户授权角色
export function authUserCancelAll(data: any) {
  return request.Put('/system/role/authUser/cancelAll', data)
}

// 授权用户选择
export function authUserSelectAll(data: any) {
  return request.Put('/system/role/authUser/selectAll', data)
}

// 根据角色ID查询部门树结构
export function getDeptTreeByRoleIdApi(roleId: string | number) {
  return request.Get(`/system/role/deptTree/${roleId}`)
}
