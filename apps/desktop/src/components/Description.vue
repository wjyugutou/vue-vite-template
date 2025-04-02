<script setup lang="ts">
import type { CSSProperties } from 'vue'

withDefaults(
  defineProps<{
    colon?: boolean
    border?: boolean
    column?: number
    labelWidth?: string
    data: Record<string, unknown>
    list: {
      label: string
      span?: number
      labelStyle?: CSSProperties
      contentStyle?: CSSProperties
      slot?: string
      field: string
      formatter?: (value: unknown, item: any, data: Record<string, unknown>) => string
    }[]
  }>(), {
    colon: false,
    border: true,
    column: 3,
  },
)
</script>

<template>
  <ADescriptions
    :column="column"
    :colon="colon"
    :border="border"
    :label-style="{ width: labelWidth }"
  >
    <ADescriptionsItem
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
    </ADescriptionsItem>
  </ADescriptions>
</template>
