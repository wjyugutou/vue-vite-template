import {
  defineConfig,
  // presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives, // @apply
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      // 'primary': 'var(--el-color-primary)',
      // 'primary-300': 'var(--el-color-primary-light-3)',
      // 'primary-500': 'var(--el-color-primary-light-5)',
      // 'primary-700': 'var(--el-color-primary-light-7)',
      // 'primary-800': 'var(--el-color-primary-light-8)',
      // 'primary-900': 'var(--el-color-primary-light-9)',
      primary: {
        DEFAULT: 'var(--el-color-primary)',
        300: 'var(--el-color-primary-light-3)',
        500: 'var(--el-color-primary-light-5)',
        700: 'var(--el-color-primary-light-7)',
        800: 'var(--el-color-primary-light-8)',
        900: 'var(--el-color-primary-light-9)',
      },
    },
  },
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    ['btn', 'text-white px-2 py-1 rounded inline-block bg-primary hover:bg-primary-500 cursor-pointer'],
  ],
  presets: [
    presetWind3(),
    // presetAttributify(),
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
