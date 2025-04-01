<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { ChangeEventParams } from '@/components/SimpleTable/type'
import type { User } from '@repo/api'
import type { TableProps } from 'ant-design-vue'
import type { EventDataNode } from 'ant-design-vue/es/tree'
import { deptTreeSelectApi, getListUserApi } from '@repo/api'
import { useRequest } from 'alova/client'
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
  { name: 'userName', label: '用户名', span: 8, type: 'input', placeholder: '请输入用户名' },
  { name: 'phonenumber', label: '手机号', span: 8, type: 'input', placeholder: '请输入手机号' },
  { name: 'status', label: '状态', span: 8, type: 'select', options: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }], placeholder: '请选择状态' },
  {
    name: 'createTime', label: '创建时间', span: 8, type: 'date',
    other: { type: 'daterange', startPlaceholder: '开始日期', endPlaceholder: '结束日期' } },
]

const columns: TableProps['columns'] = [
  { title: '用户名', dataIndex: 'userName' },
  { title: '用户账号', dataIndex: 'nickName', width: 210 },
  { title: '手机号', dataIndex: 'phonenumber', width: 120 },
  { title: '状态', key: 'slot', dataIndex: 'status' },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', key: 'slot', dataIndex: 'operation', width: 200 },
]
handleSearch()

const deptName = ref()

const { data: deptOptions } = useRequest(deptTreeSelectApi, {
  initialData: [],
})

const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])

function filterNode(treeNode: EventDataNode) {
  console.log(treeNode)

  if (!deptName.value)
    return false
  return treeNode.label.includes(deptName.value)
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

function handleTableChange({ pagination, filters, sorter }: ChangeEventParams) {
  pageNum.value = pagination.current!
  pageSize.value = pagination.pageSize!
  search()
}

function handleStatusChange(record: User) {
  console.log('状态', record)
}
</script>

<template>
  <div class="h-full">
    <Splitpanes class="default-theme">
      <Pane size="16" class="pr-2">
        <AInputSearch v-model:value="deptName" placeholder="请输入部门名称" allow-clear class="mb-2" />
        <!-- <ATree
          ref="deptTreeRef" :data="deptOptions" :props="{ label: 'label', children: 'children' }" :expand-on-click-node="false"
          :filter-node-method="filterNode" node-key="id" highlight-current default-expand-all @node-click="handleNodeClick"
        /> -->
        <ATree
          v-model:expanded-keys="expandedKeys"
          v-model:selected-keys="selectedKeys"
          v-model:checked-keys="checkedKeys"
          :tree-data="(deptOptions as any)"
          auto-expand-parent
          :field-names="{ key: 'id', title: 'label', children: 'children' }"
          :filter-tree-node="filterNode"
        >
          <template #title="{ label }">
            <span v-if="label.includes(deptName) && deptName" style="color: #f50">
              {{ label }}
            </span>
            <span v-else>{{ label }}</span>
          </template>
        </ATree>
      </Pane>
      <Pane size="84">
        <ListPage
          v-model="searchForm"
          v-model:page-size="pageSize"
          v-model:page-num="pageNum"
          :loading="loading"
          :total="total" :table-data="data" :columns="columns" row-selection
          :form-items="formItems" :label-col="{ span: 5 }"
          :handle-search="handleSearch"
          :handle-reset="handleReset"
          @table-change="handleTableChange"
        >
          <template #table-header>
            <div class="mb-2 flex items-center gap-2">
              <AButton v-hasPermi="['system:user:add']" type="primary" @click="handleAdd">
                新增
              </AButton>
              <AButton v-hasPermi="['system:user:remove']" danger :disabled="checkedList" @click="handleDelete()">
                删除
              </AButton>
              <AButton v-hasPermi="['system:user:import']" @click="handleImport">
                导入
              </AButton>
              <AButton v-hasPermi="['system:user:export']" @click="handleExport">
                导出
              </AButton>
            </div>
          </template>

          <template #status="{ record }">
            <ASwitch :checked="record.status" checked-value="0" unchecked-value="1" @change="handleStatusChange(record)" />
          </template>

          <template #operation="{ record }">
            <MoreOperte>
              <AButton size="small" type="link" @click="handleEdit(record.id)"> 编辑 </AButton>
              <AButton size="small" type="link" @click="handleEdit(record.id)"> 删除 </AButton>
              <AButton size="small" type="link" @click="handleResetPassword(record.id)"> 重置密码 </AButton>
              <AButton size="small" type="link" @click="handleAssignRole(record.id)"> 分配角色 </AButton>
            </MoreOperte>
          </template>
        </ListPage>
      </Pane>
    </Splitpanes>
  </div>
</template>
