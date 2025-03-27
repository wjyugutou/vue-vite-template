interface Settings {
  sidebarCollapse: boolean
  layoutMode: 'vertical' | 'side'
  /** 设置抽屉是否可见 */
  settingsDrawerVisible: boolean
  /** 是否显示标签栏 */
  showTagView: boolean
}

interface Default {
  homePath: string
  avatarSrc: string
}

interface AppState {
  settings: Settings
  defaultConfig: Default
  menuState: {
    defaultActive: string
    defaultOpeneds: string[]
  }
  cachedList: string[]
}

export const useAppStore = defineStore('app', {
  state: () => ({
    settings: {
      sidebarCollapse: false,
      layoutMode: 'side',
      settingsDrawerVisible: false,
      showTagView: true,
    },
    defaultConfig: {
      homePath: '/home',
      avatarSrc: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp',
    },
    menuState: {
      // 默认激活的菜单
      defaultActive: '',
      // 默认展开的菜单
      defaultOpeneds: [],
    },
    // 默认缓存的页面
    cachedList: [],
  }) as AppState,
  getters: {
  },
  actions: {
  },
  persist: [
    {
      key: 'app-settings',
      pick: ['settings'],
      storage: localStorage,
    },
    {
      key: 'app-default',
      pick: ['defaultConfig'],
      storage: localStorage,
    },
    {
      key: 'app-menu-state',
      pick: ['menuState'],
      storage: sessionStorage,
    },
    {
      key: 'app-keep-alive-list',
      pick: ['cachedList'],
      storage: sessionStorage,
    },
  ],
})
