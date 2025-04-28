import type { Config } from './type'
import { del, get, post, put } from '~/request'

export * from './type'

// 查询参数列表
export function listConfigApi(query: any) {
  return get<{
    rows: Config[]
    total: number
  }>('/system/config/list', {
    params: query,
    original: true,
  })
}

// 查询参数详细
export function getConfigApi(configId: number) {
  return get<Config>(`/system/config/${configId}`)
}

// 根据参数键名查询参数值
export function getConfigKeyApi(configKey: string) {
  return get<string>(`/system/config/configKey/${configKey}`)
}

// 新增参数配置
export function addConfigApi(data) {
  return post('/system/config', data)
}

// 修改参数配置
export function updateConfigApi(data) {
  return put('/system/config', data)
}

// 删除参数配置
export function delConfigApi(configId) {
  return del(`/system/config/${configId}`)
}

// 刷新参数缓存
export function refreshCacheApi() {
  return del('/system/config/refreshCache')
}
