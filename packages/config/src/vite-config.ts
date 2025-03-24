// 创建共享的 Vite 配置
import path from 'node:path'
import { defineConfig } from 'vite'

export function createSharedConfig(type: string, root: string, mode: string) {
  return defineConfig({
    envDir: root,
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    build: {
      outDir: path.resolve(root, `./dist/${type}`),
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
            'element-plus': ['element-plus'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    },
    resolve: {
      alias: {
        '~': '/src',
        '@': '/src',
      },
    },
  })
}
