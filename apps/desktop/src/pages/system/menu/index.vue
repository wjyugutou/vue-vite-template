<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import { getListMenuApi } from '@repo/api'
import { generatTreeNode } from '@repo/utils'
import { useRequest } from 'alova/client'

defineOptions({ name: 'SystemMenu' })

const searchForm = reactive({
  menuName: undefined,
  status: undefined,
})

const { sys_normal_disable } = useDict('sys_normal_disable')

const { data: menuList, loading, send: search } = useRequest(getListMenuApi, {
  initialData: [],
})

const tableData = computed(() => generatTreeNode(menuList.value, 'menuId'))

const formItems: FormItem[] = [
  { type: 'input', label: '菜单名称', prop: 'menuName', span: 8 },
  { type: 'select', label: '状态', prop: 'status', options: sys_normal_disable.value.list, span: 8 },
]
const columns: Column[] = [
  { label: '菜单名称', prop: 'menuName', width: 250 },
  { label: '图标', prop: 'icon', width: 100 },
  { label: '排序', prop: 'orderNum', width: 100 },
  { label: '权限标识', prop: 'perms', width: 200 },
  { label: '组件路径', prop: 'component', width: 200 },
  { label: '状态', slot: 'status', width: 150 },
  { label: '创建时间', prop: 'createTime', width: 180 },
  { label: '操作', slot: 'operation', width: 150 },
]

function handleSearch() {
  search({ ...searchForm })
}

function handleReset() {
  searchForm.menuName = undefined
  searchForm.status = undefined
  search({ ...searchForm })
}

function handleEdit(row: any) {
  console.log(row)
}
</script>

<template>
  <ListPage
    v-model="searchForm"
    :form-items="formItems" :table-data="tableData"
    :columns="columns" row-key="menuId" :loading="loading" :pagination="false"
    :handle-search="handleSearch" :handle-reset="handleReset"
  >
    <template #status="{ row }">
      <DictTag :options="sys_normal_disable.list" :value="row.status" :row="row" />
    </template>
    <template #operation="{ row }">
      <ElButton type="primary" size="small" @click="handleEdit(row)"> 编辑 </ElButton>
    </template>
  </ListPage>
</template>
