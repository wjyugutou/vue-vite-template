<script setup lang="ts">
import type { Props } from './type'

defineOptions({ name: 'ListPage' })

const props = defineProps<Props>()

const formModel = defineModel<Record<string, any>>({ required: true })

const _formItems = computed(() => {
  return [...props.formItems, {
    span: 8,
    slot: 'search',
  }]
})

const pageNum = defineModel<number>('pageNum')
const pageSize = defineModel<number>('pageSize')
const checkedKeys = defineModel<Record<string, any>[]>('checkedKeys')

function handlePageChange(currentPage: number, newPageSize: number) {
  pageNum.value = currentPage
  pageSize.value = newPageSize
}

const tableSlots = computed(() => {
  return props.columns!.filter(item => item.slot).map(item => item.slot)
})

function handleSearch() {
  props.handleSearch?.()
}

function handleReset() {
  formModel.value = {}
  props.handleReset?.()
}
</script>

<template>
  <div v-loading="!!loading" class="list-search">
    <ElCard>
      <SimpleForm
        v-model="formModel"
        :form-items="_formItems"
        label-width="80px"
        :handle-search="handleSearch"
        :handle-reset="handleReset"
      >
        <template #search>
          <ElButton type="primary" @click="handleSearch"> 搜索 </ElButton>
          <ElButton @click="handleReset"> 重置 </ElButton>
        </template>
      </SimpleForm>
    </ElCard>
    <ElCard class="flex flex-1 flex-col gap-2">
      <slot name="table-header" />

      <SimpleTable
        v-model:checked-keys="checkedKeys"
        :loading="loading"
        :columns="columns" :data="tableData" :row-key="rowKey" :index="index" :selection="selection"
      >
        <template v-for="slot in tableSlots" #[slot]="{ row, index, column, text }">
          <slot :name="slot" :row="row" :column="column" :index="index" :text="text" />
        </template>
      </SimpleTable>

      <ElPagination
        v-if="pageNum"
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        class="justify-end"
        :total="total" :page-sizes="[10, 20, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        @change="handlePageChange"
      />
    </ElCard>

    <slot />
  </div>
</template>

<style scoped>
.list-search {
  --at-apply: flex flex-col gap-2 h-full flex-1;

  :deep(.el-card__body) {
    --at-apply: flex flex-1 flex-col gap-2 h-full;
  }
}
</style>
