// 创建共享的 Vite 配置
import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'

export function createSharedConfig(env: ImportMetaEnv) {
  const isDev = process.env.NODE_ENV === 'development'
  const appType = process.env.APP_TYPE
  const root = path.resolve(import.meta.dirname, '../../../')

  return defineConfig({
    envDir: root,
    esbuild: {
      drop: isDev ? [] : ['console', 'debugger'],
    },
    build: {
      outDir: path.resolve(root, `./dist/${appType}`),
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      assetsDir: 'assets/',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'static/js/[name]-[hash].js',
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia', '@vueuse/core'],
            'element-plus': appType === 'desktop' ? ['element-plus'] : [],
            'vant': appType === 'mobile' ? ['vant'] : [],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    },
  })
}
