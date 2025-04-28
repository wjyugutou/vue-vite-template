import type { DictData, DictItem } from './type'
import { del, get, post, put } from '~/request'

export * from './type'

// 查询字典数据列表
export function dictListDataApi(query: any) {
  return get<{
    total: number
    rows: DictData[]
  }>('/system/dict/data/list', {
    params: query,
    original: true,
  })
}

// 查询字典数据详细
export function getDictDataApi(dictCode: string) {
  return get(`/system/dict/data/${dictCode}`)
}

// 根据字典类型查询字典数据信息
export function getDictByTypeApi(dictType: string) {
  return get<DictItem[]>(`/system/dict/data/type/${dictType}`)
}

// 新增字典数据
export function addDictDataApi(data: any) {
  return post('/system/dict/data', data)
}

// 修改字典数据
export function updateDictDataApi(data: any) {
  return put('/system/dict/data', data)
}

// 删除字典数据
export function delDictDataApi(dictCode: string) {
  return del(`/system/dict/data/${dictCode}`)
}
