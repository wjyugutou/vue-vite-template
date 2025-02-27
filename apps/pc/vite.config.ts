import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { generatePlugins } from './vite/plugins'

/**
 * mode: 'development' | 'production'
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './env') as ImportMetaEnv

  return {
    envDir: '../../',
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      ...generatePlugins(mode, env),
    ],
    build: {
      esbuild: {
        drop: mode === 'production' ? ['console', 'debugger'] : [],
      },
      outDir: 'dist',
      assetsDir: 'assets/',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'static/js/[name]-[hash].js',
        },
      },
    },
  }
})
