<script setup lang="ts">
import type { User } from '@repo/api'
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import { changeUserStatusApi, delUserApi, deptTreeSelectApi, getListUserApi } from '@repo/api'
import { Pane, Splitpanes } from 'splitpanes'
import EditModal from './components/EditModal.vue'
import 'splitpanes/dist/splitpanes.css'

defineOptions({ name: 'SystemUser' })

const formItems: FormItem[] = [
  { prop: 'userName', label: '用户名', span: 8, type: 'input', placeholder: '请输入用户名' },
  { prop: 'phonenumber', label: '手机号', span: 8, type: 'input', placeholder: '请输入手机号' },
  { prop: 'status', label: '状态', span: 8, type: 'select', options: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }], placeholder: '请选择状态' },
  { prop: 'daterange', label: '创建时间', span: 8, type: 'date', other: { type: 'daterange', startPlaceholder: '开始日期', endPlaceholder: '结束日期' } },
]

const columns: Column[] = [
  { label: '用户账号', prop: 'userName', minWidth: 150 },
  { label: '用户姓名', prop: 'nickName', minWidth: 150 },
  { label: '手机号', prop: 'phonenumber', minWidth: 120 },
  { label: '状态', slot: 'status', minWidth: 120 },
  { label: '创建时间', prop: 'createTime', width: 180 },
  { label: '操作', slot: 'operation', width: 180, fixed: 'right' },
]

const formModel = ref({
  userName: undefined,
  phonenumber: undefined,
  status: undefined,
  daterange: undefined,
  deptName: undefined,
})

const {
  isLoading: loading,
  data,
  pageNum,
  pageSize,
  total,
  search,
  reload,
} = usePagination((pageNum, pageSize) => getListUserApi({
  ...formModel.value, pageNum, pageSize,
  params: {
    beginTime: formModel.value.daterange?.[0],
    endTime: formModel.value.daterange?.[1],
  },
}))

const { data: deptOptions } = useQuery({ queryFn: deptTreeSelectApi, queryKey: ['deptTreeSelect'] })

function filterNode(value: string, data: any) {
  if (!value)
    return true
  return data.label.includes(value)
}

const editModalData = ref({
  visible: false,
  id: '',
})
function handleAdd() {
  editModalData.value = { visible: true, id: '' }
}

const checkedKeys = ref<Record<string, any>[]>([])
function handleDelete(id?: string | number) {
  if (id) {
    delUserApi(id).then((res) => {
      ElMessage.success('删除成功')
      reload()
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

const importDialogVisible = ref(false)
function handleImport() {
  importDialogVisible.value = true
}

const { download, isLoading: exportLoading } = useDownload({
  url: '/system/user/export',
  fileName: '用户导出.xlsx',
})

function handleExport() {
  download(formModel.value)
}

function handleResetPassword(id: string) {
  console.log('重置密码')
}

function handleAssignRole(id: string) {
  console.log('分配角色')
}

function handleEdit(id: string) {
  editModalData.value = { visible: true, id }
}

function handleStatusChange(row: User) {
  return async () => {
    try {
      row.loading = true
      await changeUserStatusApi(row.userId, row.status)
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
          v-model:form-model="formModel"
          v-model:page-num="pageNum" v-model:page-size="pageSize"
          v-model:checked-keys="checkedKeys"
          :total="total"
          :form-items="formItems" :loading="loading"
          :columns="columns" row-key="userId" selection :table-data="data"
          :handle-search="search" :handle-reset="reload"
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
              <ElButton v-hasPermi="['system:user:export']" :loading="exportLoading" @click="handleExport">
                导出
              </ElButton>
            </div>
          </template>

          <template #status="{ row }">
            <ElSwitch v-model="row.status" active-value="0" inactive-value="1" :loading="row.loading" :before-change="handleStatusChange(row)" />
          </template>

          <template #operation="{ row }">
            <MoreOperte>
              <ElButton v-hasPermi="['system:user:edit']" size="small" type="primary" link @click="handleEdit(row.userId)"> 编辑 </ElButton>
              <ElPopconfirm title="确认删除该用户吗?" @confirm="handleDelete(row.userId)">
                <template #reference>
                  <ElButton v-hasPermi="['system:user:remove']" size="small" type="danger" link> 删除 </ElButton>
                </template>
              </ElPopconfirm>
              <ElButton v-hasPermi="['system:user:resetPwd']" size="small" type="primary" link @click="handleResetPassword(row.userId)"> 重置密码 </ElButton>
              <ElButton v-hasPermi="['system:user:edit']" size="small" type="primary" link @click="handleAssignRole(row.userId)"> 分配角色 </ElButton>
            </MoreOperte>
          </template>
        </ListPage>
      </Pane>
    </Splitpanes>

    <ImportDialog
      v-model="importDialogVisible"
      url="/system/user/importData" template-url="/system/user/importTemplate" template-name="用户导入模板.xlsx"
      @success="reload"
    />

    <EditModal v-model:visible="editModalData.visible" :user-id="editModalData.id" @success="reload()" />
  </div>
</template>
