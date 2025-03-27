<script lang='ts' setup>
import type { CSSProperties } from 'vue'
import Logo from '../Logo.vue'
import SidebarItem from './SidebarItem.vue'

defineOptions({ name: 'Sidebar' })

const { menus } = storeToRefs(useUserStore())
const { menuState, settings } = storeToRefs(useAppStore())

const sidebarSeatStyle = computed<CSSProperties>(() => ({
  width: settings.value.sidebarCollapse ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
  // minWidth: settings.value.sidebarCollapse ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
  // maxWidth: settings.value.sidebarCollapse ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
}))

const sidebarStyle = computed<CSSProperties>(() => ({
  left: 0,
  top: settings.value.layoutMode === 'vertical' ? 0 : 'var(--header-height)',
}))

// 初始化激活菜单
function initActiveMenu() {
  console.log('initActiveMenu')

  const path = useRoute().path
  const menu = menus.value.flatMap(menu => menu.children!).find(menu => menu?.path === path)

  if (menu) {
    menuState.value.defaultActive = menu.path
    menuState.value.defaultOpeneds = menu.children?.map(child => child.path) || []
  }
}

initActiveMenu()
</script>

<template>
  <div>
    <!-- sidebar 占位 -->
    <div :style="sidebarSeatStyle" class="h-0 transition-all" />
    <ElMenu
      :style="sidebarStyle" class="sidebar"
      :hide-timeout="0"
      :collapse-transition="false"
      :default-openeds="menuState.defaultOpeneds"
      :default-active="menuState.defaultActive"
      :collapse="settings.sidebarCollapse"
    >
      <Logo v-if="settings.layoutMode === 'vertical'" class="flex-shrink-0 b-b b-b-[var(--el-border-color)] px-20px" />

      <ElScrollbar class="flex-1">
        <template v-for="menu in menus" :key="menu.path">
          <SidebarItem v-if="!menu.meta?.hideInMenu" :item="menu" />
        </template>
      </ElScrollbar>
      <div class="h-[var(--sidebar-bottom-height)] w-full flex-shrink-0 content-center px-4">
        <div
          class="i-carbon-distribute-horizontal-left cursor-pointer hover:bg-primary/90" :class="{ 'bg-primary/90': settings.sidebarCollapse }"
          @click="settings.sidebarCollapse = !settings.sidebarCollapse"
        />
      </div>
    </ElMenu>
  </div>
</template>

<style>
.sidebar {
  --sidebar-bottom-height: 35px;
  @apply bottom-0 left-0 flex-shrink-0 flex-basis-[var(--sidebar-width)] transition-all important-fixed;
  @apply flex flex-col;

  &:not(.el-menu--collapse) {
    width: var(--sidebar-width);
  }

  &.el-menu--collapse {
    width: var(--sidebar-width-collapsed);
  }
}
</style>
