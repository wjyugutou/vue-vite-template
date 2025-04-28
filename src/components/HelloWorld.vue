<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class=" flex max-w-sm items-center mx-auto gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
    <div>
      <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
      <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
    </div>
  </div>
</template>

<style scoped>
</style>
