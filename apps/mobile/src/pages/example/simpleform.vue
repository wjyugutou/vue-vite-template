<route lang="yaml">
meta:
  title: SimpleForm 校验 示例
</route>

<script lang='ts' setup>
import type { Rules } from '@repo/utils'
import { vaildateForm } from '@repo/utils'

const formModel = ref({
  name: undefined,
  age: undefined,
})

const rules: Rules = {
  name: {
    required: true,
    validator: async (value: string) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Name is too long'))
        }, 1000)
      })
    },
  },
  age: [
    {
      required: true,
      min: 18,
    },
    {
      required: true,
      max: 100,
    },
  ],
}

async function validate() {
  try {
    const result = await vaildateForm(formModel.value, rules).catch((error) => {
      showFailToast(error.message)
    })
    console.log('result', result)
  }
  catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <div>
    <div>SimpleForm</div>

    <div>
      name<input v-model="formModel.name" class="border border-gray-300 rounded-md p-2" type="text">
    </div>
    <div>
      age<input v-model="formModel.age" class="border border-gray-300 rounded-md p-2" type="number">
    </div>
    <button class="btn" @click="validate">
      Validate
    </button>
  </div>
</template>
