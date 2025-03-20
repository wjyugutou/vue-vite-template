import request from '../../../../request'

// 查询字典类型列表
export function listType(query: any) {
  return request.Get('/system/dict/type/list', {
    params: query,
  })
}

// 查询字典类型详细
export function getType(dictId: string) {
  return request.Get(`/system/dict/type/${dictId}`)
}

// 新增字典类型
export function addType(data: any) {
  return request.Post('/system/dict/type', data)
}

// 修改字典类型
export function updateType(data: any) {
  return request.Put('/system/dict/type', data)
}

// 删除字典类型
export function delType(dictId: string) {
  return request.Delete(`/system/dict/type/${dictId}`)
}

// 刷新字典缓存
export function refreshCache() {
  return request.Delete('/system/dict/type/refreshCache')
}

// 获取字典选择框列表
export function optionselect() {
  return request.Get('/system/dict/type/optionselect')
}
