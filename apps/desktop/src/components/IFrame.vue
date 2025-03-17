<script lang='ts' setup>
import type { RouteRecordRawC } from '@/router/type'

const route = useRoute() as unknown as RouteRecordRawC

const loading = ref(true)

function handleLoad() {
  loading.value = false
}
</script>

<template>
  <div v-loading="loading" class="h-full w-full">
    <iframe class="h-full w-full" :src="route.meta?.iframeSrc" @load="handleLoad" />
  </div>
</template>
