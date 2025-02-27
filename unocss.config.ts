import {
  defineConfig,
  // presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives, // @apply
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      default: 'hsl(var(--default))',
      destructive: 'hsl(var(--destructive))',
      primary: 'hsl(var(--primary))',
      success: 'hsl(var(--success))',
      warning: 'hsl(var(--warning))',
    },
  },
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    ['btn', 'text-white px-2 py-1 rounded inline-block bg-primary hover:bg-primary/90 active:bg-primary/60 cursor-pointer'],
  ],
  presets: [
    presetUno(),
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
