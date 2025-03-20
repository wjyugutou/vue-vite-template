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
  default: Default
  menuState: {
    defaultActive: string
    defaultOpeneds: string[]
  }
}

export const useAppStore = defineStore('app', {
  // 持久化
  state: () => ({
    settings: useLocalStorage<Settings>('app-settings', {
      sidebarCollapse: false,
      layoutMode: 'side',
      settingsDrawerVisible: false,
      showTagView: true,
    }),
    default: useLocalStorage('app-default', {
      homePath: '/home',
      avatarSrc: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp',
    }),
    menuState: useSessionStorage('app-menu-state', {
      defaultActive: '',
      defaultOpeneds: [],
    }),
  }) as unknown as AppState,
})
