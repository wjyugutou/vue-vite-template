<script setup lang="ts">
import type { Props } from './type'

defineOptions({ name: 'SimpleTable' })
defineProps<Props>()

defineSlots<{
  [k: string]: (row: any, index: number) => any
}>()

const checkedKeys = defineModel<Record<string, any>[]>('checkedKeys')

function handleSelectionChange(val: any) {
  checkedKeys.value = val
}
</script>

<template>
  <ElTable
    v-bind="$attrs"
    class="flex-1"
    :data="data"
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
        :label="item.label" :width="item.width" :sortable="item.sortable" :fixed="item.fixed"
        :show-overflow-tooltip="item.showOverflowTooltip"
      >
        <template v-if="item.slot" #default="scope">
          <slot :name="item.slot" :row="scope.row" :index="scope.$index" :column="scope.column" :text="scope.text" />
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
</template>

<style scoped>

</style>
