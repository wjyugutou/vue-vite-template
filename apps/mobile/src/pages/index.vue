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
</script>

<template>
  <div class="text-center">
    <div class="i-carbon-campsite inline-block cursor-pointer text-4xl" @click="changeUsename" />
    <p> Vitesse Lite </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="userStore.name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      class="w-250px border border-(dark:gray-700 gray-600 rounded) bg-transparent p-(x-4 y-2) text-center outline-(none)"
      @keydown.enter="go"
    >

    <div class="flex justify-center">
      <button
        class="m-3 text-sm btn"
        :disabled="!userStore.name"
        @click="go"
      >
        Go
      </button>
      <RouterLink to="/list" class="m-3 text-sm btn">
        List
      </RouterLink>
    </div>
  </div>
</template>
