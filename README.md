# Node 版本

## Node >= 18

# 插件

路由 [unplugin-vue-router](https://uvr.esm.is/)
自动导入方法/hooks [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
自动注册组件 [unplugin-vue-components](https://github.com/antfu/vite-plugin-components)

# ENV

env 类型 写在 `types/vite-env.d.ts`

```ts
interface ImportMetaEnv {
  // 本身变量
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
  // color schema storage key
  readonly VITE_COLOR_SCHEMA_STORAGE_KEY: string
}
```

# 代码风格
使用 eslint + @antfu/eslint-config

# 请求

请求使用alova + fetchAdapter
封装在 package `api` 中

```ts
// 请求
import { testApi } from 'api'
// alova hooks
import { useRequest } from 'api/alova'

const { data, loading, error } = useRequest(testApi)

watchEffect(() => {
  console.log('data', data.value)
  console.log('loading', loading.value)
  console.log('error', error.value)
})
```

# 样式
使用 UnoCSS 原子化 CSS

## CSS 开发规范
- 使用原子化 CSS 优先
- 复杂样式使用 CSS Modules
- 支持 CSS 嵌套语法
- 遵循 BEM 命名规范
