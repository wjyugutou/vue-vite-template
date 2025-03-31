import { theme } from 'ant-design-vue'

const { defaultSeed, defaultAlgorithm, darkAlgorithm } = theme

/**
 * 将 antd 的主题色转换为 css 变量
 */
export function useAntdThemeToCssVar() {
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
