<script lang='ts' setup>
import Navbar from './components/Navbar/index.vue'
import Settings from './components/Settings/index.vue'
import Sidebar from './components/Sidebar/index.vue'

defineOptions({ name: 'BasicLayout' })

const route = useRoute()
</script>

<template>
  <div class="h-100vh flex">
    <Sidebar />
    <div class="mt-[var(--header-height)] h-[calc(100vh-var(--header-height))] flex flex-grow-1 flex-col">
      <Navbar />
      <main class="h-full flex-1 p-2">
        <IFrame v-if="route.meta.iframeSrc" />
        <RouterView v-else>
          <template #default="{ Component }">
            <Transition name="fade-transform">
              <component :is="Component" />
            </Transition>
          </template>
        </RouterView>
      </main>
    </div>
    <Settings />
  </div>
</template>
