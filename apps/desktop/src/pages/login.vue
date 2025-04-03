<script setup lang="ts">
import type { FormItem, FormRules } from '@/components/SimpleForm/type'
import { loginApi } from '@repo/api'
import { useRequest } from 'alova/client'
import { Form } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const { redirect } = route.query

const form = ref({
  username: 'admin',
  password: 'admin123',
})

const formItems = ref<FormItem[]>([
  { label: '账号', span: 24, name: 'username', type: 'input', placeholder: '请输入账号', other: { allowClear: true } },
  { label: '密码', span: 24, name: 'password', type: 'input', placeholder: '请输入密码', other: { allowClear: true, password: true } },
  { slot: 'footer', span: 24 },
])

const rules = shallowRef<FormRules>({
  username: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }],
})

const userStore = useUserStore()
const { validate, validateInfos } = Form.useForm(form, rules)

const { loading, send } = useRequest(loginApi, { immediate: false })

async function handleLogin() {
  try {
    await validate()

    const res = await send(form.value)

    userStore.login(res)

    const path = (redirect as string) || '/'
    router.push(path)
  }
  catch (error) {

  }
}
</script>

<template>
  <div class="m-auto h-full w-30% content-center">
    <h1 class="mb-10 text-center text-2xl font-bold">登录</h1>
    <div class="">
      <SimpleForm v-model="form" :validate-infos="validateInfos" :form-items="formItems" label-width="52px">
        <template #footer>
          <div class="text-center">
            <AButton type="primary" :loading="loading" @click="handleLogin">登录</AButton>
          </div>
        </template>
      </SimpleForm>
    </div>
  </div>
</template>
