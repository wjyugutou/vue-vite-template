<script lang='ts' setup>
import type { DictData } from '@repo/api'
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import { dictListDataApi } from '@repo/api'
import { useDict } from '@repo/hooks'

defineOptions({ name: 'SystemDictData' })

const { sys_normal_disable } = useDict('sys_normal_disable')
const formItems = computed<FormItem[]>(() => [
  { label: '字典名称', type: 'input', prop: 'dictName', span: 8, placeholder: '请输入字典名称' },
  { label: '字典标签', type: 'input', prop: 'dictLabel', span: 8, placeholder: '请输入字典标签' },
  { label: '状态', type: 'select', prop: 'status', span: 8, placeholder: '请选择状态', options: sys_normal_disable.value.list },
])

const columns: Column[] = [
  { label: '字典编码', prop: 'dictCode' },
  { label: '字典标签', prop: 'dictLabel', width: 150 },
  { label: '字典键值', prop: 'dictValue', width: 150 },
  { label: '字典排序', prop: 'dictSort', width: 150 },
  { label: '状态', slot: 'status' },
  { label: '备注', prop: 'remark', width: 200, showOverflowTooltip: true },
  { label: '创建时间', prop: 'createTime', width: 180 },
  { label: '操作', slot: 'operation', width: 180, fixed: 'right' },
]

const formModel = ref({
  dictName: undefined,
  dictType: undefined,
  status: undefined,
  dateRange: undefined,
})

const { data: tableData, isLoading, pageNum, pageSize, total, search, reload } = usePagination(dictListDataApi, formModel.value)

function handleAdd() {
  console.log('handleAdd')
}

function handleEdit() {
  console.log('handleEdit')
}

const checkedKeys = ref<DictData[]>([])
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
    v-model:page-num="pageNum" v-model:page-size="pageSize" v-model:checked-keys="checkedKeys"
    :total="total"
    :form-items="formItems" :loading="isLoading"
    :columns="columns" :table-data="tableData" row-key="dictId" index selection
    :handle-search="search" :handle-reset="reload"
  >
    <template #table-header>
      <div class="flex items-center gap-2">
        <ElButton v-hasPermi="['system:dict:add']" type="primary" @click="handleAdd"> 新增 </ElButton>
        <ElButton v-hasPermi="['system:dict:remove']" type="danger" :disabled="!checkedKeys.length" @click="handleDelete"> 删除 </ElButton>
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

    <template #operation="{ row }">
      <ElButton type="primary" link> 编辑 </ElButton>
      <ElButton type="danger" link> 删除 </ElButton>
      <ElButton type="primary" link> 导出 </ElButton>
    </template>
  </ListPage>
</template>
