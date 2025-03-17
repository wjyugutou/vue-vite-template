import type { Instance } from 'api/alova'
import { createApp } from 'vue'
import App from './App.vue'
import directivePlugins from './directives'

import router from './router'
import '@unocss/reset/tailwind.css'
import './styles/index.css'
import 'uno.css'
import 'lib-flexible'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(directivePlugins)
app.mount('#app')

// 全局错误处理

app.config.errorHandler = (err, vm, info) => {
  console.error(`errorHandler:: ${err}`, {
    info,
    componentName: vm?.$options.__name,
    vm,
  })
}

router.onError((error, to, from) => {
  console.error(`routerError:: ${error}`, { to, from })
})

window.errAlert = (message: string, instance: Instance) => {
  showFailToast(message)
}
