<script lang='ts' setup>
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import { dictListTypeApi } from '@repo/api'
import { usePagination } from 'alova/client'

defineOptions({ name: 'SystemDict' })

const { sys_normal_disable } = useDict('sys_normal_disable')
const formItems = computed<FormItem[]>(() => [
  { label: '字典名称', type: 'input', prop: 'dictName', span: 8, placeholder: '请输入字典名称' },
  { label: '字典类型', type: 'input', prop: 'dictType', span: 8, placeholder: '请输入字典类型' },
  { label: '状态', type: 'select', prop: 'status', span: 8, placeholder: '请选择状态', options: sys_normal_disable.value.list },
  { label: '创建时间', type: 'date', prop: 'dateRange', span: 8, other: { type: 'daterange', startPlaceholder: '开始日期', endPlaceholder: '结束日期' } },
])

const columns: Column[] = [
  { label: '字典名称', prop: 'dictName' },
  { label: '字典类型', slot: 'dictType' },
  { label: '状态', slot: 'status' },
  { label: '创建时间', prop: 'createTime' },
  { label: '操作', slot: 'operation' },
]

const formModel = ref({
  dictName: undefined,
  dictType: undefined,
  status: undefined,
  dateRange: undefined,
})

const { data: tableData, loading, page, pageSize, total, refresh, reload } = usePagination((pageNum, pageSize) => dictListTypeApi({
  pageNum, pageSize,
  ...formModel.value,
  params: {
    startDate: formModel.value.dateRange?.[0],
    endDate: formModel.value.dateRange?.[1],
  },
}), {
  initialData: { total: 0, rows: [] },
  total: res => res.total,
  data: res => res.rows,
})

function handleAdd() {
  console.log('handleAdd')
}

function handleEdit() {
  console.log('handleEdit')
}

function handleDelete() {
  console.log('handleDelete')
}

function handleExport() {
  console.log('handleExport')
}
</script>

<template>
  <ListPage
    v-model:form-model="formModel"
    v-model:page-num="page" v-model:page-size="pageSize"
    :total="total"
    :form-items="formItems" :loading="loading"
    :columns="columns" :table-data="tableData" row-key="dictId" index
    :handle-search="refresh" :handle-reset="reload"
  >
    <template #table-header>
      <div class="flex items-center gap-2">
        <ElButton v-hasPermi="['system:dict:add']" type="primary" @click="handleAdd"> 新增 </ElButton>
        <ElButton v-hasPermi="['system:dict:edit']" type="primary" @click="handleEdit"> 编辑 </ElButton>
        <ElButton v-hasPermi="['system:dict:remove']" danger @click="handleDelete"> 删除 </ElButton>
        <ElButton v-hasPermi="['system:dict:export']" @click="handleExport"> 导出 </ElButton>
      </div>
    </template>

    <template #dictType="{ row }">
      <RouterLink :to="`/system/dict-data/${row.dictId}`" class="text-primary">
        <span>{{ row.dictType }}</span>
      </RouterLink>
    </template>

    <template #status="{ row }">
      <DictTag :options="sys_normal_disable.list" :value="row.status" />
    </template>
  </ListPage>
</template>
