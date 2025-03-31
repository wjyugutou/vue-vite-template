<script lang='ts' setup>
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import type { CSSProperties } from 'vue'
import Logo from '../Logo.vue'
import SidebarItem from './SidebarItem.vue'

defineOptions({ name: 'Sidebar' })

const { menus } = storeToRefs(useUserStore())
const { menuState, settings } = storeToRefs(useAppStore())

const isDark = useTheme()

const router = useRouter()

const sidebarSeatStyle = computed<CSSProperties>(() => ({
  width: settings.value.sidebarCollapse ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
  // minWidth: settings.value.sidebarCollapse ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
  // maxWidth: settings.value.sidebarCollapse ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
}))

const sidebarStyle = computed<CSSProperties>(() => ({
  left: 0,
  top: settings.value.layoutMode === 'vertical' ? 0 : 'var(--header-height)',
  width: settings.value.sidebarCollapse ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',

}))

// 初始化激活菜单
// function initActiveMenu() {
//   const path = useRoute().path
//   const menu = menus.value.flatMap(menu => menu.children!).find(menu => menu?.path === path)

//   if (menu) {
//     menuState.value.selectedKeys = menu.path
//     menuState.value.openKeys = menu.children?.map(child => child.path) || []
//   }
// }

// initActiveMenu()

function handleClick(menuInfo: MenuInfo) {
  router.push(menuInfo.key as string)
}
</script>

<template>
  <div>
    <!-- sidebar 占位 -->
    <div :style="sidebarSeatStyle" class="h-0 transition-all" />
    <AMenu
      v-model:open-keys="menuState.openKeys"
      v-model:selected-keys="menuState.selectedKeys"
      :style="sidebarStyle"
      class="sidebar"
      mode="inline"
      :theme="isDark ? 'dark' : 'light'"
      :inline-collapsed="settings.sidebarCollapse"
      @click="handleClick"
    >
      <Logo v-if="settings.layoutMode === 'vertical'" class="flex-shrink-0 b-b b-b-[var(--el-border-color)] px-20px" />

      <ScrollView class="flex-1">
        <template v-for="menu in menus" :key="menu.path">
          <SidebarItem v-if="!menu.meta?.hideInMenu" :item="menu" />
        </template>
      </ScrollView>
      <div class="h-[var(--sidebar-bottom-height)] w-full flex-center flex-shrink-0 b-t px-4">
        <div
          class="i-carbon-distribute-horizontal-left hover:bg-primary/90 cursor-pointer" :class="{ 'bg-primary/90': settings.sidebarCollapse }"
          @click="settings.sidebarCollapse = !settings.sidebarCollapse"
        />
      </div>
    </AMenu>
  </div>
</template>

<style>
.sidebar {
  --sidebar-bottom-height: 35px;
  --at-apply: bottom-0 left-0 flex-shrink-0 flex-basis-[var(--sidebar-width)] transition-all important-fixed;
  --at-apply: flex flex-col;

  &.ant-menu-inline-collapsed {
    .ant-menu-item {
      text-overflow: clip;
    }
    .ant-menu-submenu-arrow,
    .ant-menu-title-content .icon +span {
      opacity: 0;
      display: none;
    }
  }

  .ant-menu-title-content .icon {
    vertical-align: text-bottom;
  }

  .ant-menu-title-content .icon +span {
    --at-apply: ml-2;
  }
}
</style>
