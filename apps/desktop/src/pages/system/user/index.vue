<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import type { User } from '@repo/api'
import { delUserApi, deptTreeSelectApi, getListUserApi } from '@repo/api'
import { usePagination, useRequest } from 'alova/client'
import { Pane, Splitpanes } from 'splitpanes'
import EditModal from './components/EditModal.vue'
import 'splitpanes/dist/splitpanes.css'

defineOptions({ name: 'SystemUser' })

const formItems: FormItem[] = [
  { prop: 'userName', label: '用户名', span: 8, type: 'input', placeholder: '请输入用户名' },
  { prop: 'phonenumber', label: '手机号', span: 8, type: 'input', placeholder: '请输入手机号' },
  { prop: 'status', label: '状态', span: 8, type: 'select', options: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }], placeholder: '请选择状态' },
  { prop: 'createTime', label: '创建时间', span: 8, type: 'date', other: { startPlaceholder: '开始日期', endPlaceholder: '结束日期' } },
]

const columns: Column[] = [
  { label: '用户账号', prop: 'userName', minWidth: 150 },
  { label: '用户姓名', prop: 'nickName', minWidth: 150 },
  { label: '手机号', prop: 'phonenumber', minWidth: 120 },
  { label: '状态', slot: 'status', minWidth: 120 },
  { label: '创建时间', prop: 'createTime', minWidth: 180 },
  { label: '操作', slot: 'operation', width: 200 },
]

const formModel = ref({
  userName: '',
  phonenumber: '',
  status: '',
  createTime: '',
  deptName: '',
})

const {
  loading,
  data,
  page,
  pageSize,
  pageCount,
  total,
  refresh,
  reload,
} = usePagination((pageNum, pageSize) => getListUserApi({ ...formModel.value, pageNum, pageSize }), {
  initialData: { total: 0, rows: [] },
  total: response => response.total,
  data: response => response.rows,
})

const { data: deptOptions } = useRequest(deptTreeSelectApi, {
  initialData: [],
})

function filterNode(value: string, data: any) {
  if (!value)
    return true
  return data.label.includes(value)
}

function useTableOperate() {
  const checkedKeys = ref<Record<string, any>[]>([])

  const editModalData = ref({
    visible: false,
    id: '',
  })
  function handleAdd() {
    editModalData.value = { visible: true, id: '' }
  }

  function handleDelete(id?: string | number) {
    if (id) {
      delUserApi(id).then((res) => {
        ElMessage.success('删除成功')
        refresh(page.value)
      })
    }
    else {
      checkedKeys.value.forEach((key) => {
        delUserApi(key.userId).then((res) => {
          ElMessage.success('删除成功')
          reload()
        })
      })
    }
  }

  function handleImport() {
    console.log('导入')
    reload()
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
    console.log('编辑', id)
    editModalData.value = { visible: true, id }
  }

  function handleStatusChange(row: User) {
    console.log('状态', row)
  }

  return {
    checkedKeys,
    editModalData,
    handleAdd,
    handleDelete,
    handleImport,
    handleExport,
    handleResetPassword,
    handleAssignRole,
    handleEdit,
    handleStatusChange,
  }
}

const {
  checkedKeys,
  editModalData,
  handleAdd,
  handleDelete,
  handleImport,
  handleExport,
  handleResetPassword,
  handleAssignRole,
  handleEdit,
  handleStatusChange,
} = useTableOperate()
</script>

<template>
  <div class="h-full">
    <Splitpanes class="default-theme">
      <Pane size="16" class="pr-2">
        <ElInput v-model="formModel.deptName" placeholder="请输入部门名称" clearable prefix-icon="Search" style="margin-bottom: 20px" />
        <ElTree
          :data="deptOptions" :props="{ label: 'label', children: 'children' }" :expand-on-click-node="false"
          :filter-node-method="filterNode" node-key="id" highlight-current default-expand-all
          @node-click="reload"
        />
      </Pane>
      <Pane size="84">
        <ListPage
          v-model="formModel"
          v-model:page-num="page"
          v-model:page-size="pageSize"
          v-model:checked-keys="checkedKeys"
          :total="total"
          :loading="loading" :columns="columns" row-key="userId" selection :table-data="data"
          :form-items="formItems"
          :handle-search="refresh" :handle-reset="refresh"
        > 
          <template #table-header>
            <div class="mb-2 flex items-center gap-2">
              <ElButton v-hasPermi="['system:user:add']" type="primary" @click="handleAdd">
                新增
              </ElButton>
              <ElButton v-hasPermi="['system:user:remove']" type="danger" :disabled="checkedKeys.length === 0" @click="handleDelete()">
                删除
              </ElButton>
              <ElButton v-hasPermi="['system:user:import']" @click="handleImport">
                导入
              </ElButton>
              <ElButton v-hasPermi="['system:user:export']" @click="handleExport">
                导出
              </ElButton>
            </div>
          </template>

          <template #status="{ row }">
            <ElSwitch :checked="row.status" checked-value="0" unchecked-value="1" @change="handleStatusChange(row)" />
          </template>

          <template #operation="{ row }">
            <MoreOperte>
              <ElButton size="small" type="primary" link @click="handleEdit(row.userId)"> 编辑 </ElButton>
              <ElPopconfirm title="确认删除该用户吗?" @confirm="handleDelete(row.userId)">
                <template #reference>
                  <ElButton size="small" type="danger" link> 删除 </ElButton>
                </template>
              </ElPopconfirm>
              <ElButton size="small" type="primary" link @click="handleResetPassword(row.userId)"> 重置密码 </ElButton>
              <ElButton size="small" type="primary" link @click="handleAssignRole(row.userId)"> 分配角色 </ElButton>
            </MoreOperte>
          </template>
        </ListPage>
      </Pane>
    </Splitpanes>

    <EditModal v-model:visible="editModalData.visible" :user-id="editModalData.id" @success="refresh(pageCount)" />
  </div>
</template>
