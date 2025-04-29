import { fileURLToPath } from 'node:url'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index.ts', // 主入口
  ],
  alias: {
    '~': fileURLToPath(new URL('src', import.meta.url)), // 将 ~ 映射到 src 目录
  },
  outDir: 'dist', // 输出目录
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: false,
    inlineDependencies: true,
  },
})
