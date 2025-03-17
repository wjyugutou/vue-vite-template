<script setup lang="ts">
interface Column {
  prop: string
  label: string
  width?: number | string
  minWidth?: number | string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  fixed?: boolean | 'left' | 'right'
  render?: (row: any, index: number) => any
  formatter?: (value: any, row: any, index: number) => string
}

interface Props {
  columns: Column[]
  tableData: any[]
  height?: string | number
  border?: boolean
  stripe?: boolean
  selection?: boolean
  index?: boolean
  pagination?: boolean
  total?: number
  currentPage?: number
  pageSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  // border: true,
  // stripe: true,
  selection: false,
  index: true,
  pagination: false,
  total: 0,
  currentPage: 1,
  pageSize: 10,
})

const emit = defineEmits<{
  (e: 'update:currentPage', val: number): void
  (e: 'update:pageSize', val: number): void
  (e: 'pageChange', val: { page: number, pageSize: number }): void
}>()

// 分页相关
const currentPage = ref(props.currentPage)
const pageSize = ref(props.pageSize)

function handleSizeChange(val: number) {
  pageSize.value = val
  emit('update:pageSize', val)
  emit('pageChange', { page: currentPage.value, pageSize: val })
}

function handleCurrentChange(val: number) {
  currentPage.value = val
  emit('update:currentPage', val)
  emit('pageChange', { page: val, pageSize: pageSize.value })
}

// 暴露方法
defineExpose({
  // 可以添加需要暴露的方法
})
</script>

<template>
  <div class="simple-table">
    <ElTable
      v-bind="$attrs"
      :data="tableData"
      :height="height"
      :border="border"
      :stripe="stripe"
    >
      <!-- 选择列 -->
      <ElTableColumn v-if="selection" type="selection" width="55" />

      <!-- 序号列 -->
      <ElTableColumn v-if="index" type="index" label="序号" width="60" />

      <!-- 动态列 -->
      <template v-for="item in columns" :key="item.prop">
        <ElTableColumn
          :prop="item.prop" :align="item.align || 'left'"
          :label="item.label" :width="item.width"
          :sortable="item.sortable" :fixed="item.fixed"
        >
          <template v-if="item.render || item.formatter" #default="scope">
            <!-- 自定义渲染函数 -->
            <template v-if="item.render">
              <component :is="item.render(scope.row, scope.$index)" />
            </template>
            <!-- 格式化函数 -->
            <template v-else-if="item.formatter">
              {{ item.formatter(scope.row?.[scope.column.property], scope.row, scope.$index) }}
            </template>
          </template>
        </ElTableColumn>
      </template>
    </ElTable>

    <!-- 分页器 -->
    <div v-if="pagination" class="pagination-container">
      <ElPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped>
.simple-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
}
</style>
