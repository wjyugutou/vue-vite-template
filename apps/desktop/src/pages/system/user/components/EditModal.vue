<script setup lang="ts">
import type { DeptTreeSelect, UserParams } from '@repo/api'
import type { FormItem } from '@/components/SimpleForm/type'
import { addUserApi, deptTreeSelectApi, getPostsRolesApi, getUserInfoApi, updateUserApi } from '@repo/api'
import { useForm } from '@/components/SimpleForm/useForm'

const props = defineProps<{
  userId?: string | number
}>()

const emit = defineEmits<{
  success: []
}>()

const visible = defineModel<boolean>('visible', { required: true })

const title = computed(() => props.userId ? '编辑用户' : '新增用户')

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

const { data: userData, refetch: getPostsRoles } = useQuery({
  queryFn: getPostsRolesApi,
  queryKey: ['getPostsRoles'],
})

const posts = computed<Option[]>(() => userData.value?.posts.map(post => ({ label: post.postName, value: post.postId })) || [])
const roles = computed<Option[]>(() => userData.value?.roles.map(role => ({ label: role.roleName, value: role.roleId })) || [])

const formItems = computed<FormItem[]>(() => [
  { label: '用户姓名', prop: 'nickName', type: 'input', placeholder: '请输入用户姓名' },
  { label: '归属部门', prop: 'deptId', slot: 'deptId' },
  { label: '手机号码', prop: 'phonenumber', type: 'input', placeholder: '请输入手机号码' },
  { label: '邮箱', prop: 'email', type: 'input', placeholder: '请输入邮箱' },
  { label: '用户账号', prop: 'userName', type: 'input', placeholder: '请输入用户账号' },
  { label: '用户密码', prop: 'password', type: 'input', placeholder: '请输入用户密码', other: { password: true } },
  { label: '用户性别', prop: 'sex', type: 'input', placeholder: '请选择用户性别' },
  { label: '状态', prop: 'status', type: 'radio', options: [{ label: '正常', value: '0' }, { label: '停用', value: '1' }], placeholder: '请选择状态' },
  { label: '岗位', prop: 'postIds', type: 'select', options: posts.value, placeholder: '请选择岗位' },
  { label: '角色', prop: 'roleIds', type: 'select', options: roles.value, placeholder: '请选择角色', other: { multiple: true } },
  { label: '备注', prop: 'remark', type: 'input', placeholder: '请输入备注', span: 24, other: { rows: 2, type: 'textarea' } },
])

const { data: deptOptions } = useQuery({ queryFn: deptTreeSelectApi, queryKey: ['deptTreeSelect'], initialData: [] })
const treeData = ref<DeptTreeSelect[]>([])
const flatTreeData = computed(() => {
  function flat(data: DeptTreeSelect[]): DeptTreeSelect[] {
    return data?.flatMap(item => [item, ...flat(item.children)]) || []
  }
  return flat(deptOptions.value)
})
function filterMethod(value: string) {
  if (value) {
    treeData.value = flatTreeData.value.filter(item => item.label.includes(value))
  }
  else {
    treeData.value = deptOptions.value
  }
}

const formContext = useForm()

watch(() => visible.value, (val) => {
  if (val) {
    formContext.value?.resetFields()
    getPostsRoles()
    if (props.userId) {
      getUserInfo()
    }
  }
  else {
    formContext.value?.resetFields()
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
  await formContext.value?.validate()
  try {
    if (props.userId) {
      await updateUserApi(Object.assign(form.value, { userId: props.userId }))
    }
    else {
      await addUserApi(form.value)
    }
    ElMessage.success(`${title.value}成功`)
    visible.value = false
    emit('success')
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <ElDialog v-model="visible" :title="title" width="800px">
    <SimpleForm v-model="form" :form-items="formItems" :rules="rules" :label-width="100">
      <template #deptId>
        <ElFormItem label="归属部门" prop="deptId">
          <ElTreeSelect
            v-model="form.deptId" :data="treeData" check-strictly
            placeholder="请选择部门"
            :props="{ children: 'children', label: 'label', value: 'id' }"
            :filter-method="filterMethod"
            filterable
          />
        </ElFormItem>
      </template>
    </SimpleForm>
    <template #footer>
      <ElButton type="primary" @click="handleSubmit">
        确定
      </ElButton>
    </template>
  </ElDialog>
</template>
