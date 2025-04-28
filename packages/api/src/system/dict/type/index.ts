import { del, get, post, put } from '~/request'

// 查询字典类型列表
export function dictListTypeApi(query: any) {
  return get<{
    total: number
    rows: any[]
  }>('/system/dict/type/list', {
    params: query,
    original: true,
  })
}

// 查询字典类型详细
export function getDictTypeApi(dictId: string) {
  return get(`/system/dict/type/${dictId}`)
}

// 新增字典类型
export function addDictTypeApi(data: any) {
  return post('/system/dict/type', data)
}

// 修改字典类型
export function updateDictTypeApi(data: any) {
  return put('/system/dict/type', data)
}

// 删除字典类型
export function delDictTypeApi(dictId: string) {
  return del(`/system/dict/type/${dictId}`)
}

// 刷新字典缓存
export function refreshDictCacheApi() {
  return del('/system/dict/type/refreshCache')
}

// 获取字典选择框列表
export function dictOptionSelectApi() {
  return get('/system/dict/type/optionselect')
}
