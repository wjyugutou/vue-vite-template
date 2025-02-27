<script lang='ts' setup>
import { RouteRecordRawC } from '@/router/type';

const route = useRoute() as unknown as RouteRecordRawC

const loading = ref(true)

function handleLoad() {
  loading.value = false
}
</script>

<template>
  <div class="w-full h-full" v-loading="loading">
    <iframe class="w-full h-full" :src="route.meta?.iframeSrc" @load="handleLoad"/>
  </div>
</template>
