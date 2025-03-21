<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'
import { getListUserApi } from 'api'

defineOptions({ name: 'SystemUser' })

const { pageSize, pageNum, total, data, loading, searchForm, handleSearch, handleReset } = useListSearch(
  (query) => {
    console.log(query)

    return getListUserApi(query)
  }, {
    username: '',
    phone: '',
    status: '',
    createTime: [],
  })

const formItems: FormItem[] = [
  { prop: 'username', label: '用户名', span: 8, type: 'input' },
  { prop: 'phone', label: '手机号', span: 8, type: 'input' },
  { prop: 'status', label: '状态', span: 8, type: 'select', options: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }] },
  { prop: 'createTime', label: '创建时间', span: 8, type: 'date', other: { type: 'daterange' } },
]

const columns: Column[] = [
  { prop: 'username', label: '用户名' },
  { prop: 'email', label: '邮箱' },
  { prop: 'phone', label: '手机号' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间' },
  { slot: 'operation', label: '操作' },
]

function handleAdd() {
  console.log('新增')
}
</script>

<template>
  <div class="h-full flex gap-3">
    <div class="w-200px flex-shrink-0 border-r border-gray-200">
      sad
    </div>
    <ListPage
      v-model="searchForm"
      v-model:page-size="pageSize"
      v-model:page-num="pageNum"
      class="w-0 flex-1" :loading="loading"
      :total="total" :table-data="data" :columns="columns"
      :form-items="formItems" :label-width="100"
      :handle-search="handleSearch"
      :handle-reset="handleReset"
    >
      <template #operation>
        <ElButton type="primary" @click="handleAdd"> 新增 </ElButton>
      </template>
    </ListPage>
  </div>
</template>
