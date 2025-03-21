<script lang='ts' setup>
const props = withDefaults(defineProps<{
  scrollY?: boolean
  scrollX?: boolean
}>(), {
  scrollY: true,
})
</script>

<template>
  <div
    class="scroll-view h-full"
    :class="{
      'overflow-y-auto overflow-x-hidden': scrollY,
      'overflow-x-auto overflow-y-hidden': scrollX,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.scroll-view {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
      background-color: #0003;
      border-radius: 10px;
      transition: all .2s ease-in-out;
  }
  &::-webkit-scrollbar-track {
      border-radius: 10px;
  }
}
</style>
