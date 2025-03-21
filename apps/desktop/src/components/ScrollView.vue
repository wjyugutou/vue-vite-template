<script lang='ts' setup>
const props = withDefaults(defineProps<{
  scrollY?: boolean
  scrollX?: boolean
  hideScrollbar?: boolean
  scrollStep?: number
}>(), {
  scrollY: true,
  scrollStep: 60,
})

const scrollView = useTemplateRef<HTMLDivElement>('scrollViewRef')

function handleWheel(e: WheelEvent) {
  if (!props.scrollX) {
    return
  }
  const delta = e.deltaY / 100

  scrollView.value?.scrollTo({
    left: scrollView.value?.scrollLeft + (delta * props.scrollStep),
    behavior: 'smooth',
  })
}
</script>

<template>
  <div
    ref="scrollViewRef"
    class="scroll-view size-full"
    :class="{
      'overflow-y-auto overflow-x-hidden': scrollY,
      'overflow-x-auto overflow-y-hidden': scrollX,
      'hide-scrollbar': hideScrollbar,
    }"
    @wheel="handleWheel"
  >
    <slot />
  </div>
</template>

<style scoped>
.scroll-view {

  &.hide-scrollbar {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
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
