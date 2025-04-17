<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import { delMenuApi } from '@repo/api'
import EditDialog from './components/EditDialog.vue'

defineOptions({ name: 'SystemMenu' })

const searchForm = reactive({
  menuName: undefined,
  status: undefined,
})

const { sys_normal_disable } = useDict('sys_normal_disable')

const { data: tableData, loading, search } = useMenuTree()

const formItems = computed<FormItem[]>(() => [
  { type: 'input', label: '菜单名称', prop: 'menuName', span: 8 },
  { type: 'select', label: '状态', prop: 'status', options: sys_normal_disable.value.list, span: 8 },
])

const columns: Column[] = [
  { label: '菜单名称', prop: 'menuName', width: 200 },
  { label: '图标', prop: 'icon', width: 100 },
  { label: '排序', prop: 'orderNum', width: 100 },
  { label: '权限标识', prop: 'perms', width: 180 },
  { label: '组件路径', prop: 'component', width: 180 },
  { label: '状态', slot: 'status', minWidth: 100 },
  { label: '创建时间', prop: 'createTime', width: 200 },
  { label: '操作', slot: 'operation', width: 150, fixed: 'right' },
]

function handleSearch() {
  search({ ...searchForm })
}

function handleReset() {
  searchForm.menuName = undefined
  searchForm.status = undefined
  search({ ...searchForm })
}

const editDialogData = ref({
  visible: false,
  type: 'add' as 'add' | 'edit',
  id: undefined as number | undefined,
})

function handleEdit(id: number) {
  editDialogData.value = { visible: true, type: 'edit', id }
}

async function handleDelete(id: number) {
  await delMenuApi(id)
  ElMessage.success('删除成功')
  handleSearch()
}

function handleAdd(id?: number) {
  editDialogData.value = { visible: true, type: 'add', id }
}
</script>

<template>
  <ListPage
    v-model:form-model="searchForm"
    :form-items="formItems" :table-data="tableData"
    :columns="columns" row-key="menuId" :loading="loading" :pagination="false"
    :handle-search="handleSearch" :handle-reset="handleReset"
  >
    <template #table-header>
      <div>
        <ElButton type="primary" plain @click="handleAdd()"> 新增 </ElButton>
      </div>
    </template>

    <template #status="{ row }">
      <DictTag :options="sys_normal_disable.list" :value="row.status" />
    </template>
    <template #operation="{ row }">
      <ElButton type="primary" link @click="handleAdd(row.menuId)"> 新增 </ElButton>
      <ElButton type="primary" link @click="handleEdit(row.menuId)"> 编辑 </ElButton>
      <ElPopconfirm title="确定删除吗？" @confirm="handleDelete(row.menuId)">
        <template #reference>
          <ElButton type="danger" link> 删除 </ElButton>
        </template>
      </ElPopconfirm>
    </template>

    <EditDialog :id="editDialogData.id" v-model="editDialogData.visible" :type="editDialogData.type" :on-success="handleSearch" />
  </ListPage>
</template>
