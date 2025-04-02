<script setup lang="ts">
import type { ColumnType, TableProps } from 'ant-design-vue/es/table'
import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { ChangeEventParams, Props } from './type'

defineOptions({ name: 'SimpleTable' })

/**
 * column key 为 slot 时，会使用 dataIndex 作为 slot 的 name 进行渲染
 */
const props = withDefaults(defineProps<Props>(), {
  pagination: () => ({
    currentKey: 'page',
    pageSizeKey: 'results',
    showQuickJumper: true,
    showSizeChanger: true,
  }),
})

const emit = defineEmits<{
  change: [props: ChangeEventParams]
  select: [selectedRowKeys: string[]]
}>()

defineSlots<{
  [k: string]: (text: any, record: Record<string, any>, index: number, column: ColumnType<any>) => any
}>()

// 选中行
const selectedKeys = ref<string[]>([])
const onSelectChange: TableRowSelection['onChange'] = (selectedRowKeys, selectedRows) => {
  selectedKeys.value = selectedRowKeys as string[]
  emit('select', selectedKeys.value)
}

const _rowSelection = computed<TableProps['rowSelection']>(() => {
  return props.rowSelection === true
    ? { selectedRowKeys: selectedKeys, preserveSelectedRowKeys: false, onChange: onSelectChange } as unknown as TableRowSelection
    : props.rowSelection
})

// 分页
const _pagination = computed<TableProps['pagination']>(() => {
  return {
    ...props.pagination,
    current: props?.current ?? 1,
    pageSize: props?.pageSize ?? 10,
    total: props?.total ?? 0,
  }
})

// 分页
const handleChange: TableProps['onChange'] = (pagination, filters, sorter) => {
  emit('change', { pagination, filters, sorter })
}
</script>

<template>
  <div class="h-0 flex flex-1 flex-col">
    <slot name="header" />

    <ATable
      class="simple-table"
      sticky :loading="loading"
      :data-source="dataSource" :columns="columns"
      :pagination="_pagination" :row-selection="_rowSelection"
      @change="handleChange"
    >
      <template #emptyText>
        <AEmpty />
      </template>

      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.key === 'index'">
          {{ index + 1 }}
        </template>
        <template v-else-if="column.key === 'slot'">
          <slot :name="column.dataIndex" :record="record" :column="column" :index="index" :text="text" />
        </template>
      </template>
    </ATable>
  </div>
</template>

<style scoped>
.simple-table {
  flex: 1;
  height: 0;

  &  :deep(.ant-spin-nested-loading) {
    height: 100%;

    &  :deep(.ant-spin-container) {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      & :deep(.ant-table) {
        flex: 1;
        overflow: hidden;

        &  :deep(.ant-table-container) {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;

          &  :deep(.ant-table-body) {
            flex: 1;
            overflow: auto !important;
          }
        }
      }
    }
  }
}
</style>
