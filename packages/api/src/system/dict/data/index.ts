import type { DictData, DictItem } from './type'
import request from '../../../../request'

export * from './type'

// 查询字典数据列表
export function dictListDataApi(query: any) {
  return request.Get<{
    total: number
    rows: DictData[]
  }>('/system/dict/data/list', {
    params: query,
    meta: {
      original: true,
    },
  })
}

// 查询字典数据详细
export function getDictDataApi(dictCode: string) {
  return request.Get(`/system/dict/data/${dictCode}`)
}

// 根据字典类型查询字典数据信息
export function getDictByTypeApi(dictType: string) {
  return request.Get<DictItem[]>(`/system/dict/data/type/${dictType}`)
}

// 新增字典数据
export function addDictDataApi(data: any) {
  return request.Post('/system/dict/data', data)
}

// 修改字典数据
export function updateDictDataApi(data: any) {
  return request.Put('/system/dict/data', data)
}

// 删除字典数据
export function delDictDataApi(dictCode: string) {
  return request.Delete(`/system/dict/data/${dictCode}`)
}
