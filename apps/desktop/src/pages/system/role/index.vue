<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import type { User } from '@repo/api'
import { changeRoleStatusApi, delRoleApi, listRoleApi } from '@repo/api'
import { usePagination } from 'alova/client'

defineOptions({ name: 'SystemRole' })

const formItems: FormItem[] = [
  { prop: 'roleName', label: '角色名称', span: 8, type: 'input', placeholder: '请输入角色名称' },
  { prop: 'roleKey', label: '权限字符', span: 8, type: 'input', placeholder: '请输入角色权限字符' },
  { prop: 'status', label: '状态', span: 8, type: 'select', options: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }], placeholder: '请选择状态' },
  { prop: 'daterange', label: '创建时间', span: 8, type: 'date', other: { type: 'daterange', startPlaceholder: '开始日期', endPlaceholder: '结束日期' } },
]

const columns: Column[] = [
  { label: '角色名称', prop: 'roleName', minWidth: 150 },
  { label: '权限字符', prop: 'roleKey', minWidth: 150 },
  { label: '显示顺序', prop: 'roleSort', width: 100 },
  { label: '状态', slot: 'status', minWidth: 120 },
  { label: '创建时间', prop: 'createTime', width: 180 },
  { label: '操作', slot: 'operation', width: 180, fixed: 'right' },
]

const formModel = ref({
  roleName: undefined,
  roleKey: undefined,
  status: undefined,
  daterange: undefined,
})

const {
  loading,
  data,
  page,
  pageSize,
  total,
  refresh,
  reload,
} = usePagination((pageNum, pageSize) => listRoleApi({
  ...formModel.value, pageNum, pageSize,
  params: {
    beginTime: formModel.value.daterange?.[0],
    endTime: formModel.value.daterange?.[1],
  },
}), {
  initialData: { total: 0, rows: [] },
  total: response => response.total,
  data: response => response.rows,
})

const editModalData = ref({
  visible: false,
  id: '',
})
function handleAdd() {
  editModalData.value = { visible: true, id: '' }
}

// 删除
const checkedKeys = ref<Record<string, any>[]>([])
function handleDelete(id?: string | number) {
  if (id) {
    delRoleApi(id).then((res) => {
      ElMessage.success('删除成功')
      reload()
    })
  }
  else {
    checkedKeys.value.forEach((key) => {
      delRoleApi(key.roleId).then((res) => {
        ElMessage.success('删除成功')
        reload()
      })
    })
  }
}

// 导入
const importDialogVisible = ref(false)
function handleImport() {
  importDialogVisible.value = true
}

// 导出
const { download, loading: exportLoading } = useDownload('/system/role/export', '用户导出.xlsx')
function handleExport() {
  download(formModel.value)
}

function handleEdit(id: string) {
  editModalData.value = { visible: true, id }
}

function handleStatusChange(row: User) {
  return async () => {
    try {
      row.loading = true
      await changeRoleStatusApi(row.roleId, row.status)
      ElMessage.success('状态更新成功')
      await reload()
      return true
    }
    catch (error) {
      ElMessage.error('状态更新失败')
      return false
    }
    finally {
      row.loading = false
    }
  }
}

function handleDataPermission(id: string) {
  console.log('数据权限')
}

function handleAssignUser(id: string) {
  console.log('分配用户')
}
</script>

<template>
  <ListPage
    v-model:form-model="formModel"
    v-model:page-num="page" v-model:page-size="pageSize"
    v-model:checked-keys="checkedKeys"
    :total="total"
    :form-items="formItems" :loading="loading"
    :columns="columns" row-key="roleId" selection index :table-data="data"
    :handle-search="refresh" :handle-reset="reload"
  >
    <template #table-header>
      <div class="mb-2 flex items-center gap-2">
        <ElButton v-hasPermi="['system:role:add']" type="primary" @click="handleAdd">
          新增
        </ElButton>
        <ElButton v-hasPermi="['system:role:remove']" type="danger" :disabled="checkedKeys.length === 0" @click="handleDelete()">
          删除
        </ElButton>
        <ElButton v-hasPermi="['system:role:import']" @click="handleImport">
          导入
        </ElButton>
        <ElButton v-hasPermi="['system:role:export']" :loading="exportLoading" @click="handleExport">
          导出
        </ElButton>
      </div>
    </template>

    <template #status="{ row }">
      <ElSwitch v-model="row.status" active-value="0" inactive-value="1" :loading="row.loading" :before-change="handleStatusChange(row)" />
    </template>

    <template #operation="{ row }">
      <MoreOperte>
        <ElButton v-hasPermi="['system:role:edit']" size="small" type="primary" link @click="handleEdit(row.userId)"> 编辑 </ElButton>
        <ElPopconfirm title="确认删除该用户吗?" @confirm="handleDelete(row.userId)">
          <template #reference>
            <ElButton v-hasPermi="['system:role:remove']" size="small" type="danger" link> 删除 </ElButton>
          </template>
        </ElPopconfirm>
        <ElButton v-hasPermi="['system:role:resetPwd']" size="small" type="primary" link @click="handleDataPermission(row.userId)"> 数据权限 </ElButton>
        <ElButton v-hasPermi="['system:role:edit']" size="small" type="primary" link @click="handleAssignUser(row.userId)"> 分配用户 </ElButton>
      </MoreOperte>
    </template>

    <ImportDialog
      v-model="importDialogVisible"
      url="/system/role/importData" template-url="/system/role/importTemplate" template-name="角色导入模板.xlsx"
      @success="reload"
    />
  </ListPage>
</template>
