export const useAppStore = defineStore('app', {
  state: () => ({
    cachedList: [] as string[],
  }),
  persist: [
    { key: 'app-cachedList', pick: ['cachedList'], storage: sessionStorage },
  ],
})
