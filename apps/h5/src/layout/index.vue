<script lang='ts' setup>
const router = useRouter()
const route = useRoute()

const title = computed(() => route.meta.title as string ?? 'Layout')

const hideNavBar = computed(() => route.meta.hideNavBar as boolean)
</script>

<template>
  <VanNavBar v-if="!hideNavBar" :title="title" :left-arrow="(!route.meta.hideLeftArrow as boolean)" @click-left="router.back" />
  <main class="overflow-auto" :class="[`${hideNavBar ? 'h-100vh' : 'h-[calc(100vh-var(--van-nav-bar-height))]'}`]">
    <RouterView />
  </main>
</template>

<style scoped>

</style>
