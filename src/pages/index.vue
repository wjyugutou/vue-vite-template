<script setup lang="ts">
const userStore = useUserStore()

const router = useRouter()

function go() {
  if (userStore.name)
    router.push(`/hi/${encodeURIComponent(userStore.name)}`)
}

function changeUsename() {
  // 生成随机名字
  let _name = ''
  const nameLength = Math.floor(Math.random() * 5) + 5
  for (let i = 0; i < nameLength; i++) {
    _name += String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }
  userStore.name = _name
}

const loading = ref(true)
</script>

<template>
  <div>
    <div class="i-carbon-campsite inline-block cursor-pointer bg-gray-500/50 text-4xl" @click="changeUsename" />
    <p> Vitesse Lite </p>
    <p>
      <em class="text-sm op75">Opinionated Vite Starter Template</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="userStore.name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      class="border-rounded-gray-200 w-250px border border-(dark:gray-700) bg-transparent p-(x-4 y-2) text-center outline-(none)"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!userStore.name"
        @click="go"
      >
        Go
      </button>
    </div>

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!userStore.name"
        @click="loading = !loading"
      >
        loading
      </button>
    </div>

    <div class="h-50 overflow-auto">
      <div v-loading="loading" class="h-50 w-50 bg-red-400" />
      <div class="h-100" />
    </div>
  </div>
</template>
