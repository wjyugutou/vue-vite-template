<script lang="ts" setup>
import type { TableProps } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

useAntdThemeToCssVar()

// table 空值显示 -
const transformCellText: TableProps['transformCellText'] = ({ text, column, record, index }) => {
  if (text === '' || text === null || text === undefined) {
    return '-'
  }

  return text
}
</script>

<template>
  <AConfigProvider :locale="zhCN" :transform-cell-text="transformCellText">
    <!-- <AStyleProvider hash-priority="high"> -->
    <RouterView />
    <!-- </AStyleProvider> -->
  </AConfigProvider>
</template>
