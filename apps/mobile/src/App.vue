<script lang="ts" setup>
import { ConfigProvider } from 'vant'
import Layout from './layout/index.vue'

const theme = isDark.value ? 'dark' : 'light'

showFailToast('123')
</script>

<template>
  <ConfigProvider :theme="theme">
    <Layout />
  </ConfigProvider>
</template>
