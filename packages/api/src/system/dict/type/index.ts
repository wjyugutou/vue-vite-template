import request from '../../../../request'

// 查询字典类型列表
export function dictListTypeApi(query: any) {
  return request.Get<{
    total: number
    rows: any[]
  }>('/system/dict/type/list', {
    params: query,
    meta: {
      original: true,
    },
  })
}

// 查询字典类型详细
export function getDictTypeApi(dictId: string) {
  return request.Get(`/system/dict/type/${dictId}`)
}

// 新增字典类型
export function addDictTypeApi(data: any) {
  return request.Post('/system/dict/type', data)
}

// 修改字典类型
export function updateDictTypeApi(data: any) {
  return request.Put('/system/dict/type', data)
}

// 删除字典类型
export function delDictTypeApi(dictId: string) {
  return request.Delete(`/system/dict/type/${dictId}`)
}

// 刷新字典缓存
export function refreshDictCacheApi() {
  return request.Delete('/system/dict/type/refreshCache')
}

// 获取字典选择框列表
export function dictOptionSelectApi() {
  return request.Get('/system/dict/type/optionselect')
}
