import type { ToRefs } from 'vue'
// import { getConfigKeyApi } from '@repo/api'

function getConfigKeyApi(key: string) {
  return new Promise<string>((resolve) => {
    resolve('123')
  })
}

type ConfigState<T extends [...string[]]> = {
  [K in T[number]]: string
}

const configMapCache = new Map<string, string>()

export function useSysConfig<T extends string[]>(...configs: T): ToRefs<ConfigState<T>> {
  const configMap = reactive({}) as ConfigState<T>

  configs.forEach((config) => {
    const configCache = configMapCache.get(config)
    if (configCache) {
      configMap[config as T[number]] = configCache
    }
    else {
      getConfigKeyApi(config).then((res) => {
        configMap[config as T[number]] = res
        configMapCache.set(config, res)
      })
    }
  })

  return toRefs(configMap)
}
