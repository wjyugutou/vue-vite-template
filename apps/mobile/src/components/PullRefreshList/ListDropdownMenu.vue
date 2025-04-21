<script lang='ts' setup>
import type { DropdownMenuInstance, PickerColumn } from 'vant'
import type { DropdownOption } from './type'

const props = defineProps<{
  options: DropdownOption[]
}>()

const params = defineModel<Record<string, any>>({ required: true })

function getPickerColumns(columns: PickerColumn) {
  return [
    {
      text: '默认',
      value: undefined,
    },
    ...columns,
  ]
}

function getDropdownTitle(item: DropdownOption) {
  if (item.type === 'picker') {
    const text = item.options.find(option => option.value === params.value[item.prop])?.text as string | undefined
    return text || item.title
  }
}

const dropdownMenuRef = useTemplateRef<DropdownMenuInstance>('dropdownMenuRef')

const pickerModelValue = reactive<Record<string, any>>({})

function handlePickerConfirm(event: any, item: DropdownOption) {
  const { selectedValues } = event
  params.value[item.prop] = selectedValues[0]
  pickerModelValue[item.prop] = selectedValues
  dropdownMenuRef.value?.close()
}

function handlePickerCancel(event: any, item: DropdownOption) {
  dropdownMenuRef.value?.close()
}
</script>

<template>
  <VanDropdownMenu ref="dropdownMenuRef" v-model="params">
    <template v-for="item, index in options" :key="index">
      <VanDropdownItem
        v-if="item.type === 'picker'"
        :title="getDropdownTitle(item)"
      >
        <VanPicker
          :model-value="pickerModelValue[item.prop]" :columns="getPickerColumns(item.options)" v-bind="item.config"
          @confirm="handlePickerConfirm($event, item)" @cancel="handlePickerCancel($event, item)"
        />
      </VanDropdownItem>
      <VanDropdownItem
        v-else
        v-model="params[item.prop]" :title="params[item.prop] ? undefined : item.title" :options="item.options"
      />
    </template>
  </VanDropdownMenu>
</template>
