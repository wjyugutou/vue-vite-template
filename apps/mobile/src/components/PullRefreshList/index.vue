<script lang='ts' setup generic="T">
import type { FieldSelectProps } from '../FieldSelect/type'
import type { PullRefreshListProps, PullRefreshListSlots } from './type'

defineOptions({
  name: 'PullRefreshList',
})

const props = withDefaults(defineProps<PullRefreshListProps<T>>(), {
  finishedText: '没有更多了',
  pullingText: '下拉刷新',
  loosingText: '释放加载',
  errorText: '请求失败，点击重新加载',
  offset: 300,
  immediateCheck: true,
  limit: 10,
})

defineSlots<PullRefreshListSlots<T>>()

const fieldOptions = computed<FieldSelectProps['fieldOptions']>(() => ({
  placeholder: props.searchOptions?.placeholder,
  name: props.searchOptions?.prop,
}))

const _dropdownList = ref<typeof props.dropdownOptions>([])
watch(() => props.dropdownOptions, () => {
  _dropdownList.value = props.dropdownOptions
})

const params = reactive<Record<string, any>>({

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
  <div>
    <slot name="header">
      <slot name="search">
        <VanField v-if=" searchOptions?.prop" v-model="params[searchOptions.prop]" :placeholder="searchOptions.placeholder" />
      </slot>
      <slot name="picker">
        <FieldSelect
          v-if=" pickerOptions?.columns?.length && pickerOptions?.prop"
          v-model="params[pickerOptions.prop]" :field-options="fieldOptions" :picker-options="{ columns: pickerOptions.columns }"
        />
      </slot>
      <slot name="dropdown">
        <VanDropdownMenu v-if="dropdownOptions?.length">
          <VanDropdownItem v-for="item, index in dropdownOptions" :key="index" v-model="params[item.prop]" :title="params[item.prop] ? undefined : item.title" :options="item.options" />
        </VanDropdownMenu>
      </slot>
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
  </div>
</template>
