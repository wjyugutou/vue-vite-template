<script lang='ts' setup>
import type { RouteRecordRawC } from '@/router/type'

const props = defineProps<{
  item: RouteRecordRawC
  parentPath?: RouteRecordRawC['path']
}>()

const router = useRouter()

const { menuState } = storeToRefs(useAppStore())

const index = computed(() => `${props.item.path}`)

const badgeClassMap: Record<string, string> = {
  default: 'bg-default',
  destructive: 'bg-destructive',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
}

const badgeClass = computed(() => badgeClassMap[props.item.meta?.badgeVariants || 'default'])

function handleClick() {
  menuState.value.defaultActive = props.item.meta?.activePath || props.item.path

  if (props.item.meta?.link) {
    window.open(props.item.meta.link, '_blank')
  }
  else {
    router.push(props.item.path)
  }
}
</script>

<template>
  <ElSubMenu v-if="item.children && item.children.length > 0" :index="index">
    <template #title>
      <span v-if="item.meta?.icon" :class="item.meta.icon" class="mr-4" />
      {{ item.meta?.title }}
    </template>
    <template v-for="child in item.children" :key="child.path">
      <SidebarItem v-if="!child.meta?.hideInMenu" :item="child" :parent-path="item.path" />
    </template>
  </ElSubMenu>
  <ElMenuItem v-else :index="index" :route="item" @click="handleClick">
    <template #title>
      <div class="relative w-full flex items-center">
        <span v-if="item.meta?.icon" :class="item.meta.icon" class="mr-4" />
        <!-- <span>icon</span> -->
        <span>{{ item.meta?.title }}</span>

        <div v-if="item.meta?.badge" class="menu-badge" :class="badgeClass">{{ item.meta?.badge }}</div>
      </div>
    </template>
  </ElMenuItem>
</template>

<style>
.el-sub-menu {

  &.is-active {

    & > .el-sub-menu__title {
      color: var(--el-menu-active-color);
    }
  }

  .el-menu-item {

    &.is-active{
      background-color: var(--el-menu-hover-bg-color);
    }

    .menu-badge {
      @apply absolute right-2 h-20px w-20px flex items-center overflow-hidden justify-center text-ellipsis rounded-full p-1 whitespace-nowrap text-10px text-white;
    }
  }
}
</style>
