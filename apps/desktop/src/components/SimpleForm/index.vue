<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { Props } from './type'
import type { SimpleFormContext } from './useForm'
import { SIMPLE_FORM_NAME } from './useForm'

defineOptions({ name: 'SimpleForm' })

const props = withDefaults(defineProps<Props>(), {
  labelWidth: '120px',
  disabled: false,
  labelPosition: 'left',
  gutter: 20,
  colon: true,
})

const form = defineModel<Record<string, any>>({ required: true })

const formRef = useTemplateRef<FormInstance>('formRef')
const initData = reactive<Record<string, any>>({})

// 初始化表单数据和规则
props.formItems.forEach((item) => {
  if (item.prop) {
    initData[item.prop] = props.defaultValue?.[item.prop] || ''
  }
})

const formContext = inject<SimpleFormContext>(props.name || SIMPLE_FORM_NAME, undefined)

onMounted(() => {
  if (formContext !== undefined) {
    formContext!.value = formRef.value
  }
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
    :label-suffix="colon ? ':' : ''"
  >
    <ElRow :gutter="gutter">
      <ElCol v-for="item in formItems" :key="item.prop" :span="item.span || 12">
        <slot v-if="item.slot" :name="item.slot" />
        <ElFormItem v-else :label="item.label" :prop="item.prop" :rules="item.rules" :placeholder="item.placeholder" :disabled="item.disabled">
          <ElInput
            v-if="item.type === 'input'" v-model="form[item.prop!]" class="w-full" :placeholder="item.placeholder"
            :disabled="item.disabled" clearable v-bind="item.other" style="width: 100%;"
          />
          <ElSelect
            v-else-if="item.type === 'select'" v-model="form[item.prop!]" class="w-full" :placeholder="item.placeholder"
            :disabled="item.disabled" clearable v-bind="item.other" style="width: 100%;"
          >
            <ElOption v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
          </ElSelect>
          <ElDatePicker
            v-else-if="item.type === 'date'" v-model="form[item.prop!]" class="w-full" :placeholder="item.placeholder"
            :disabled="item.disabled" clearable value-format="YYYY-MM-DD" v-bind="item.other" style="width: 100%;"
          />
          <ElTimePicker
            v-else-if="item.type === 'time'" v-model="form[item.prop!]" class="w-full" :placeholder="item.placeholder"
            :disabled="item.disabled" clearable v-bind="item.other" style="width: 100%;"
          />
          <ElRadioGroup
            v-else-if="item.type === 'radio'" v-model="form[item.prop!]" class="w-full" :placeholder="item.placeholder"
            :disabled="item.disabled" clearable v-bind="item.other" style="width: 100%;"
          >
            <ElRadio v-for="option in item.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </ElRadio>
          </ElRadioGroup>
        </ElFormItem>
      </ElCol>
    </ElRow>
  </ElForm>
</template>
