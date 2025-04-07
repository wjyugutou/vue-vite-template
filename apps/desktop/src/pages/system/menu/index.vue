<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { TableProps } from 'ant-design-vue'
import { getListMenuApi } from '@repo/api'
import { generatTreeNode } from '@repo/utils'
import { useRequest } from 'alova/client'

defineOptions({ name: 'SystemMenu' })

const searchForm = reactive({
  menuName: undefined,
  status: undefined,
})

const pagination = reactive({
  pageSize: 10,
  pageNum: 1,
  total: 0,
})

const { sys_normal_disable } = useDict('sys_normal_disable')

const { data, loading, send: search } = useRequest(getListMenuApi, {
  initialData: [],
})

const tableData = computed(() => generatTreeNode(data.value, 'menuId'))

watchEffect(() => {
  console.log(tableData.value)
})

const formItems: FormItem[] = [
  { type: 'input', label: '菜单名称', name: 'menuName', span: 8 },
  { type: 'select', label: '状态', name: 'status', options: sys_normal_disable.value.list, span: 8 },
]
const columns: TableProps['columns'] = [
  { title: '菜单名称', dataIndex: 'menuName', width: 250 },
  { title: '图标', dataIndex: 'icon', width: 100 },
  { title: '排序', dataIndex: 'orderNum', width: 100 },
  { title: '权限标识', dataIndex: 'perms', width: 200 },
  { title: '组件路径', dataIndex: 'component', width: 200 },
  { title: '状态', dataIndex: 'status', width: 150 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', dataIndex: 'operation', width: 150, key: 'operation' },
]

function handleSearch() {
  pagination.pageNum = 1
  search({ ...searchForm, pageNum: pagination.pageNum, pageSize: pagination.pageSize })
}

function handleReset() {
  searchForm.menuName = undefined
  searchForm.status = undefined
  pagination.pageNum = 1
  pagination.pageSize = 10
  pagination.total = 0
  search({ ...searchForm, pageNum: pagination.pageNum, pageSize: pagination.pageSize })
}

function handleDelete(record: any) {
  console.log(record)
}
</script>

<template>
  <ListPage
    v-model="searchForm"
    :form-items="formItems" :table-data="tableData"
    :columns="columns" row-key="menuId" :loading="loading" :pagination="false"
    :handle-search="handleSearch" :handle-reset="handleReset"
  >
    <template #operation="{ record }">
      <APopconfirm title="确认删除该用户吗?" @confirm="handleDelete(record.userId)">
        <AButton size="small" type="link" danger> 删除 </AButton>
      </APopconfirm>
    </template>
  </ListPage>
</template>
