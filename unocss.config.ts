import {
  defineConfig,
  presetIcons,
  presetWind3,
  // preset-wind4, // 新版 与transformerDirectives存在兼容问题
  transformerDirectives, // --at-apply: 代替@apply
  transformerVariantGroup,
} from 'unocss'
// import { createRemToPxResolver } from '@unocss/preset-wind4/utils' // 自带的rem转px

export default defineConfig({
  theme: {
    colors: {
      'primary': 'var(--el-color-primary)',
      'primary-hover': 'var(--el-color-primary-light-3)',
      'success': 'var(--el-color-success)',
      'warning': 'var(--el-color-warning)',
      'danger': 'var(--el-color-danger)',
      'info': 'var(--el-color-info)',
    },
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  variants: [
    (matcher) => {
      if (!matcher.startsWith('group-hover:'))
        return matcher
      return {
        matcher: matcher.slice(12),
        selector: s => `.group:hover ${s}`,
      }
    },
  ],
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  ],
  presets: [
    presetWind3(),
    // presetWind4({
    //   reset: true,
    //   utilityResolver: createRemToPxResolver()
    // }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
