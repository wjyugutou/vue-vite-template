<script lang='ts' setup generic="T">
import type { ListDirection } from 'vant'

interface PullRefreshListProps {
  dataFetch: (params: Record<string, any>) => Promise<PagenationResponse<T>>
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

  // limit
  limit?: number

  /**
   * dropdown props
   * @field prop dropdown-item 的 v-model 属性
   * @field title dropdown-item 的 title 属性
   */
  dropdownList?: {
    prop: string
    title: string
    options: { text: string, value: string | number }[]
  }[]
}

const props = withDefaults(defineProps<PullRefreshListProps>(), {
  finishedText: '没有更多了',
  pullingText: '下拉刷新',
  loosingText: '释放加载',
  errorText: '请求失败，点击重新加载',
  offset: 300,
  immediateCheck: true,
  limit: 10,
})

defineSlots<{
  dropdown: () => any
  pulling: (props: { distance: number }) => any
  loosing: (props: { distance: number }) => any
  default: (props: { data: T, index: number }) => any
}>()

const _dropdownList = ref<typeof props.dropdownList>([])
watch(() => props.dropdownList, () => {
  _dropdownList.value = props.dropdownList
})

const params = reactive<{
  dropdown: Record<string, string | number>
}>({
  dropdown: {},
})

const data = ref([]) as Ref<T[]>
// 下拉刷新loading
const refreshLoading = ref(false)

// 触底加载loading
const listLoading = ref(false)
const listFinished = ref(false)
const listError = ref(false)

const limit = computed(() => props.limit)

const pagenation = ref({
  page: 1,
  total: 10,
})

async function getData() {
  try {
    const res = await props.dataFetch({
      ...params,
      page: pagenation.value.page,
      limit: limit.value,
    })

    data.value = [...data.value, ...res.list]
    pagenation.value.total = res.total

    listFinished.value = data.value.length >= pagenation.value.total
  }
  catch (error) {
    console.error('PullRefreshList Error:', error)
  }
}

function onRefresh() {
  // 清空数就会触发 list-load
  pagenation.value.page = 1
  pagenation.value.total = 10
  listFinished.value = false
  data.value = []
}

async function onListLoad() {
  refreshLoading.value = false

  listLoading.value = true
  pagenation.value.page++
  await getData()
  listLoading.value = false
}
</script>

<template>
  <slot name="dropdown">
    <van-dropdown-menu v-if="dropdownList?.length">
      <van-dropdown-item v-for="item, index in dropdownList" :key="index" v-model="params.dropdown[item.prop]" :title="params.dropdown[item.prop] ? undefined : item.title" :options="item.options" />
    </van-dropdown-menu>
  </slot>
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
