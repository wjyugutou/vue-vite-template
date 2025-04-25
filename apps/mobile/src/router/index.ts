import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

const router = createRouter({
  routes,
  history: createWebHistory(),
})

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router)
}

router.beforeEach((to, from, next) => {
  const { cachedList } = storeToRefs(useAppStore())

  if (to.meta.keepAlive) {
    if (!cachedList.value.includes(to.name as string)) {
      cachedList.value.push(to.name as string)
    }
  }
  next()
})

export default router
