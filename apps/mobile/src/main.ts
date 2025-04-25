import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
import directivePlugins from './directives'
import router from './router'
import '@unocss/reset/tailwind.css'
import './styles/index.css'
import 'uno.css'
import 'lib-flexible'

const app = createApp(App)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
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
