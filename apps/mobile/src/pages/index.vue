<route lang="yaml">
meta:
  hideLeftArrow: true
  title: 'Home'
</route>

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
    <div class="i-carbon-campsite text- inline-block cursor-pointer text-2xl" @click="changeUsename" />
    <p> Vitesse Lite </p>

    <div class="h-46.83 w-74 bg-pink-500">
      <button class="h-5.5 w-17 rounded-1 bg-red-500">红色预警</button>
    </div>

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

    <div class="flex flex-col justify-center">
      <button
        class="m-3 p-1 text-sm btn"
        :disabled="!userStore.name"
        @click="go"
      >
        Go
      </button>
      <RouterLink to="/example/list" class="m-3 text-sm btn">
        List
      </RouterLink>

      <RouterLink to="/example/simpleform" class="m-3 text-sm btn">
        SimpleForm
      </RouterLink>
      <RouterLink to="/example/simpleform" class="m-3 text-sm btn">
        SimpleForm
      </RouterLink>
      <RouterLink to="/example/simpleform" class="m-3 text-sm btn">
        SimpleForm
      </RouterLink>
      <RouterLink to="/example/simpleform" class="m-3 text-sm btn">
        SimpleForm
      </RouterLink>
      <RouterLink to="/example/simpleform" class="m-3 text-sm btn">
        SimpleForm
      </RouterLink>
      <RouterLink to="/example/simpleform" class="m-3 text-sm btn">
        SimpleForm
      </RouterLink>
      <RouterLink to="/example/simpleform" class="m-3 text-sm btn">
        SimpleForm
      </RouterLink>
    </div>
  </div>
</template>
