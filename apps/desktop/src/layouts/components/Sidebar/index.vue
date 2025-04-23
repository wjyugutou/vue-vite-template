<script lang='ts' setup>
import Logo from '../Logo.vue'
import SidebarItem from './SidebarItem.vue'

defineOptions({ name: 'Sidebar' })

const { menus } = storeToRefs(useUserStore())
const { menuState, settings } = storeToRefs(useAppStore())

const route = useRoute()

// 初始化激活菜单
function initActiveMenu() {
  const path = route.meta?.activePath || route.path
  const menu = menus.value.flatMap(menu => menu.children!).find(menu => menu?.path === path)

  if (menu) {
    menuState.value.active = menu.path
    menuState.value.openeds = menu.children?.map(child => child.path) || []
  }
}

initActiveMenu()

watchEffect(() => {
  console.log('layoutMode', settings.value.layoutMode)
})
</script>

<template>
  <ElMenu
    class="sidebar"
    :style="{ marginTop: settings.layoutMode === 'side' ? 'var(--header-height)' : '0' }"
    :default-openeds="menuState.openeds"
    :default-active="menuState.active"
    :collapse="settings.sidebarCollapse"
  >
    <Logo v-if="settings.layoutMode === 'vertical'" class="px-20px" />
    <ScrollView>
      <template v-for="menu in menus" :key="menu.path">
        <SidebarItem v-if="!menu.meta?.hiddenInMenu" :item="menu" />
      </template>
    </ScrollView>
    <div class="absolute bottom-0 left-0 h-[var(--sidebar-bottom-height)] w-full flex-center b-t px-4">
      <div
        class="i-carbon-distribute-horizontal-left hover:bg-primary/90 cursor-pointer" :class="{ 'bg-primary/90': settings.sidebarCollapse }"
        @click="settings.sidebarCollapse = !settings.sidebarCollapse"
      />
    </div>
  </ElMenu>
</template>

<style>
.sidebar {
  --at-apply: flex flex-col;
  --sidebar-bottom-height: 35px;

  width: var(--sidebar-width);
  padding-bottom: var(--sidebar-bottom-height);

  &.el-menu--collapse {
    width: var(--sidebar-width-collapsed);

    .el-tooltip__trigger > *:not(:nth-child(1)) {
      opacity: 0;
    }
  }
}
</style>
