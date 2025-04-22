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
  <VanField
    v-bind="fieldOptions"
    v-model="modelValue"
    @click="showPicker = true"
  />
  <VanPopup v-bind="popupOptions" v-model:show="showPicker">
    <VanPicker
      v-bind="pickerOptions"
      :model-value="pickerValue"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  </VanPopup>
</template>
