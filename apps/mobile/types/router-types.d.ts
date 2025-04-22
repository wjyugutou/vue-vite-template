declare module 'vue-router' {
  export interface RouteMeta {
    /** 标题名称 */
    title: string
    /** 是否缓存 */
    keepAlive?: boolean
    /** 是否隐藏导航栏 */
    hideNavBar?: boolean
    /** 是否隐藏返回箭头 */
    hideLeftArrow?: boolean
  }
}

export {}
