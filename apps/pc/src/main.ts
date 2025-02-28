import { createApp } from 'vue'
import App from './App.vue'

import directivePlugins from './directives'
import router from './router'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import './styles/index.css'
import './router/permission'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(directivePlugins)
app.mount('#app')
