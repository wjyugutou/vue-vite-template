import request from '../../../../request'

// 查询字典数据列表
export function listData(query: any) {
  return request.Get('/system/dict/data/list', {
    params: query,
  })
}

// 查询字典数据详细
export function getData(dictCode: string) {
  return request.Get(`/system/dict/data/${dictCode}`)
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType: string) {
  return request.Get(`/system/dict/data/type/${dictType}`)
}

// 新增字典数据
export function addData(data: any) {
  return request.Post('/system/dict/data', data)
}

// 修改字典数据
export function updateData(data: any) {
  return request.Put('/system/dict/data', data)
}

// 删除字典数据
export function delData(dictCode: string) {
  return request.Delete(`/system/dict/data/${dictCode}`)
}
