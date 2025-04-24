import path from 'node:path'
import { createSharedConfig } from '@repo/config'
import { defineConfig, loadEnv } from 'vite'
import generatePlugins from './vite/plugin'
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
        '/api': {
          target: env.VITE_API_BASE_URL,
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
