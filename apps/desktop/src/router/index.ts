import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  routes,
  // routes,
  history: createWebHistory(),
})

export default router

router.beforeEach((to, from, next) => {
  NProgress.start()

  const { cachedList } = storeToRefs(useAppStore())

  if (to.meta.keepAlive && typeof to.name === 'string') {
    cachedList.value.push(to.name)
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
