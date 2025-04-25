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

# 路由

路由使用unplugin-vue-router

## keepAlive

开启keepAlive 需要配置name 以及meta.keepAlive 为 true

```
<route lang="yaml">
{
  name: 'ExampleList',
  meta: {
    title: '示例 列表',
    keepAlive: true,
  }
}
</route>
<!-- 组件中 name 与 route 的 name 一致 -->
defineOptions({ name: 'ExampleList' })

```

# 样式

使用unocss

关于 蓝湖，CoDesign等设计工具，需要使用unocss的配置，将设计稿的px转换为rem，基准像素为18.75px
即可做到如下对应

```css
/* 设计稿 */
width: 74.03rem;
height: 46.83rem;
border-radius: 1.49rem;
background: #fff;

/* 转换为unocss的class */
class="w-74.03 h-46.83 rounded-1.49 bg-white"
```
