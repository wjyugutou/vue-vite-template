<script lang='ts' setup>
const dropdownList = [
  {
    prop: 'month',
    title: '月份',
    options: [
      { text: '今天', value: 'today' },
      { text: '昨天', value: 'yesterday' },
    ],
  },
  {
    prop: 'date',
    title: '日期',
    options: [
      { text: '今天', value: 'today' },
      { text: '昨天', value: 'yesterday' },
    ],
  },
]

function getData(params: Record<string, any>) {
  console.log('params', params)

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
  <PullRefreshList :dropdown-list="dropdownList" :data-fetch="getData">
    <template #default="props">
      <div>
        {{ props.data }}
      </div>
    </template>
  </PullRefreshList>
</template>
