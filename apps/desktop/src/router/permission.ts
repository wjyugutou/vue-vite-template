import router from './index'

// route name 白名单
const whiteList = ['Login']

router.beforeEach(async (to, form, next) => {
  const userStore = useUserStore()

  const token = useToken()

  if (!token) {
    if (whiteList.includes(to.name as string)) {
      next()
    }
    else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  }
  else {
    if (userStore.routes.length !== 0) {
      next()
    }
    else {
      await userStore.getUserInfo()
      await userStore.getUserRoutes()

      const _to = {
        path: to.path,
        query: to.query,
      }

      next({ ..._to, replace: true })
    }
  }
})
