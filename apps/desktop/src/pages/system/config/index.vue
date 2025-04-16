<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import { listConfigApi } from '@repo/api'
import { usePagination } from 'alova/client'

defineOptions({ name: 'SystemConfig' })

const { sys_yes_no } = useDict('sys_yes_no')

const formItems = computed<FormItem[]>(() => [
  { label: '参数名称', type: 'input', prop: 'configName', span: 6, placeholder: '请输入参数名称' },
  { label: '参数键名', type: 'input', prop: 'configKey', span: 6, placeholder: '请输入参数键名' },
  { label: '参数键值', type: 'input', prop: 'configValue', span: 6, placeholder: '请输入参数键值' },
  { label: '系统内置', type: 'select', prop: 'configType', span: 6, placeholder: '请选择系统内置', options: sys_yes_no.value.list },
  { label: '创建时间', type: 'date', prop: 'createTime', span: 6, other: { type: 'daterange', startPlaceholder: '开始日期', endPlaceholder: '结束日期' } },
])
const columns = ref<Column[]>([
  { label: '参数主键', prop: 'configId', width: 100 },
  { label: '参数名称', prop: 'configName', width: 200 },
  { label: '参数键名', prop: 'configKey', width: 200 },
  { label: '参数键值', prop: 'configValue', width: 220, showOverflowTooltip: true },
  { label: '系统内置', slot: 'configType' },
  { label: '备注', prop: 'remark', width: 220, showOverflowTooltip: true },
  { label: '创建时间', prop: 'createTime', width: 180 },
  { label: '操作', slot: 'operation', width: 120 },
])

const formModel = ref({
  configName: undefined,
  configKey: undefined,
  configValue: undefined,
  configType: undefined,
  createTime: undefined,
})

const {
  page,
  pageSize,
  data,
  total,
  loading,
  refresh,
} = usePagination((pageNum, pageSize) => listConfigApi({
  ...formModel.value, pageNum, pageSize,
  params: {
    beginTime: formModel.value.createTime?.[0],
    endTime: formModel.value.createTime?.[1],
  },
}), {
  initialData: { rows: [], total: 0 },
  total: res => res.total,
  data: res => res.rows,
})
const checkedKeys = ref<Record<string, any>[]>([])

function handleEdit(id: number) {
  console.log(id)
}

function handleDelete(id?: number) {
  console.log(id)
}

function handleAdd() {
  console.log('新增')
}

function handleExport() {
  console.log('导出')
}

function handleRefreshCache() {
  console.log('刷新缓存')
}
</script>

<template>
  <ListPage
    v-model:form-model="formModel"
    v-model:page-num="page" v-model:page-size="pageSize"
    v-model:checked-keys="checkedKeys"
    :total="total"
    :form-items="formItems" :loading="loading"
    :columns="columns" :table-data="data" row-key="configId" selection
    :handle-search="refresh" :handle-reset="refresh"
  >
    <template #table-header>
      <div>
        <ElButton v-hasPermi="['system:config:add']" type="primary" plain @click="handleAdd">          新增        </ElButton>
        <ElButton
          v-hasPermi="['system:config:remove']" type="danger" plain :disabled="checkedKeys.length === 0"
          @click="handleDelete()"
        >
          删除
        </ElButton>
        <ElButton v-hasPermi="['system:config:export']" plain @click="handleExport">          导出        </ElButton>
        <ElButton v-hasPermi="['system:config:remove']" type="danger" plain @click="handleRefreshCache">刷新缓存</ElButton>
      </div>
    </template>

    <template #configType="{ row }">
      <DictTag :options="sys_yes_no.list" :value="row.configType" />
    </template>
    <template #operation="{ row }">
      <ElButton type="primary" link @click="handleEdit(row.configId)"> 编辑 </ElButton>
      <ElPopconfirm title="确定删除吗？" @confirm="handleDelete(row.configId)">
        <template #reference>
          <ElButton type="danger" link> 删除 </ElButton>
        </template>
      </ElPopconfirm>
    </template>
  </ListPage>
</template>
