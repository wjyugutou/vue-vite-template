<script lang='ts' setup>
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'

defineOptions({ name: 'BasicLayout' })

const route = useRoute()
</script>

<template>
  <div class="h-100vh">
    <Navbar />
    <div class="h-[calc(100vh-var(--header-height))] flex">
      <Sidebar />
      <main class="mt-[var(--header-height)] h-full flex-1">
        <ElScrollbar>
          <IFrame v-if="route.meta.iframeSrc" />
          <RouterView v-else />
        </ElScrollbar>
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>
