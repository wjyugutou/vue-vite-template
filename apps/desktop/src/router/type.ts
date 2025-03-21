import type { RouteComponent, RouteMeta, RouteRecordRaw } from 'vue-router'

export type RouteRecordRawC = {
  meta?: RouteMeta
  component?: string | RouteComponent
  children?: RouteRecordRawC[]
} & RouteRecordRaw
