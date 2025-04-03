<script setup lang="ts">
import type { FormItem } from '@/components/SimpleForm/type'
import type { UserParams } from '@repo/api'
import { addUserApi, deptTreeSelectApi, getPostsRolesApi, getUserInfoApi, updateUserApi } from '@repo/api'
import { useRequest } from 'alova/client'
import { Form } from 'ant-design-vue'

const props = defineProps<{
  userId?: string | number
}>()

const visible = defineModel<boolean>('visible', { required: true })

const title = computed(() => props.userId ? '编辑用户' : '新增用户')

const { data: deptOptions } = useRequest(deptTreeSelectApi, {
  initialData: [],
})

const form = ref<UserParams>({
  nickName: undefined,
  deptId: undefined,
  phonenumber: undefined,
  email: undefined,
  userName: undefined,
  password: undefined,
  sex: undefined,
  status: '0',
  postIds: [],
  roleIds: [],
  remark: undefined,
})

const rules = shallowRef({
  nickName: [{ required: true, message: '请输入用户姓名' }],
  deptId: [{ required: true, message: '请选择归属部门' }],
  phonenumber: [{ required: true, message: '请输入手机号码' }],
  userName: [{ required: true, message: '请输入用户账号' }],
  password: [{ required: true, message: '请输入用户密码' }],
  roleIds: [{ required: true, message: '请选择角色' }],
})

const { data: userData, send: getPostsRoles } = useRequest(getPostsRolesApi, {
  immediate: false,
})

const posts = computed<Option[]>(() => userData.value?.posts.map(post => ({ label: post.postName, value: post.postId })) || [])
const roles = computed<Option[]>(() => userData.value?.roles.map(role => ({ label: role.roleName, value: role.roleId })) || [])

const formItems = computed<FormItem[]>(() => [
  { label: '用户姓名', name: 'nickName', type: 'input', placeholder: '请输入用户姓名' },
  { label: '归属部门', name: 'deptId', slot: 'deptId' },
  { label: '手机号码', name: 'phonenumber', type: 'input', placeholder: '请输入手机号码' },
  { label: '邮箱', name: 'email', type: 'input', placeholder: '请输入邮箱' },
  { label: '用户账号', name: 'userName', type: 'input', placeholder: '请输入用户账号' },
  { label: '用户密码', name: 'password', type: 'input', placeholder: '请输入用户密码', other: { password: true } },
  { label: '用户性别', name: 'sex', type: 'input', placeholder: '请选择用户性别' },
  { label: '状态', name: 'status', type: 'radio', options: [{ label: '正常', value: '0' }, { label: '停用', value: '1' }], placeholder: '请选择状态' },
  { label: '岗位', name: 'postIds', type: 'select', options: posts.value, placeholder: '请选择岗位' },
  { label: '角色', name: 'roleIds', type: 'select', options: roles.value, placeholder: '请选择角色', other: { mode: 'multiple' } },
  { label: '备注', name: 'remark', type: 'textarea', placeholder: '请输入备注', span: 24, labelCol: { span: 3 }, wrapperCol: { span: 22 }, other: { rows: 2 } },
])

const { validate, validateInfos, resetFields } = Form.useForm(form, rules)

watch(() => visible.value, (val) => {
  if (val) {
    resetFields()
    getPostsRoles()
    if (props.userId) {
      getUserInfo()
    }
  }
  else {
    resetFields()
  }
}, { immediate: true })

async function getUserInfo() {
  try {
    const res = await getUserInfoApi(props.userId)

    form.value = {
      ...res.data,
      roleIds: res.roleIds!,
      postIds: res.postIds!,
    }
  }
  catch (error) {
    console.log(error)
  }
}

async function handleSubmit() {
  console.log(form.value)

  return
  await validate()
  try {
    if (props.userId) {
      await updateUserApi(Object.assign(form.value, { userId: props.userId }))
    }
    else {
      await addUserApi(form.value)
    }
    useMessage().success(`${title.value}成功`)
    visible.value = false
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <AModal v-model:open="visible" :title="title" width="800px">
    <SimpleForm v-model="form" :form-items="formItems" :label-col="{ span: 6 }" :validate-infos="validateInfos">
      <template #deptId>
        <ATreeSelect
          v-model:value="form.deptId" :tree-data="deptOptions" show-search tree-node-filter-prop="label"
          placeholder="请选择部门" :field-names="{ value: 'id' }"
        />
      </template>
    </SimpleForm>
    <template #footer>
      <AButton type="primary" @click="handleSubmit">
        提交
      </AButton>
    </template>
  </AModal>
</template>
