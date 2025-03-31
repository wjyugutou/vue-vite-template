<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

useAntdThemeToCssVar()
</script>

<template>
  <AConfigProvider :locale="zhCN">
    <AStyleProvider hash-priority="high">
      <RouterView />
    </AStyleProvider>
  </AConfigProvider>
</template>
