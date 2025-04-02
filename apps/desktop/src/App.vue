<script lang="ts" setup>
import type { TableProps } from 'ant-design-vue'
import { Empty } from 'ant-design-vue'
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

function renderEmpty() {
  return h(Empty, { description: '暂无数据' })
}
</script>

<template>
  <AConfigProvider :locale="zhCN" :transform-cell-text="transformCellText" :render-empty="renderEmpty">
    <!-- <AStyleProvider hash-priority="high"> -->
    <RouterView />
    <!-- </AStyleProvider> -->
  </AConfigProvider>
</template>
