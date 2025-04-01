<script setup lang="ts">
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
  <ATooltip :color="isDark ? 'black' : 'white'" placement="bottom">
    <AButton class="flex-center inline-flex" size="small" type="link">
      更多<span class="i-ant-design-down-outlined" />
    </AButton>

    <template #title>
      <div v-for="slot, index in moreSlotList" :key="index" class="more-operte-list">
        <component :is="slot" class="dark:text-white" />
      </div>
    </template>
  </ATooltip>
</template>

<style scoped>

</style>
