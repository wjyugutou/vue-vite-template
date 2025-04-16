<script lang='ts' setup>
import type { RouteRecordRawC } from '@/router/type'

const props = defineProps<{
  item: RouteRecordRawC
  parentPath?: RouteRecordRawC['path']
}>()

const router = useRouter()

const { menuState } = storeToRefs(useAppStore())

function handleClick() {
  menuState.value.active = props.item.meta?.activePath || props.item.path

  if (props.item.meta?.link) {
    window.open(props.item.meta.link, '_blank')
  }
  else {
    router.push(props.item.path)
  }
}
</script>

<template>
  <ElSubMenu v-if="item.children && item.children.length > 0" :index="item.path">
    <template #title>
      <ElIcon>
        <!-- <span v-if="item.meta?.icon" :class="item.meta.icon" class="mr-4" /> -->
        <span class="icon i-carbon-user" />
      </ElIcon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <template v-for="child in item.children" :key="child.path">
      <SidebarItem v-if="!child.meta?.hideInMenu" :item="child" :parent-path="item.path" />
    </template>
  </ElSubMenu>
  <ElMenuItem v-else :index="item.path" :route="item" @click="handleClick">
    <ElIcon>
      <!-- <span v-if="item.meta?.icon" :class="item.meta.icon" class="mr-4" /> -->
      <span class="icon i-carbon-user" />
    </ElIcon>
    <template #title>
      <span>{{ item.meta?.title }}</span>
    </template>
  </ElMenuItem>
</template>
