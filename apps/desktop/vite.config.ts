import path from 'node:path'
import { createSharedConfig } from '@repo/config'
import { defineConfig, loadEnv } from 'vite'
import { generatePlugins } from './vite/plugins'

/**
 * mode: 'development' | 'production'
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../../') as ImportMetaEnv

  return {
    ...createSharedConfig(env),
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      proxy: {
        [env.VITE_API_BASE_URL]: {
          target: 'http://192.168.110.91:82/prod-api',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      ...generatePlugins(mode, env),
    ],
  }
})
