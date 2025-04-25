<script lang='ts' setup>
import Footer from './footer.vue'

const router = useRouter()
const route = useRoute()

const title = computed(() => route.meta.title as string ?? 'Layout')

const hideNavBar = computed(() => route.meta.hideNavBar ?? false)

const hideLeftArrow = computed(() => route.meta.hideLeftArrow ?? false)

const { cachedList } = storeToRefs(useAppStore())
</script>

<template>
  <div class="layout-container h-100vh flex flex-col">
    <VanNavBar v-if="!hideNavBar" :title="title" :left-arrow="!hideLeftArrow" safe-area-inset-top @click-left="router.back" />
    <main class="flex-1 overflow-auto">
      <RouterView>
        <template #default="{ Component }">
          <!-- <Transition name="fade-transform"> -->
          <KeepAlive :include="cachedList">
            <component :is="Component" />
          </KeepAlive>
          <!-- </Transition> -->
        </template>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>
