<script setup lang="ts">
import { testApi, useRequest } from 'api'

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

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'gender', label: '性别' },
]

const tableData = [
  { name: '张三', age: 18, gender: '男' },
  { name: '李四', age: 20, gender: '女' },
  { name: '王五', age: 22, gender: '男' },
]

const { data, loading, error } = useRequest(testApi)

watchEffect(() => {
  console.log('data', data.value)
  console.log('loading', loading.value)
  console.log('error', error.value)
})
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
      autocomplete="false"
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

    <SimpleTable
      :columns="columns" :table-data="tableData"
      pagination
      :total="100"
      :current-page="1"
      :page-size="10"
    />
  </div>
</template>
