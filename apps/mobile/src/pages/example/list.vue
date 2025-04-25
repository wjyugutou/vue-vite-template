<route lang="yaml">
{
  name: 'ExampleList',
  meta: {
    title: '示例 列表',
    keepAlive: true,
  }
}
</route>

<script lang='ts' setup>
import type { DropdownOption } from '@/components/PullRefreshList/type'

defineOptions({ name: 'ExampleList' })
const dropdownList: DropdownOption[] = [
  {
    prop: 'month', title: '月份', type: 'dropdown',
    options: [
      { text: '今天', value: 'today' },
      { text: '昨天', value: 'yesterday' },
    ],
  },
  {
    prop: 'date', title: '日期', type: 'dropdown',
    options: [
      { text: '今天', value: 'today' },
      { text: '昨天', value: 'yesterday' },
    ],
  },
  {
    prop: 'city', title: '城市', type: 'picker',
    options: [
      { text: '杭州', value: 'Hangzhou' },
      { text: '宁波', value: 'Ningbo' },
      { text: '温州', value: 'Wenzhou' },
    ],
  },
]

function getData(params: Record<string, any>) {
  return new Promise<PagenationResponse<{ id: number, name: string }>>((resolve) => {
    setTimeout(() => {
      resolve({
        list: [
          { id: 1, name: '1' },
          { id: 2, name: '2' },
          { id: 3, name: '3' },
        ],
        total: 3,
      })
    }, 1000)
  })
}
</script>

<template>
  <PullRefreshList :dropdown-options="dropdownList" :data-fetch="getData">
    <template #default="props">
      <div>
        {{ props.data }}
      </div>
    </template>
  </PullRefreshList>
</template>
