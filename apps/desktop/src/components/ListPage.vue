<script setup lang="ts">
import type { FormItem, Props as FormProps } from '@/components/SimpleForm/type'
import type { ChangeEventParams, Props } from '@/components/SimpleTable/type'
import type { TableProps } from 'ant-design-vue'

const props = withDefaults(defineProps<{
  tableData: Record<string, any>[]
  loading: boolean
  total: number
  pageSize: number
  pageNum: number
  columns: Props['columns']
  formItems: FormItem[]
  labelCol?: FormProps['labelCol']
  handleSearch: () => void
  handleReset: () => void
  layout?: string
  rowSelection?: true | TableProps['rowSelection']
  index?: boolean
}>(), {
  index: true,
})

const emit = defineEmits<{
  'update:pageNum': [number]
  'update:pageSize': [number]
  'tableChange': [e: ChangeEventParams]
}>()

const searchForm = defineModel<Record<string, any>>({ required: true })

const _formItems = computed(() => {
  return [...props.formItems, {
    slot: 'search',
  }]
})

const tableSlots = computed(() => {
  // @ts-expect-error dataIndex
  return props.columns!.filter(item => item.key === 'slot').map(item => item.dataIndex)
})

function handleChange({ pagination, filters, sorter }: ChangeEventParams) {
  emit('update:pageNum', pagination.current!)
  emit('update:pageSize', pagination.pageSize!)
  emit('tableChange', { pagination, filters, sorter })
}
</script>

<template>
  <div class="size-full flex flex-1 flex-col p-2">
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
          :loading="loading" :index="index" :row-selection="rowSelection"
          :total="total" :current="pageNum" :page-size="pageSize"
          @change="handleChange"
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
