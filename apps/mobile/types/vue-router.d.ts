/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...404]': RouteRecordInfo<'/[...404]', '/:404(.*)', { 404: ParamValue<true> }, { 404: ParamValue<false> }>,
    'ExampleList': RouteRecordInfo<'ExampleList', '/example/list', Record<never, never>, Record<never, never>>,
    '/example/simpleform': RouteRecordInfo<'/example/simpleform', '/example/simpleform', Record<never, never>, Record<never, never>>,
    '/hi/': RouteRecordInfo<'/hi/', '/hi', Record<never, never>, Record<never, never>>,
    'hi-name': RouteRecordInfo<'hi-name', '/hi/:name', { name: ParamValue<true> }, { name: ParamValue<false> }>,
  }
}
