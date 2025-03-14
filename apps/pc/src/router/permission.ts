import router from './index'

router.beforeEach(async (to, form, next) => {
  const store = useUserStore()

  try {
    if (store.routes.length === 0) {
      await store.getUserRoutes()
      next({ ...to, replace: true })
    }
    else {
      next()
    }
  }
  catch (error) {
    const { menuState } = storeToRefs(useAppStore())

    menuState.value.defaultActive = ''
    menuState.value.defaultOpeneds = []

    console.error('router error:', error)
    next('/error/500')
  }
})
