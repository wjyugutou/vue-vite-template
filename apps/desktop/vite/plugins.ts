import type { Plugin } from 'vite'
import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Compression from 'vite-plugin-compression'
import zipPack from 'vite-plugin-zip-pack'

export function generatePlugins(mode: 'development' | 'production' | string, env: ImportMetaEnv): Plugin[] {
  const root = path.resolve(import.meta.dirname, '../../../')

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
        'src/hooks',
        'src/store',
        'src/hooks',
        'src/utils',
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
    zipPack({
      inDir: path.resolve(root, `./dist/desktop`), // 输入目录，默认为 dist
      outDir: path.resolve(root, `./dist-zip`), // 输出 ZIP 文件的目录
      outFileName: 'desktop-app.zip', // ZIP 文件名
      pathPrefix: '', // ZIP 文件中的路径前缀（可选）
      done: (err) => {
        // 打包完成后的回调
        if (err) {
          console.error('ZIP packing failed:', err)
        }
        else {
          console.log('ZIP packing completed successfully')
        }
      },
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
