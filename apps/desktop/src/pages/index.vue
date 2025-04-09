<script setup lang="ts">
import { testApi } from '@repo/api'
import { useRequest } from 'alova/client'

const router = useRouter()

const name = ref('')

function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

function changeUsename() {
  // 生成随机名字
  let _name = ''
  const nameLength = Math.floor(Math.random() * 5) + 5
  for (let i = 0; i < nameLength; i++) {
    _name += String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }

  name.value = _name
}
</script>

<template>
  <div class="text-center">
    <div class="i-carbon-campsite inline-block cursor-pointer bg-gray-500/50 text-4xl" @click="changeUsename" />
    <p> Vitesse Lite </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="off"
      class="w-250px border border-(dark:gray-700 gray-600 rounded) bg-transparent p-(x-4 y-2) text-center outline-(none)"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>

    <ImageUpload />
  </div>
</template>
