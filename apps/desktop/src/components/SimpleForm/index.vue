<script setup lang="ts">
import type { Props } from './type'

const props = withDefaults(defineProps<Props>(), {
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
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :disabled="disabled"
    :colon="colon"
  >
    <ARow :gutter="gutter">
      <ACol v-for="item in formItems" :key="item.name" :span="item.span || 12">
        <slot v-if="item.slot" :name="item.slot" />
        <AFormItem v-else :label="item.label" v-bind="validateInfos[item.name!]">
          <AInputPassword
            v-if="item.type === 'input' && item.other?.showPassword" v-model:value="form[item.name!]" class="w-full"
            :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
          <AInput
            v-else-if="item.type === 'input'" v-model:value="form[item.name!]" class="w-full"
            :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
          <ASelect
            v-else-if="item.type === 'select'" v-model="form[item.name!]" class="w-full"
            :options="item.options" :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
          <ADatePicker
            v-else-if="item.type === 'date'" v-model="form[item.name!]" class="w-full"
            :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
          <ATimePicker
            v-else-if="item.type === 'time'" v-model="form[item.name!]" class="w-full"
            :placeholder="item.placeholder" :disabled="item.disabled"
            v-bind="item.other"
          />
        </AFormItem>
      </ACol>
    </ARow>
  </AForm>
</template>
