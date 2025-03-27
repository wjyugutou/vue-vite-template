<script setup lang="ts">
import type { Props } from './type'

defineOptions({ name: 'SimpleTable' })
withDefaults(defineProps<Props>(), {
  // border: true,
  // stripe: true,
  selection: false,
  index: true,
  // height: '100%',
})

const emit = defineEmits<{
  (e: 'selectionChange', val: any): void
}>()

defineSlots<{
  [k: string]: (row: any, index: number) => any
}>()

// 暴露方法
defineExpose({
})

function handleSelectionChange(val: any) {
  emit('selectionChange', val)
}
</script>

<template>
  <div class="h-0 flex flex-1 flex-col">
    <slot name="header">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <slot name="header-left" />
        </div>

        <div>
          刷新
        </div>
      </div>
    </slot>

    <ElTable
      v-bind="$attrs"
      class="flex-1"
      :data="tableData"
      :height="height"
      :border="border"
      :stripe="stripe"
      @selection-change="handleSelectionChange"
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
          <template v-if="item.slot" #default="scope">
            <slot :name="item.slot" :row="scope.row" :index="scope.$index" />
          </template>
          <template v-else-if="item.render || item.formatter" #default="scope">
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

      <template #empty>
        <ElEmpty description="暂无数据" />
      </template>
    </ElTable>
  </div>
</template>

<style scoped>

</style>
