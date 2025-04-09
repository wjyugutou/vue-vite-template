<script lang='ts' setup>
import type { DictReturn } from '@/hooks/useDict'

const props = defineProps<{
  options: DictReturn['list']
  value: string
  row?: any
}>()

const item = computed(() => {
  console.log(props.value, props.row)

  return props.options?.find(item => item.dictValue === props.value)
})
</script>

<template>
  <ElTag :type="item?.listClass">
    {{ item?.label }}
  </ElTag>
</template>
