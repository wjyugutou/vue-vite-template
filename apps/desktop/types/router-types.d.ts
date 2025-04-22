declare module 'vue-router' {
  export interface RouteMeta {
    /** 标题名称 */
    title: string
    /** 排序 */
    order?: number
    /** 是否缓存 */
    keepAlive?: boolean
    /** 是否隐藏 */
    hiddenInMenu?: boolean
    /** 是否外链 */
    link?: string
    /** 激活路径 */
    activePath?: string
  }
}

export {}
