export interface TreeNodeConfig {
  id: string
  parentId: string
  childrenList: string
}

export type TreeNode<T extends [...string[]]> = {
  [K in T[number]]: TreeNode<T>
} & {
  [key: string]: any
}

/**
 * 对象（包括函数属性）转换为字符串
 * @example objToString({ a: 1, b: 2, c: 3 }) // '{"a":1,"b":2,"c":3}'
 */
export function objToString(obj: Record<string, any>) {
  return JSON.stringify(obj, (key, value) => {
    // 处理函数
    if (typeof value === 'function') {
      return value.toString()
    }
    // 处理 undefined
    if (value === undefined) {
      return 'undefined'
    }
    // 处理 Symbol
    if (typeof value === 'symbol') {
      return value.toString()
    }
    // 处理 BigInt
    if (typeof value === 'bigint') {
      return value.toString()
    }
    return value
  }, 2)
}

/**
 * 字符串转换为对象（包括函数属性）
 * @example stringToObj('{"a":1,"b":2,"c":3}') // { a: 1, b: 2, c: 3 }
 */
export function stringToObj(str: string) {
  return JSON.parse(str, (key, value) => {
    // 处理函数字符串
    if (typeof value === 'string' && value.startsWith('function')) {
      try {
        // eslint-disable-next-line no-new-func
        return new Function(`return ${value}`)()
      }
      catch {
        return value
      }
    }
    // 处理 undefined
    if (value === 'undefined') {
      return undefined
    }
    // 处理 Symbol
    if (typeof value === 'string' && value.startsWith('Symbol(')) {
      return Symbol(value.slice(7, -1))
    }
    // 处理 BigInt
    if (typeof value === 'string' && /^\d+n$/.test(value)) {
      return BigInt(value.slice(0, -1))
    }
    return value
  })
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} args 配置项 必须显示指定才有类型提示 id:'id' parentId:'parentId' childrenList:'children'
 * @example generatTreeNode([], 'id', 'parentId', 'children')
 */
export function generatTreeNode<T extends [...string[]]>(data: any[], ...args: T) {
  const config: TreeNodeConfig = {
    id: args[0] || 'id',
    parentId: args[1] || 'parentId',
    childrenList: args[2] || 'children',
  }

  const childrenListMap: Record<string, TreeNode<T>[]> = {}
  const nodeIds: Record<string, TreeNode<T>> = {}
  const tree: TreeNode<T>[] = []

  for (const d of data) {
    const parentId = d[config.parentId]
    if (!childrenListMap[parentId]) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (!nodeIds[parentId]) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o: TreeNode<T>) {
    if (childrenListMap[o[config.id]] !== null) {
      // @ts-expect-error xxxx
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}

/**
 * 参数处理 encodeURIComponent
 * @example queryString({ a: '1', b: '2' }) // a=1&b=2
 * queryString({ a: { b: 1, c: { d: 1 } } }) // 'a%5Bb%5D=1&a%5Bc%5D=%5Bobject%20Object%5D'
 */
export function queryString(params: Record<string, any>) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = `${encodeURIComponent(propName)}=`
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            const params = `${propName}[${key}]`
            const subPart = `${encodeURIComponent(params)}=`
            result += `${subPart + encodeURIComponent(value[key])}&`
          }
        }
      }
      else {
        result += `${part + encodeURIComponent(value)}&`
      }
    }
  }
  if (result.length) {
    result = result.slice(0, -1)
  }
  return result
}

/**
 * 获取文件类型
 * @example getFileType('https://example.com/image.jpg?width=100&height=100') // 'jpg'
 */
export function getFileType(fileUrl?: string) {
  if (!fileUrl)
    return ''
  const arr1 = fileUrl.split('?')[0]
  const arr2 = arr1.split('.')
  const fileType = arr2.at(-1)
  return fileType
}

/**
 * 处理get请求的params
 */
export function handleParams(params: Record<string, any>) {
  if (!params.pageNum)
    return params

  const paramsObj: Record<string, any> = {}
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([_key, _value]) => {
          const __key = encodeURIComponent(`${key}[${_key}]`)
          paramsObj[__key] = _value
        })
      }
      else if (typeof value !== 'object') {
        paramsObj[key] = value
      }
    }
  })

  return paramsObj
}
