<script lang='ts' setup>
import type { DictReturn } from '@repo/hooks'

const props = defineProps<{
  options: DictReturn['list']
  value?: string
}>()

const item = computed(() => {
  return props.options?.find(item => item.dictValue === props.value)
})
</script>

<template>
  <ElTag :type="item?.listClass">
    {{ item?.label }}
  </ElTag>
</template>
