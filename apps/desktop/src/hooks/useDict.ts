import type { ToRefs } from 'vue'
import request from '@repo/api/request'
import { reactive, toRefs } from 'vue'

export interface DictItem {
  dictLabel: string
  dictValue: string | number
  [key: string]: unknown
}

export interface DictReturn {
  list: { value: DictItem['dictValue'], label: DictItem['dictLabel'] }[]
  map: Record<string, string | number | boolean>
}

function getDictApi(dictType: string) {
  return request.Get<DictItem[]>(`/system/dict/data/type/${dictType}`)
}

type Dict<T extends [...string[]]> = {
  [K in T[number]]: DictReturn
}

const dictMapCache = new Map<string, DictReturn>()

/**
 * 字典hooks
 * @param dicts 字典值
 */
export function useDict<T extends string[]>(...dicts: T): ToRefs<Dict<T>> {
  const initvalue = dicts.reduce((prev, item) => {
    prev[item as T[number]] = { list: [], map: {} }
    return prev
  }, {} as Dict<T>)
  const dictMap = reactive(initvalue) as Dict<T>

  dicts.forEach((dict) => {
    if (dictMapCache.has(dict)) {
      dictMap[dict as T[number]] = dictMapCache.get(dict)!
    }
    else {
      getDictApi(dict).then((res) => {
        const dictReturn = transformDict(res)
        dictMap[dict as T[number]] = dictReturn
        dictMapCache.set(dict, dictReturn)
      })
    }
  })

  return toRefs(dictMap)
}

function transformDict(dictValue: DictItem[]): DictReturn {
  return {
    list: dictValue.map(item => ({ value: item.dictValue, label: item.dictLabel })),
    map: dictValue.reduce<DictReturn['map']>((prev, item) => {
      prev[item.dictValue] = item.dictLabel
      prev[item.dictLabel] = item.dictValue
      return prev
    }, {}),
  }
}
