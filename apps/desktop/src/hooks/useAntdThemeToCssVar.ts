import type { ConfigProviderProps } from 'ant-design-vue'
import { theme } from 'ant-design-vue'

const { defaultSeed, defaultAlgorithm, darkAlgorithm } = theme

/**
 * 获取 antd 的主题色
 */
export function useAntdvTheme() {
  const isDark = useTheme()

  const theme = computed<ConfigProviderProps['theme']>(() => {
    if (isDark.value) {
      return {
        token: darkAlgorithm(defaultSeed),
        algorithm: darkAlgorithm,
      }
    }
    return {
      token: defaultAlgorithm(defaultSeed),
      algorithm: defaultAlgorithm,
    }
  })

  return theme
}

/**
 * 将 antd 的主题色转换为 css 变量
 */
export function useAntdvThemeToCssVar() {
  const isDark = useTheme()

  watch(isDark, (value) => {
    if (value) {
      setCssVar(defaultAlgorithm(defaultSeed))
    }
    else {
      setCssVar(darkAlgorithm(defaultSeed))
    }
  },
  {
    immediate: true,
  })
}

/**
 * 设置 css 变量 写入 style 标签
 * @param token
 */
function setCssVar(token: Record<string, any>) {
  useStyleTag(`
    :root {
      ${Object.entries(token).map(([key, value]) => `--${key}: ${value};`).join('\n')}
    }
  `)
}
