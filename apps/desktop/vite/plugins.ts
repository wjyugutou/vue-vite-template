import type { Plugin } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Compression from 'vite-plugin-compression'

export function generatePlugins(mode: 'development' | 'production' | string, env: ImportMetaEnv): Plugin[] {
  return [

    // ⚠️ Vue must be placed after VueRouter()
    Vue(),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'vue-router',
        '@vueuse/core',
      ],
      resolvers: [ElementPlusResolver()],
      dts: './types/auto-imports.d.ts',
      dirs: [
        './src/hooks',
        './src/store',
        './src/composables',
        './src/utils',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [ElementPlusResolver()],
      dts: './types/components.d.ts',
    }),

    mode !== 'preduction' && codeInspectorPlugin({
      bundler: 'vite',
      showSwitch: false, // 是否显示切换按钮,移动端建议打开
    }),

    // gzip
    env.VITE_BUILD_GZIP === 'true' && mode === 'production' && Compression({
      verbose: true, // 输出压缩日志
      disable: false, // 是否禁用压缩
      threshold: 10240, // 对超过10KB的文件进行压缩
      algorithm: 'gzip', // 使用gzip压缩
      ext: '.gz', // 压缩后文件的扩展名
      deleteOriginFile: false,
    }),
  ]
}
