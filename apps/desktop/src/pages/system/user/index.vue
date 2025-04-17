<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { ChangeEventParams } from '@/components/SimpleTable/type'
import type { User } from '@repo/api'
import type { TableProps } from 'ant-design-vue'
import { delUserApi, deptTreeSelectApi, getListUserApi } from '@repo/api'
import { usePagination, useRequest } from 'alova/client'
import { Pane, Splitpanes } from 'splitpanes'
import EditModal from './components/EditModal.vue'
import 'splitpanes/dist/splitpanes.css'

defineOptions({ name: 'SystemUser' })

const formItems: FormItem[] = [
  { name: 'userName', label: '用户名', span: 8, type: 'input', placeholder: '请输入用户名' },
  { name: 'phonenumber', label: '手机号', span: 8, type: 'input', placeholder: '请输入手机号' },
  { name: 'status', label: '状态', span: 8, type: 'select', options: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }], placeholder: '请选择状态' },
  { name: 'createTime', label: '创建时间', span: 8, type: 'rangedate', other: { placeholder: ['开始日期', '结束日期'] } },
]

const columns: TableProps['columns'] = [
  { title: '序号', key: 'index', width: 60 },
  { title: '用户账号', dataIndex: 'userName', width: 150 },
  { title: '用户姓名', dataIndex: 'nickName', width: 150 },
  { title: '手机号', dataIndex: 'phonenumber', width: 120 },
  { title: '状态', key: 'slot', dataIndex: 'status', width: 120 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', key: 'slot', dataIndex: 'operation', width: 200 },
]

const formModel = ref({
  userName: undefined,
  phonenumber: undefined,
  status: undefined,
  createTime: undefined,
  deptName: undefined,
})

const {
  loading,
  data,
  page,
  pageSize,
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

const treeData = ref<any[]>([])
const filterTreeData = useDebounceFn((e: Event) => {
  const searchValue = (e.target as HTMLInputElement).value

  if (!searchValue) {
    return treeData.value = []
  }

  const filterData: any[] = []
  filterTreeData(deptOptions.value)

  treeData.value = filterData

  function filterTreeData(data: any[]) {
    data.forEach((item) => {
      if (item.label.includes(searchValue)) {
        filterData.push({
          ...item,
          children: [],
        })
      }
      if (item.children) {
        filterTreeData(item.children)
      }
    })
  }
}, 300)

const checkedList = ref(false)

const editModalData = ref({
  visible: false,
  id: '',
})
function handleAdd() {
  editModalData.value = { visible: true, id: '' }
}

const tableSelect = ref<User[]>([])
async function handleDelete(id?: string | number) {
  try {
    if (id) {
      await delUserApi(id)
      useMessage().success('删除成功')
      reload()
    }
    else {
      await delUserApi(tableSelect.value.map(item => item.userId))
      useMessage().success('删除成功')
      reload()
    }
  }
  catch {
  }
}

function handleSelect(selectedRows: User[]) {
  tableSelect.value = selectedRows
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
  console.log('编辑', id)
  editModalData.value = { visible: true, id }
}

function handleTableChange({ pagination, filters, sorter }: ChangeEventParams) {
  console.log('handleTableChange', pagination, filters, sorter)
}

function handleStatusChange(record: User) {
  console.log('状态', record)
}
</script>

<template>
  <div class="h-full">
    <Splitpanes class="default-theme">
      <Pane size="16" class="pr-2">
        <AInput placeholder="请输入部门名称" allow-clear class="mb-2" @change="filterTreeData" />
        <ATree
          v-if="deptOptions.length > 0"
          :tree-data="(treeData.length ? treeData : deptOptions)"
          auto-expand-parent default-expand-all
          :field-names="{ key: 'id', title: 'label', children: 'children' }"
        />
      </Pane>
      <Pane size="84">
        <ListPage
          v-model:form-model="formModel"
          v-model:page-num="page"
          v-model:page-size="pageSize"
          :loading="loading"
          :total="total" :table-data="data" :columns="columns" row-key="userId" row-selection
          :form-items="formItems" :label-col="{ span: 5 }"
          :handle-search="reload" :handle-reset="reload"
          @table-change="handleTableChange"
          @select="handleSelect"
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
              <AButton size="small" type="link" @click="handleEdit(record.userId)"> 编辑 </AButton>
              <APopconfirm title="确认删除该用户吗?" @confirm="handleDelete(record.userId)">
                <AButton size="small" type="link" danger> 删除 </AButton>
              </APopconfirm>
              <AButton size="small" type="link" @click="handleResetPassword(record.userId)"> 重置密码 </AButton>
              <AButton size="small" type="link" @click="handleAssignRole(record.userId)"> 分配角色 </AButton>
            </MoreOperte>
          </template>
        </ListPage>
      </Pane>
    </Splitpanes>

    <EditModal v-model:visible="editModalData.visible" :user-id="editModalData.id" @success="reload()" />
  </div>
</template>
