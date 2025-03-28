/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  /** 请求的基础路径 */
  readonly VITE_API_BASE_URL: string
  /** app 颜色模式的storage key */
  readonly VITE_COLOR_SCHEMA_STORAGE_KEY: string
  /** 是否开启gzip */
  readonly VITE_BUILD_GZIP: 'true' | 'false'
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
