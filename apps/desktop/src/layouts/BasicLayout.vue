<script lang='ts' setup>
import Navbar from './components/Navbar/index.vue'
import Settings from './components/Settings/index.vue'
import Sidebar from './components/Sidebar/index.vue'

defineOptions({ name: 'BasicLayout' })

const route = useRoute()
</script>

<template>
  <div class="h-100vh w-100vw flex">
    <Sidebar />
    <div class="mt-[var(--header-height)] h-[calc(100vh-var(--header-height))] w-[var(--sidebar-width)] flex flex-grow-1 flex-col">
      <Navbar />
      <main class="h-full flex-1 overflow-hidden">
        <IFrame v-if="route.meta.iframeSrc" />
        <ScrollView v-else class="p-2">
          <RouterView>
            <template #default="{ Component }">
              <Transition name="fade-transform">
                <component :is="Component" />
              </Transition>
            </template>
          </RouterView>
        </ScrollView>
      </main>
    </div>
    <Settings />
  </div>
</template>

<style scoped>
.scroll-view {
  & :deep(.el-scrollbar__view) {
    min-height: 100%;
  }
}
</style>
