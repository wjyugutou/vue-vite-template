<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  max?: number
}>(), {
  max: 2,
})

const slots = defineSlots<{
  default: () => any
}>()

const isDark = useTheme()

const slotList = computed(() => {
  return slots.default().slice(0, props.max)
})

const moreSlotList = computed(() => {
  return slots.default().slice(props.max)
})
</script>

<template>
  <template v-for="slot, index in slotList" :key="index">
    <component :is="slot" v-if="index < max" />
  </template>
  <ElTooltip :effect="isDark ? 'dark' : 'light'">
    <ElButton link type="primary">
      更多<div class="i-carbon-chevron-down" />
    </ElButton>

    <template #content>
      <div v-for="slot, index in moreSlotList" :key="index" class="">
        <component :is="slot" />
      </div>
    </template>
  </ElTooltip>
</template>
