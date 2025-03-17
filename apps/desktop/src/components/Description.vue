<script setup lang="ts">
withDefaults(
  defineProps<{
    colon: boolean
    border: boolean
    column: number
    list?: {
      label: string
      span?: number
      labelStyle?: string
      contentStyle?: string
      slot?: string
      field: string
      formatter?: (value: unknown, item: any, data: Record<string, unknown>) => string
    }[]
    data: Record<string, unknown>
    labelWidth: string
  }>(), {
    colon: false,
    border: true,
    column: 3,
    list: [] as any,
    labelWidth: '120px',
  },
)
</script>

<template>
  <ElDescriptions
    :column="column"
    :colon="colon"
    :border="border"
    :label-style="{ width: labelWidth }"
  >
    <ElDescriptionsItem
      v-for="item in list"
      :key="item.label"
      :span="item.span"
      :label="item.label"
      :label-style="item.labelStyle"
      :content-style="item.contentStyle"
    >
      <template v-if="item.slot">
        <slot :name="item.slot" :item="item" :data="data" />
      </template>
      <template v-else>
        {{
          item.formatter
            ? item.formatter(data[item.field], item, data)
            : data[item.field]
        }}
      </template>
    </ElDescriptionsItem>
  </ElDescriptions>
</template>
