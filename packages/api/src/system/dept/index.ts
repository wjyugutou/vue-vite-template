import { del, get, post, put } from '../../request'

// 查询部门列表
export function getListDeptApi(query: any) {
  return get('/system/dept/list', {
    params: query,
  })
}

// 查询部门列表（排除节点）
export function getListDeptExcludeChildApi(deptId: string | number) {
  return get(`/system/dept/list/exclude/${deptId}`)
}

// 查询部门详细
export function getDeptApi(deptId: string | number) {
  return get(`/system/dept/${deptId}`)
}

// 新增部门
export function addDeptApi(data: any) {
  return post('/system/dept', data)
}

// 修改部门
export function updateDeptApi(data: any) {
  return put('/system/dept', data)
}

// 删除部门
export function delDeptApi(deptId: string | number) {
  return del(`/system/dept/${deptId}`)
}
