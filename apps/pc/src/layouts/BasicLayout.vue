<script lang='ts' setup>
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'

defineOptions({ name: 'BasicLayout' })

const route = useRoute()
</script>

<template>
  <div class="h-100vh overflow-hidden">
    <Navbar />
    <div class="mt-[var(--header-height)] h-full flex">
      <Sidebar />
      <section class="h-full flex-1">
        <IFrame v-if="route.meta.iframeSrc" />
        <ElScrollbar v-else class="p-2" max-height="100%" height="100%">
          <RouterView />
        </ElScrollbar>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>
