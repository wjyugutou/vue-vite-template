<script lang='ts' setup generic="T">
import type { ListDirection } from 'vant'

interface PullRefreshListProps {
  dataFetch: () => Promise<PagenationResponse<T>>
  /* 禁止下拉刷新 */
  disabledPullRefresh?: boolean
  /* 禁止触底加载 */
  disabledDownFetch?: boolean
  // list props
  offset?: string | number
  direction?: ListDirection
  immediateCheck?: boolean
  finishedText?: string
  errorListText?: string
  loadingText?: string
  scroller?: Element

  // 下拉刷新 props
  pullingText?: string
  loosingText?: string
  errorPullRefreshText?: string
  successText?: string
  headHeight?: string | number
  successDuration?: string | number
  animationDuration?: string | number
}

const props = withDefaults(defineProps<PullRefreshListProps>(), {
  finishedText: '没有更多了',
  pullingText: '下拉刷新',
  loosingText: '释放加载',
  errorText: '请求失败，点击重新加载',
  offset: 300,
})

defineSlots<{
  pulling: (props: { distance: number }) => any
  loosing: (props: { distance: number }) => any
  default: (props: { data: T, index: number }) => any
}>()

const data = ref([]) as Ref<T[]>
// 下拉刷新loading
const refreshLoading = ref(false)

// 触底加载loading
const listLoading = ref(false)
const listFinished = ref(false)
const listError = ref(false)

const pagenation = ref({
  page: 1,
  limit: 10,
  total: 10,
})

async function getData() {
  try {
    refreshLoading.value = true
    const res = await props.dataFetch()

    data.value = [...data.value, ...res.list]
    refreshLoading.value = false
    listFinished.value = data.value.length >= pagenation.value.total
  }
  catch (error) {
    console.error('PullRefreshList Error:', error)
  }
}
getData()

async function onRefresh() {
  refreshLoading.value = true
  data.value = []
  pagenation.value.page = 1
  pagenation.value.total = 10
  listFinished.value = false
  await getData()
  refreshLoading.value = false
}

async function onListLoad() {
  listLoading.value = true
  pagenation.value.page++
  await getData()
  listLoading.value = false
}
</script>

<template>
  <VanPullRefresh v-model="refreshLoading" class="h-full" :disabled="disabledPullRefresh" @refresh="onRefresh">
    <!-- 下拉 -->
    <template #pulling="props">
      <slot name="pulling" v-bind="props">
        {{ pullingText }}
      </slot>
    </template>
    <!-- 释放 -->
    <template #loosing="props">
      <slot name="loosing" v-bind="props">
        {{ loosingText }}
      </slot>
    </template>
    <VanList
      v-model:loading="listLoading"
      v-model:error="listError" error-text="请求失败，点击重新加载"
      :disabled="disabledDownFetch"
      :finished="listFinished" :finished-text="finishedText"
      :offset="offset" :immediate-check="immediateCheck"
      @load="onListLoad"
    >
      <template v-for="(item, index) in data" :key="index">
        <slot :data="item" :index="index" />
      </template>
    </VanList>
  </VanPullRefresh>
</template>
