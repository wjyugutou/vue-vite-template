interface Settings {
  sidebarCollapse: boolean
  layoutMode: 'vertical' | 'side'
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
      layoutMode: 'vertical',
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
