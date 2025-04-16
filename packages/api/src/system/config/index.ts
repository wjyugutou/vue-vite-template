import type { Config } from './type'
import request from '../../../request'

export * from './type'

// 查询参数列表
export function listConfigApi(query: any) {
  return request.Get<{
    rows: Config[]
    total: number
  }>('/system/config/list', {
    params: query,
    meta: {
      original: true,
    },
  })
}

// 查询参数详细
export function getConfigApi(configId: number) {
  return request.Get<Config>(`/system/config/${configId}`)
}

// 根据参数键名查询参数值
export function getConfigKeyApi(configKey: string) {
  return request.Get<string>(`/system/config/configKey/${configKey}`)
}

// 新增参数配置
export function addConfigApi(data) {
  return request.Post('/system/config', data)
}

// 修改参数配置
export function updateConfigApi(data) {
  return request.Put('/system/config', data)
}

// 删除参数配置
export function delConfigApi(configId) {
  return request.Delete(`/system/config/${configId}`)
}

// 刷新参数缓存
export function refreshCacheApi() {
  return request.Delete('/system/config/refreshCache')
}
