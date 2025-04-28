import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'

import App from './App.vue'
import '@/styles/index.css'

const app = createApp(App)

// provide the default query function to your app with defaultOptions
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        enabled: false,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  },
}

app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app')
