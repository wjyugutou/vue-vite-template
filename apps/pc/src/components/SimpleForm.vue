<script setup lang="ts">
import type { ElForm } from 'element-plus'

interface FormItem {
  type: 'input' | 'select' | 'date'
  span?: number
  label: string
  prop: string
  placeholder?: string
  disabled?: boolean
  rules?: any[]
  options?: Array<{ label: string, value: any }>
  dateType?: string
  slot?: string
}

interface Props {
  formItems: FormItem[]
  gutter?: number
  labelWidth?: string | number
  defaultValue?: Record<string, any>
  disabled?: boolean
  labelPosition?: 'top' | 'left'
}

const props = withDefaults(defineProps<Props>(), {
  labelWidth: '120px',
  disabled: false,
  labelPosition: 'top',
  gutter: 20,
})

const formRef = ref<InstanceType<typeof ElForm>>()
const formData = reactive<Record<string, any>>({})
const rules = reactive<Record<string, any>>({})

// 初始化表单数据和规则
props.formItems.forEach((item) => {
  formData[item.prop] = props.defaultValue?.[item.prop] || ''
  if (item.rules) {
    rules[item.prop] = item.rules
  }
})

// 暴露方法给父组件
defineExpose({
  // 获取表单数据
  getFormData: () => formData,
  // 重置表单
  resetForm: () => {
    formRef.value?.resetFields()
  },
  // 验证表单
  validate: (cb: (valid: boolean) => void) => {
    return formRef.value?.validate(cb)
  },
})
</script>

<template>
  <ElForm
    ref="formRef"
    :model="formData"
    :rules="rules"
    :label-width="labelWidth"
    :disabled="disabled"
    :label-position="labelPosition"
  >
    <ElRow :gutter="gutter">
      <ElCol v-for="item in formItems" :key="item.prop" :span="item.span || 12">
        <ElFormItem :label="item.label" :prop="item.prop" :rules="item.rules" :placeholder="item.placeholder" :disabled="item.disabled">
          <component :is="item.type" v-model="formData[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled" />
        </ElFormItem>
      </ElCol>
    </ElRow>
  </ElForm>
</template>
