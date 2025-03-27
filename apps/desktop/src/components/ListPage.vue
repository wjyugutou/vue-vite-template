<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import { Refresh, Search } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  tableData: Record<string, any>[]
  loading: boolean
  total: number
  pageSize: number
  pageNum: number
  columns: Column[]
  formItems: FormItem[]
  labelWidth?: string | number
  handleSearch: () => void
  handleReset: () => void
  pageSizes?: number[]
  layout?: string
  selection?: boolean
}>(), {
  pageSizes: () => [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper',
})

const emit = defineEmits<{
  (e: 'update:pageNum', val: number): void
  (e: 'update:pageSize', val: number): void
  (e: 'selectionChange', val: any): void
}>()

const searchForm = defineModel<Record<string, any>>({ required: true })

const _formItems = computed(() => {
  return [...props.formItems, {
    slot: 'search',
  }]
})

const tableSlots = computed(() => {
  return props.columns.filter(item => item.slot).map(item => item.slot)
})

function handleCurrentChange(val: number) {
  emit('update:pageNum', val)
  props.handleSearch()
}

function handleSizeChange(val: number) {
  emit('update:pageSize', val)
  props.handleSearch()
}

function handleSelectionChange(val: any) {
  emit('selectionChange', val)
}
</script>

<template>
  <div class="size-full flex flex-1 flex-col p-2">
    <div class="search-form">
      <slot name="search">
        <SimpleForm v-model="searchForm" :form-items="_formItems" :label-width="labelWidth">
          <template #search>
            <ElButton type="primary" :icon="Search" @click="handleSearch"> 搜索 </ElButton>
            <ElButton :icon="Refresh" @click="handleReset"> 重置 </ElButton>
          </template>
        </SimpleForm>
      </slot>
    </div>
    <div v-loading="loading" class="search-table h-0 flex flex-1 flex-col">
      <slot name="table">
        <SimpleTable :columns="columns" :table-data="tableData" :selection="selection" @selection-change="handleSelectionChange">
          <template #header>
            <slot name="table-header" />
          </template>

          <template v-for="slot in tableSlots" #[slot]="{ row, index }">
            <slot :name="slot" :row="row" :index="index" />
          </template>
        </SimpleTable>
      </slot>
      <ElPagination
        class="h-40px justify-end" :total="total" :page-size="pageSize" :page-num="pageNum" :page-sizes="pageSizes" :layout="layout"
        @current-change="handleCurrentChange" @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
