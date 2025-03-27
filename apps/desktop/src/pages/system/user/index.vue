<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import { Delete, Download, Plus, Upload } from '@element-plus/icons-vue'
import { useRequest } from 'alova/client'
import { deptTreeSelectApi, getListUserApi } from 'api'
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

defineOptions({ name: 'SystemUser' })

const { pageSize, pageNum, total, data, loading, searchForm, search, handleSearch, handleReset } = useListSearch(getListUserApi, {
  username: '',
  phone: '',
  status: '',
  createTime: [],
})

const formItems: FormItem[] = [
  { prop: 'username', label: '用户名', span: 8, type: 'input', placeholder: '请输入用户名' },
  { prop: 'phone', label: '手机号', span: 8, type: 'input', placeholder: '请输入手机号' },
  { prop: 'status', label: '状态', span: 8, type: 'select', options: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }], placeholder: '请选择状态' },
  {
    prop: 'createTime', label: '创建时间', span: 8, type: 'date',
    other: { type: 'daterange', startPlaceholder: '开始日期', endPlaceholder: '结束日期' } },
]

const columns: Column[] = [
  { prop: 'username', label: '用户名' },
  { prop: 'email', label: '邮箱', width: 210 },
  { prop: 'phone', label: '手机号', width: 120 },
  { prop: 'status', label: '状态', width: 80, formatter: (row: any) => row.status === '1' ? '启用' : '禁用' },
  { prop: 'createTime', label: '创建时间' },
  { slot: 'operation', label: '操作', width: 180 },
]
handleSearch()

const deptName = ref()
const deptTreeRef = ref()

const { data: deptOptions } = useRequest(deptTreeSelectApi, {
  initialData: [],
})

function filterNode(value: string, data: any) {
  if (!value)
    return true
  return data.label.includes(value)
}

/** 节点单击事件 */
function handleNodeClick(data: any) {
  searchForm.value.deptId = data.id
  search()
}

const checkedList = ref(false)

function handleAdd() {
  console.log('新增')
}

function handleDelete(id?: string) {
  console.log('删除')
}

function handleImport() {
  console.log('导入')
}

function handleExport() {
  console.log('导出')
}

function handleResetPassword(id: string) {
  console.log('重置密码')
}

function handleAssignRole(id: string) {
  console.log('分配角色')
}

function handleEdit(id: string) {
  console.log('编辑')
}

function handleSelectionChange(selection: any) {
  checkedList.value = !selection.length
}
</script>

<template>
  <div class="h-full">
    <Splitpanes class="default-theme">
      <Pane size="16">
        <ElInput v-model="deptName" placeholder="请输入部门名称" clearable prefix-icon="Search" style="margin-bottom: 20px" />
        <ElTree
          ref="deptTreeRef" :data="deptOptions" :props="{ label: 'label', children: 'children' }" :expand-on-click-node="false"
          :filter-node-method="filterNode" node-key="id" highlight-current default-expand-all @node-click="handleNodeClick"
        />
      </Pane>
      <Pane size="84">
        <ListPage
          v-model="searchForm"
          v-model:page-size="pageSize"
          v-model:page-num="pageNum"
          :loading="loading"
          :total="total" :table-data="data" :columns="columns" selection
          :form-items="formItems" :label-width="70"
          :handle-search="handleSearch"
          :handle-reset="handleReset"
          @selection-change="handleSelectionChange"
        >
          <template #table-header>
            <div class="mb-2">
              <ElButton v-hasPermi="['system:user:add']" type="primary" plain :icon="Plus" @click="handleAdd">新增</ElButton>
              <ElButton v-hasPermi="['system:user:remove']" type="danger" plain :icon="Delete" :disabled="checkedList" @click="handleDelete()">删除</ElButton>
              <ElButton v-hasPermi="['system:user:import']" type="info" plain :icon="Upload" @click="handleImport">导入</ElButton>
              <ElButton v-hasPermi="['system:user:export']" type="warning" plain :icon="Download" @click="handleExport">导出</ElButton>
            </div>
          </template>

          <template #operation="{ row }">
            <MoreOperte>
              <ElButton link type="primary" @click="handleEdit(row.id)"> 编辑 </ElButton>
              <ElButton link type="primary" @click="handleEdit(row.id)"> 删除 </ElButton>
              <ElButton link type="primary" @click="handleEdit(row.id)"> 重置密码 </ElButton>
              <ElButton link type="primary" @click="handleEdit(row.id)"> 分配角色 </ElButton>
            </MoreOperte>
          </template>
        </ListPage>
      </Pane>
    </Splitpanes>
  </div>
</template>
