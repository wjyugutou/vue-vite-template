<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { FormInstance } from 'element-plus'
import { loginApi } from '@repo/api'
import { useRequest } from 'alova/client'

const router = useRouter()
const route = useRoute()
const { redirect } = route.query

const form = ref({
  username: 'admin',
  password: 'admin123',
})

const formRef = useTemplateRef<FormInstance>('formRef')
const formItems = ref<FormItem[]>([
  { label: '账号', span: 24, prop: 'username', type: 'input', placeholder: '请输入账号', rules: [{ required: true, message: '请输入账号' }], other: { clearable: true } },
  { label: '密码', span: 24, prop: 'password', type: 'input', placeholder: '请输入密码', rules: [{ required: true, message: '请输入密码' }], other: { clearable: true, showPassword: true } },
  { slot: 'footer', span: 24 },
])

const userStore = useUserStore()

const { loading, send } = useRequest(loginApi, { immediate: false })

function handleLogin() {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        const res = await send(form.value)

        userStore.login(res)

        // await userStore.getUserInfo()

        const path = (redirect as string) || '/'
        router.push(path)
      }
      catch (error) {

      }
    }
  })
}
</script>

<template>
  <div class="m-auto h-full w-30% content-center">
    <h1 class="mb-10 text-center text-2xl font-bold">登录</h1>
    <div class="">
      <SimpleForm ref="formRef" v-model="form" :form-items="formItems" label-width="52px">
        <template #footer>
          <div class="text-center">
            <ElButton type="primary" :loading="loading" @click="handleLogin">登录</ElButton>
          </div>
        </template>
      </SimpleForm>
    </div>
  </div>
</template>
