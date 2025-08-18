# Vue Vite Template Monorepo

这是一个基于 pnpm + Vue3 + TypeScript + Vite 的 monorepo 项目模板，包含PC端和移动端应用。

## 🚀 特性

- 📦 基于 pnpm workspace 的 monorepo 架构
- ⚡️ Vite 4 构建，快速的开发体验
- 🎯 TypeScript 支持
- 🎨 UnoCSS 原子化 CSS
- 📱 PC端和移动端应用
- 🔄 Turbo 构建系统
- 🔍 ESLint + @antfu/eslint-config 代码规范
- 📡 Alova + Fetch 请求库
- 🗃️ Pinia 状态管理
- 🎯 Vue Router 路由管理

## 📦 项目结构

```bash
.
├── apps                    # 应用目录
│   ├── desktop            # PC端应用
│   └── mobile             # 移动端应用
├── packages               # 共享包目录
│   ├── api               # API 接口
│   ├── config            # 配置文件
│   ├── hooks             # Vue组件钩子
│   └── utils             # 工具函数
├── scripts                # 构建脚本
└── package.json          # 项目配置
```

## 🔧 环境要求

- Node.js ^20.19.0 || >=22.12.0
- pnpm >= 10.8.1

## 🚀 快速开始

1. **安装依赖**

   ```bash
   pnpm install
   ```

2. **开发命令**

   ```bash
   # 开发所有项目
   pnpm dev

   # 开发PC端
   pnpm dev:desktop

   # 开发移动端
   pnpm dev:mobile
   ```

3. **构建命令**

   ```bash
   # 构建所有项目
   pnpm build

   # 构建PC端
   pnpm build:desktop

   # 构建移动端
   pnpm build:mobile
   ```

## 📝 开发指南

### 环境变量

环境变量类型定义在 `types/vite-env.d.ts`：

```ts
interface ImportMetaEnv {
  // 应用标题
  readonly VITE_APP_TITLE: string
  // 主题色存储键
  readonly VITE_COLOR_SCHEMA_STORAGE_KEY: string
  // 更多环境变量...
}
```

### API 请求

使用 alova + fetchAdapter 发起请求：

```ts
// 导入 API
import { testApi } from 'api'
// 导入 alova hooks
import { useRequest } from 'api/alova'

const { data, loading, error } = useRequest(testApi)

watchEffect(() => {
  console.log('data', data.value)
  console.log('loading', loading.value)
  console.log('error', error.value)
})
```

### 样式开发

项目使用 UnoCSS 进行样式开发：

- 优先使用原子化 CSS
- 复杂样式使用 CSS Modules
- 支持 CSS 嵌套语法
- 遵循 BEM 命名规范

### 插件系统

项目使用以下核心插件：

- [unplugin-vue-router](https://uvr.esm.is/) - 文件系统路由
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - API 自动导入
- [unplugin-vue-components](https://github.com/antfu/vite-plugin-components) - 组件自动注册

## 📚 最佳实践

### Monorepo 开发规范

1. **包的职责划分**

   - `apps/*`: 独立应用
   - `packages/*`: 共享功能模块
   - `packages/config`: 共享配置
   - `packages/utils`: 通用工具函数
   - `packages/api`: API 接口封装
   - `packages/hooks`: Vue 组合式函数

2. **依赖管理**

   - 共享依赖放在根目录 package.json
   - 特定依赖放在各自的 package.json
   - 使用 `pnpm.overrides` 统一依赖版本

3. **版本控制**
   - 遵循 Semantic Versioning
   - 使用 changesets 管理版本
   - 保持依赖版本一致性

### 代码规范

1. **TypeScript**

   - 严格模式开发
   - 完整的类型定义
   - 避免使用 any

2. **Vue 组件**

   - 使用组合式 API
   - 按功能组织代码
   - 提取可复用逻辑到 hooks

3. **样式规范**
   - 优先使用 UnoCSS
   - 遵循 BEM 命名
   - 避免深层嵌套

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交改动
4. 发起 Pull Request

## 📄 许可证

[MIT](./LICENSE)
