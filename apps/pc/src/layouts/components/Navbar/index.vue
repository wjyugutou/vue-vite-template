<script lang='ts' setup>
import type { CSSProperties } from 'vue'
import Avatar from './Avatar.vue'

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
</script>

<template>
  <header class="fixed right-0 top-0 h-[var(--header-height)] flex items-center justify-between b-b b-b-[var(--el-border-color)] px-4 transition-all" :style="navbarStyle">
    <Logo v-if="settings.layoutMode === 'side'" />
    <div />
    <div class="flex items-center gap-col-4">
      <button @click="settings.layoutMode = 'side'">side</button>
      <button class="ml-10" @click="settings.layoutMode = 'vertical'">vertical</button>

      <button class="icon-btn hover:text-primary" @click="toggleThemeMode">
        <div class="dark:i-carbon-moon i-carbon-sun" />
      </button>

      <Avatar />
    </div>
  </header>
</template>
