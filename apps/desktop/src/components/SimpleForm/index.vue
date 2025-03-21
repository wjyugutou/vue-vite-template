<script setup lang="ts">
import type { ElForm } from 'element-plus'

import type { Props } from './type'

const props = withDefaults(defineProps<Props>(), {
  labelWidth: '120px',
  disabled: false,
  labelPosition: 'left',
  gutter: 20,
})

const form = defineModel<Record<string, any>>({ required: true })

const formRef = ref<InstanceType<typeof ElForm>>()
const formData = reactive<Record<string, any>>({})
const rules = reactive<Record<string, any>>({})

// 初始化表单数据和规则
props.formItems.forEach((item) => {
  if (item.prop) {
    formData[item.prop] = props.defaultValue?.[item.prop] || ''
    if (item.rules) {
      rules[item.prop] = item.rules
    }
  }
})

// 暴露方法给父组件
defineExpose({
  // 获取表单数据
  getFormData: () => formData,
  // 清除表单验证
  clearValidate: () => {
    formRef.value?.clearValidate()
  },
  // 重置表单
  resetForm: () => {
    formRef.value?.resetFields()
  },
  // 验证表单
  validate: () => {
    return formRef.value?.validate()
  },
})
</script>

<template>
  <ElForm
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-width="labelWidth"
    :disabled="disabled"
    :label-position="labelPosition"
  >
    <ElRow :gutter="gutter">
      <ElCol v-for="item in formItems" :key="item.prop" :span="item.span || 12">
        <slot v-if="item.slot" :name="item.slot" />
        <ElFormItem v-else :label="item.label" :prop="item.prop" :rules="item.rules" :placeholder="item.placeholder" :disabled="item.disabled">
          <!-- <component :is="item.type" v-model="form[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled" /> -->
          <ElInput v-if="item.type === 'input'" v-model="form[item.prop!]" class="w-full" :placeholder="item.placeholder" :disabled="item.disabled" v-bind="item.other" />
          <ElSelect v-else-if="item.type === 'select'" v-model="form[item.prop!]" class="w-full" :placeholder="item.placeholder" :disabled="item.disabled" v-bind="item.other">
            <ElOption v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
          </ElSelect>
          <ElDatePicker v-else-if="item.type === 'date'" v-model="form[item.prop!]" class="w-full" :placeholder="item.placeholder" :disabled="item.disabled" v-bind="item.other" />
          <ElTimePicker v-else-if="item.type === 'time'" v-model="form[item.prop!]" class="w-full" :placeholder="item.placeholder" :disabled="item.disabled" v-bind="item.other" />
        </ElFormItem>
      </ElCol>
    </ElRow>
  </ElForm>
</template>
