<script setup lang="ts">
import type { Props } from './type'

const props = withDefaults(defineProps<Props>(), {
  colon: true,
  disabled: false,
  labelCol: () => ({ span: 4 }),
  wrapperCol: (props) => {
    return { span: 24 - Number.parseInt(props.labelCol!.span!.toString()) }
  },
  gutter: 20,
})

const form = defineModel<Record<string, any>>({ required: true })

const initData = reactive<Record<string, any>>({})

// 初始化表单数据和规则
props.formItems.forEach((item) => {
  if (item.name) {
    initData[item.name] = props.defaultValue?.[item.name] || ''
  }
})
</script>

<template>
  <AForm
    :model="form"
    :layout="layout"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :disabled="disabled"
    :colon="colon"
  >
    <ARow :gutter="gutter">
      <ACol v-for="item in formItems" :key="item.name" :span="item.span || 12">
        <AFormItem :label="item.label" v-bind="validateInfos?.[item.name!]" :label-col="item.labelCol" :wrapper-col="item.wrapperCol">
          <slot v-if="item.slot" :name="item.slot" />

          <AInputPassword
            v-else-if="item.type === 'input' && item.other?.showPassword" v-model:value="form[item.name!]" class="w-full"
            :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
          <AInput
            v-else-if="item.type === 'input'" v-model:value="form[item.name!]" class="w-full"
            :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
          <ATextarea
            v-else-if="item.type === 'textarea'" v-model:value="form[item.name!]" class="w-full"
            :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
          <ASelect
            v-else-if="item.type === 'select'" v-model:value="form[item.name!]" class="w-full"
            :options="item.options" :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
          <ADatePicker
            v-else-if="item.type === 'date'" v-model:value="form[item.name!]" class="w-full"
            :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
          <ARangePicker
            v-else-if="item.type === 'rangedate'" v-model:value="form[item.name!]" class="w-full"
            :disabled="item.disabled"
            v-bind="item.other"
          />
          <ATimePicker
            v-else-if="item.type === 'time'" v-model:value="form[item.name!]" class="w-full"
            :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
          <ARadioGroup
            v-else-if="item.type === 'radio'" v-model:value="form[item.name!]" class="w-full"
            :options="item.options" :disabled="item.disabled"
            v-bind="item.other"
          />
        </AFormItem>
      </ACol>
    </ARow>
  </AForm>
</template>
