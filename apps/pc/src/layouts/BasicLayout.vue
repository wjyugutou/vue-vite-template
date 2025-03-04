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
      <section class="mt-[var(--header-height)] h-full flex-1">
        <IFrame v-if="route.meta.iframeSrc" />
        <ElScrollbar class="p-2">
          <RouterView />
        </ElScrollbar>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>
