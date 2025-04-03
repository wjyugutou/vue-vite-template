<script lang='ts' setup>
import type { CSSProperties } from 'vue'
import Logo from '../Logo.vue'
import Avatar from './Avatar.vue'
import TagView from './TagView.vue'

defineOptions({ name: 'Navbars' })

const { settings } = storeToRefs(useAppStore())

const navbarStyle = computed<CSSProperties>(() => ({
  width: settings.value.sidebarCollapse
    ? 'calc(100vw - var(--sidebar-width-collapsed))'
    : settings.value.layoutMode === 'side' ? '100vw' : 'calc(100vw - var(--sidebar-width))',
  left: settings.value.sidebarCollapse ? 'var(--sidebar-width-collapsed)' : settings.value.layoutMode === 'side' ? 0 : 'var(--sidebar-width)',
}))

function toggleThemeMode(e: MouseEvent) {
  toggleDark(e)
}

function handleSettings() {
  settings.value.settingsDrawerVisible = true
}
</script>

<template>
  <div class="navbar">
    <nav class="bg-primary fixed right-0 top-0 h-[var(--header-height)] flex items-center justify-between px-4 transition-all" :style="navbarStyle">
      <Logo v-if="settings.layoutMode === 'side'" />
      <div />
      <div class="flex items-center gap-col-4">
        <AButton class="hover:text-primary flex-center" type="text" @click="handleSettings">
          <div class="i-ant-design-setting-outlined text-16px text-white" />
        </AButton>

        <AButton class="hover:text-primary flex-center" type="text" @click="toggleThemeMode">
          <div class="dark:i-ant-design-moon-outlined i-ant-design-sun-outlined text-16px text-white" />
        </AButton>

        <Avatar />
      </div>
    </nav>

    <TagView v-if="settings.showTagView" />
  </div>
</template>
