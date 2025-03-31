<script lang='ts' setup>
import type { RouteRecordRawC } from '@/router/type'

const props = defineProps<{
  item: RouteRecordRawC
  parentPath?: RouteRecordRawC['path']
}>()

const key = computed(() => `${props.parentPath ? `${props.parentPath}/` : ''}${props.item.path}`)
</script>

<template>
  <ASubMenu v-if="item.children && item.children.length > 0" :key="key">
    <template v-if="item.meta?.icon" #title>
      <!-- <span :class="item.meta.icon" class="mr-4" /> -->
      <span class="icon i-carbon-user" />
      <span>{{ item.meta?.title }}</span>
    </template>
    <template v-for="child in item.children" :key="child.path">
      <SidebarItem v-if="!child.meta?.hideInMenu" :item="child" :parent-path="item.path" />
    </template>
  </ASubMenu>
  <template v-else>
    <AMenuItem :key="key" :route="item">
      <!-- <span v-if="item.meta?.icon" :class="  item.meta.icon" class="mr-4" /> -->
      <!-- <span class="icon i-carbon-user" /> -->
      <span class="icon i-carbon-user" />
      <span>{{ item.meta?.title }}</span>
    </AMenuItem>
  </template>
</template>

<style>

</style>
