<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { FormInstance } from 'element-plus'
import { useForm } from '@/components/SimpleForm/useForm'
import { loginApi } from '@repo/api'

const router = useRouter()
const route = useRoute()
const { redirect } = route.query

const form = ref({
  username: 'admin',
  password: 'admin123',
})

const formItems = ref<FormItem[]>([
  { label: '账号', span: 24, prop: 'username', type: 'input', placeholder: '请输入账号', rules: [{ required: true, message: '请输入账号' }], other: { clearable: true } },
  { label: '密码', span: 24, prop: 'password', type: 'input', placeholder: '请输入密码', rules: [{ required: true, message: '请输入密码' }], other: { clearable: true, showPassword: true } },
  { slot: 'footer', span: 24 },
])

const userStore = useUserStore()

const { isLoading, error, data, refetch } = useQuery({
  queryFn: () => loginApi(form.value),
  queryKey: ['login'],
})

const formIns = useForm()
function handleLogin() {
  formIns.value?.validate(async (valid) => {
    if (valid) {
      try {
        await refetch()

        console.error(error.value)

        console.log(data.value)
        return
        userStore.login(data.value!)

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
      <SimpleForm v-model="form" :form-items="formItems" label-width="60px">
        <template #footer>
          <div class="text-center">
            <ElButton type="primary" :loading="isLoading" @click="handleLogin">登录</ElButton>
          </div>
        </template>
      </SimpleForm>
    </div>
  </div>
</template>
