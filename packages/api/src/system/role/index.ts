import { del, get, post, put } from '~/request'

// 查询角色列表
export function listRoleApi(query: any) {
  return get<{
    total: number
    rows: any[]
  }>('/system/role/list', {
    params: query,
    original: true,
  })
}

// 查询角色详细
export function getRoleApi(roleId: string | number) {
  return get(`/system/role/${roleId}`)
}

// 新增角色
export function addRoleApi(data: any) {
  return post('/system/role', data)
}

// 修改角色
export function updateRoleApi(data: any) {
  return put('/system/role', data)
}

// 角色数据权限
export function dataScopeApi(data: any) {
  return put('/system/role/dataScope', data)
}

// 角色状态修改
export function changeRoleStatusApi(roleId: string | number, status: string) {
  const data = {
    roleId,
    status,
  }
  return put('/system/role/changeStatus', data)
}

// 删除角色
export function delRoleApi(roleId: string | number) {
  return del(`/system/role/${roleId}`)
}

// 查询角色已授权用户列表
export function allocatedUserListApi(query: any) {
  return get('/system/role/authUser/allocatedList', {
    params: query,
  })
}

// 查询角色未授权用户列表
export function unallocatedUserListApi(query: any) {
  return get('/system/role/authUser/unallocatedList', {
    params: query,
  })
}

// 取消用户授权角色
export function authUserCancelApi(data: any) {
  return put('/system/role/authUser/cancel', data)
}

// 批量取消用户授权角色
export function authUserCancelAllApi(data: any) {
  return put('/system/role/authUser/cancelAll', data)
}

// 授权用户选择
export function authUserSelectAllApi(data: any) {
  return put('/system/role/authUser/selectAll', data)
}

// 根据角色ID查询部门树结构
export function getDeptTreeByRoleIdApi(roleId: string | number) {
  return get(`/system/role/deptTree/${roleId}`)
}
