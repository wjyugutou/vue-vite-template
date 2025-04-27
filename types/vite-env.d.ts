/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ViteTypeOptions {
  // 添加这行代码，你就可以将 ImportMetaEnv 的类型设为严格模式，
  // 这样就不允许有未知的键值了。
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...

  readonly VITE_APP_TITLE: string
  /** 请求的基础路径 */
  readonly VITE_API_BASE_URL: string
  /** app 颜色模式的storage key */
  readonly VITE_COLOR_SCHEMA_STORAGE_KEY: string
  /** 是否开启gzip */
  readonly VITE_BUILD_GZIP: 'true' | 'false'
  /** app 简介 */
  readonly VITE_APP_DESCRIPTION: string

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
