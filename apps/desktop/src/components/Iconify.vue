<script lang='ts' setup>
import { icons as EPIcons } from '@iconify-json/ep'

const props = defineProps<{
  name?: string
}>()

const iconsMap: Record<string, any> = {
  ep: EPIcons.icons,
}

const type = computed(() => {
  return props.name?.split(':')[0]
})

const iconName = computed(() => {
  return props.name?.split(':')[1]
})

const iconHtml = computed(() => {
  // @ts-expect-error 类型断言
  return props.name ? iconsMap[type.value]?.[iconName.value]?.body : undefined
})
</script>

<template>
  <svg v-if="name" viewBox="0 0 1024 1024" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" v-html="iconHtml" />
  <span v-else />
</template>
