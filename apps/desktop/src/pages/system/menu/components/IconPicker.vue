<script lang='ts' setup>
import { icons as EPIcons } from '@iconify-json/ep'

const modelValue = defineModel<string>()

const iconNameList = Object.keys(EPIcons.icons).map(iconName => `${EPIcons.prefix}:${iconName}`)

const search = ref('')

const filteredIconList = computed(() => {
  return iconNameList.filter(iconName => iconName.includes(search.value))
})
</script>

<template>
  <div>
    <ElInput v-model="search" placeholder="请输入图标名称" />

    <ScrollView class="mt-2 h-80 flex">
      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="iconName in filteredIconList" :key="iconName"
          class="flex cursor-pointer gap-1 p-2 hover:bg-gray-100" :class="{ 'bg-gray-100': iconName === modelValue }"
          @click="modelValue = iconName"
        >
          <Iconify :name="iconName" />
          <span>{{ iconName }}</span>
        </div>
      </div>
    </ScrollView>
  </div>
</template>
