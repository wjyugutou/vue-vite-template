import { defineConfig } from 'unocss'
import config from '../../unocss.config'

export default defineConfig({
  ...config,
  shortcuts: [
    ...(config.shortcuts as Array<[string, string]>),
    ['ant-btn', 'inline-flex gap-2 items-center justify-center'],
  ],
  theme: {
    colors: {
      'primary': 'var(--colorPrimary)',
      'success': 'var(--colorSuccess)',
      'warning': 'var(--colorWarning)',
      'error': 'var(--colorError)',
      'info': 'var(--colorInfo)',
      'text-base': 'var(--colorTextBase)',
      'bg-base': 'var(--colorBgBase)',
    },
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
})
