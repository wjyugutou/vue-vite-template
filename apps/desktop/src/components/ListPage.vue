<script setup lang="ts">
import type { FormItem, Props as FormProps } from '@/components/SimpleForm/type'
import type { ChangeEventParams, Props } from '@/components/SimpleTable/type'
import type { TableProps } from 'ant-design-vue'

const props = defineProps<{
  tableData: any[]
  loading: boolean
  pagination?: Props['pagination']
  total?: number
  pageSize?: number
  pageNum?: number
  columns: Props['columns']
  formItems: FormItem[]
  labelCol?: FormProps['labelCol']
  handleSearch: () => void
  handleReset: () => void
  rowKey: TableProps['rowKey']
  layout?: string
  rowSelection?: boolean | TableProps['rowSelection']
}>()

const emit = defineEmits<{
  'update:pageNum': [number]
  'update:pageSize': [number]
  'tableChange': [ChangeEventParams]
  'select': [string[]]
}>()

const searchForm = defineModel<Record<string, any>>({ required: true })

const _formItems = computed(() => {
  return [...props.formItems, {
    span: 8,
    slot: 'search',
  }]
})

const tableSlots = computed(() => {
  // @ts-expect-error dataIndex
  return props.columns!.filter(item => item.key === 'slot').map(item => item.dataIndex)
})

function handleChange({ pagination, filters, sorter }: ChangeEventParams) {
  if (props.pagination !== false) {
    emit('update:pageNum', pagination.current!)
    emit('update:pageSize', pagination.pageSize!)
  }
  emit('tableChange', { pagination, filters, sorter })
}

function handleSelect(selectedRowKeys: string[]) {
  emit('select', selectedRowKeys)
}
</script>

<template>
  <div class="list-page size-full flex flex-1 flex-col">
    <div class="search-form">
      <slot name="search">
        <SimpleForm v-model="searchForm" :form-items="_formItems" :label-col="labelCol">
          <template #search>
            <AButton type="primary" class="ant-btn" @click="handleSearch">
              <template #icon>
                <div class="i-ant-design-search-outlined" />
              </template>
              <span>搜索</span>
            </AButton>
            <AButton class="ant-btn ml-2" @click="handleReset">
              <template #icon>
                <div class="i-ant-design-reload-outlined" />
              </template>
              <span>重置</span>
            </AButton>
          </template>
        </SimpleForm>
      </slot>
    </div>
    <div class="search-table h-0 flex flex-1 flex-col">
      <slot name="table">
        <SimpleTable
          :columns="columns" :data-source="tableData"
          :loading="loading" :row-selection="rowSelection"
          :pagination="pagination" :total="total" :current="pageNum" :page-size="pageSize" :row-key="rowKey"
          @change="handleChange"
          @select="handleSelect"
        >
          <template #header>
            <slot name="table-header" />
          </template>

          <template v-for="slot in tableSlots" #[slot]="{ record, index, column, text }">
            <slot :name="slot" :record="record" :column="column" :index="index" :text="text" />
          </template>
        </SimpleTable>
      </slot>
    </div>
  </div>
</template>

<style  scoped>
.list-page {
  & :deep(.ant-table-pagination) {
    margin-bottom: 0;
  }
}
</style>
