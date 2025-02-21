<script lang='ts' setup>
import type { FieldSelectProps } from './type'

defineOptions({ name: 'FieldSelect' })
defineProps<FieldSelectProps>()

const emit = defineEmits<{
  (e: 'confirm', value: string | number): void
}>()

const modelValue = defineModel<string | number>({ default: '' })

const pickerValue = ref([])
const showPicker = ref(false)

function onConfirm(value: string | number) {
  modelValue.value = value
  showPicker.value = false
  emit('confirm', value)
}
</script>

<template>
  <van-field
    v-bind="fieldOptions"
    v-model="modelValue"
    @click="showPicker = true"
  />
  <van-popup v-bind="popupOptions" v-model:show="showPicker">
    <van-picker
      v-bind="pickerOptions"
      :model-value="pickerValue"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>
