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
      'primary': 'var(--el-color-primary)',
      'primary-hover': 'var(--el-color-primary-light-3)',
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
