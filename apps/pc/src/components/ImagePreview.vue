<script setup lang="ts">
import { isVideoFile } from 'utils'

const props = defineProps<{
  urlList: string[]
}>()
const visible = defineModel<boolean>('visible', { required: true })
const url = defineModel<string>('url', { required: true })
const index = computed(() => props.urlList.indexOf(url.value))
function handleClose() {
  visible.value = false
}

function handlePrev() {
  if (index.value > 0) {
    url.value = props.urlList[index.value - 1]
  }
}

function handleNext() {
  if (index.value < props.urlList.length - 1) {
    url.value = props.urlList[index.value + 1]
  }
}
</script>

<template>
  <Transition name="el-fade-in-linear">
    <Teleport v-if="visible" to="body">
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <button class="absolute right-12vw top-10 z-10 text-12 hover:text-primary" @click="handleClose">
          <div class="i-carbon-close-outline" />
        </button>
        <button class="absolute left-18vw top-50% z-10 text-12 -translate-y-1/2 hover:text-primary" @click="handlePrev">
          <div class="i-carbon-chevron-left" />
        </button>

        <button class="absolute right-18vw top-50% z-10 text-12 -translate-y-1/2 hover:text-primary" @click="handleNext">
          <div class="i-carbon-chevron-right" />
        </button>
        <template v-for="item in urlList" :key="item">
          <video v-if="isVideoFile(item)" class="pointer-events-auto size-150" :src="item" controls :class="{ 'important-hidden': url !== item }" />
          <ElImage v-else class="pointer-events-auto size-150" :src="item" fit="cover" :class="{ 'important-hidden': url !== item }" />
        </template>
        <div class="absolute bottom-10 left-50% z-10 text-6 text-white -translate-x-1/2">
          {{ index + 1 }}/{{ urlList.length }}
        </div>
      </div>
    </Teleport>
  </Transition>
</template>
