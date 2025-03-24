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

// 暴露方法
defineExpose({
  // 可以添加需要暴露的方法
})
</script>

<template>
  <ElTable
    v-bind="$attrs"
    :data="tableData"
    :height="height"
    :border="border"
    :stripe="stripe"
    class="flex-1"
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
</template>

<style scoped>

</style>
