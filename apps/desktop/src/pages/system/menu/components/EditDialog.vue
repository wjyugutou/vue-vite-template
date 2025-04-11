<script lang='ts' setup>
import type { AddMenuParams } from '@repo/api'
import type { FormInstance, FormRules } from 'element-plus'
import { addMenuApi, getMenuApi, MenuIsCache, MenuIsFrame, MenuStatus, MenuType, MenuVisible, updateMenuApi } from '@repo/api'
import IconPicker from './IconPicker.vue'

const props = defineProps<{
  type: 'add' | 'edit'
  id?: number
  onSuccess?: () => void
}>()

const visible = defineModel<boolean>({ required: true })

const title = computed(() => {
  return props.type === 'add' ? '新增菜单' : '编辑菜单'
})

const menuTypeList = [
  { value: MenuType.dir, label: '目录' },
  { value: MenuType.menu, label: '菜单' },
  { value: MenuType.btn, label: '按钮' },
]

const { data } = useMenuTree()
const menuList = computed(() => {
  return [
    {
      value: 0,
      label: '根菜单',
      menuId: 0,
      menuName: '根菜单',
      children: data.value,
    },
  ]
})

const form = ref<AddMenuParams>({
  menuName: '',
  parentId: 0,
  orderNum: 0,
  path: '',
  component: '',
  icon: '',
  menuType: MenuType.dir,
  status: MenuStatus.正常,
  visible: MenuVisible.显示,
  isFrame: MenuIsFrame.是,
  isCache: MenuIsCache.是,
})

const rules: FormRules = {
  menuName: [{ required: true, message: '请输入菜单名称' }],
  orderNum: [{ required: true, message: '请输入显示排序' }],
  path: [{ required: true, message: '请输入路由地址' }],
}

const formInstance = useTemplateRef<FormInstance>('formRef')

async function handleOpen() {
  if (props.type === 'edit') {
    const data = await getMenuApi(props.id!)
    form.value = data
  }
  form.value.parentId = props.id || 0
  formInstance.value?.clearValidate()
}

function handleSubmit() {
  formInstance.value?.validate(async (valid) => {
    if (valid) {
      const request = props.type === 'add' ? addMenuApi : updateMenuApi
      await request(form.value)
      visible.value = false
      ElMessage.success('操作成功')
      props.onSuccess?.()
    }
  })
}
</script>

<template>
  <ElDialog v-model="visible" :title="title" width="50%" @open="handleOpen">
    <ElForm ref="formRef" :model="form" :rules="rules" label-width="90px">
      <ElRow>
        <ElCol :span="24">
          <ElFormItem label="上级菜单" prop="parentId">
            <ElTreeSelect
              v-model="form.parentId" :data="menuList" check-strictly
              placeholder="请选择上级菜单"
            />
          </ElFormItem>
        </ElCol>

        <ElCol :span="24">
          <ElFormItem label="菜单类型" prop="menuType">
            <ElRadioGroup v-model="form.menuType" placeholder="请选择菜单类型">
              <ElRadio v-for="item in menuTypeList" :key="item.value" :label="item.label" :value="item.value" />
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>

        <ElCol v-if="form.menuType !== MenuType.btn" :span="24">
          <ElFormItem label="菜单图标" prop="icon">
            <ElPopover width="700px" trigger="click">
              <template #reference>
                <ElInput v-model="form.icon" placeholder="请输入菜单图标">
                  <template #prefix>
                    <Iconify :name="form.icon" />
                  </template>
                </ElInput>
              </template>
              <IconPicker v-model="form.icon" />
            </ElPopover>
          </ElFormItem>
        </ElCol>

        <ElCol v-if="form.menuType !== MenuType.btn" :span="12">
          <ElFormItem label="菜单名称" prop="menuName">
            <ElInput v-model="form.menuName" placeholder="请输入菜单名称" />
          </ElFormItem>
        </ElCol>

        <ElCol :span="12">
          <ElFormItem label="显示排序" prop="orderNum">
            <ElInputNumber v-model="form.orderNum" controls-position="right" :min="0" />
          </ElFormItem>
        </ElCol>

        <ElCol v-if="form.menuType !== MenuType.btn" :span="12">
          <ElFormItem label="是否外链" prop="isFrame">
            <ElRadioGroup v-model="form.isFrame" placeholder="请选择是否外链">
              <ElRadio :value="MenuIsFrame.是"> 是 </ElRadio>
              <ElRadio :value="MenuIsFrame.否"> 否 </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>

        <ElCol v-if="form.menuType !== MenuType.btn" :span="12">
          <ElFormItem label="路由地址" prop="path">
            <ElInput v-model="form.path" placeholder="请输入路由地址" />
          </ElFormItem>
        </ElCol>

        <ElCol v-if="form.menuType === MenuType.menu" :span="12">
          <ElFormItem label="组件路径" prop="component">
            <ElInput v-model="form.component" placeholder="请输入组件路径" />
          </ElFormItem>
        </ElCol>

        <ElCol v-if="form.menuType !== MenuType.dir" :span="12">
          <ElFormItem label="权限字符" prop="perms">
            <ElInput v-model="form.perms" placeholder="请输入权限字符" />
          </ElFormItem>
        </ElCol>

        <ElCol v-if="form.menuType === MenuType.menu" :span="12">
          <ElFormItem label="路由参数" prop="query">
            <ElInput v-model="form.query" placeholder="请输入路由参数" />
          </ElFormItem>
        </ElCol>

        <ElCol v-if="form.menuType === MenuType.menu" :span="12">
          <ElFormItem label="是否缓存" prop="isCache">
            <ElRadioGroup v-model="form.isCache">
              <ElRadio :value="MenuIsCache.是"> 是 </ElRadio>
              <ElRadio :value="MenuIsCache.否"> 否 </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>

        <ElCol v-if="form.menuType !== MenuType.btn" :span="12">
          <ElFormItem label="显示状态" prop="visible">
            <ElRadioGroup v-model="form.visible">
              <ElRadio :value="MenuVisible.显示"> 显示 </ElRadio>
              <ElRadio :value="MenuVisible.隐藏"> 隐藏 </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>

        <ElCol v-if="form.menuType !== MenuType.btn" :span="12">
          <ElFormItem label="菜单状态" prop="status">
            <ElRadioGroup v-model="form.status">
              <ElRadio :value="MenuStatus.正常"> 正常 </ElRadio>
              <ElRadio :value="MenuStatus.停用"> 停用 </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>

    <template #footer>
      <ElButton type="primary" @click="handleSubmit"> 确定 </ElButton>
      <ElButton @click="visible = false"> 取消 </ElButton>
    </template>
  </ElDialog>
</template>
