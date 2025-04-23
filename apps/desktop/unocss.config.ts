//
import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives, // --at-apply: 代替@apply
  transformerVariantGroup,
} from 'unocss'

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
    (matcher) => {
      if (!matcher.startsWith('not-disabled-hover:'))
        return matcher
      return {
        matcher: matcher.slice('not-disabled-hover:'.length),
        selector: s => `${s}:not([disabled]):hover`,
      }
    },
  ],
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white hover:not-disabled:bg-teal-700 disabled:bg-gray-600 disabled:opacity-50'],
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
