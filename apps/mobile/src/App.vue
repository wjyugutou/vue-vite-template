<script lang="ts" setup>
import { testApi, useRequest } from 'api'
import { ConfigProvider } from 'vant'
import Layout from './layout/index.vue'

const theme = isDark.value ? 'dark' : 'light'

const { data, loading, error } = useRequest(testApi)

watchEffect(() => {
  console.log('data', data.value)
  console.log('loading', loading.value)
  console.log('error', error.value)
})

showFailToast('123')
</script>

<template>
  <ConfigProvider :theme="theme">
    <Layout />
  </ConfigProvider>
</template>
