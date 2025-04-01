import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives, // @apply
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  variants: [
    /**
     * 父元素 group 时，子元素 hover 时生效
     * <div class="group">
     *  <span class="group-hover:text-red">
     *  </span>
     * </div>
     */
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
    presetIcons({
      scale: 1.2,
      warn: true,
      prefix: ['i-'],
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
