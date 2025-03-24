<script lang='ts' setup>
import type { RouteRecordRawC } from '@/router/type'

const props = defineProps<{
  item: RouteRecordRawC
  parentPath?: RouteRecordRawC['path']
}>()

const router = useRouter()

const { menuState } = storeToRefs(useAppStore())
const { menus } = storeToRefs(useUserStore())

const index = computed(() => `${props.item.path}`)

const badgeClassMap: Record<string, string> = {
  default: 'bg-gray-500',
  danger: 'bg-danger',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
}

const badgeVariants = computed(() => props.item.meta?.badgeVariants || 'default')

// 如果badgeVariants.value在badgeClassMap中不存在，则说明badgeVariants.value是自定义颜色
const badgeColor = computed(() => {
  if (badgeVariants.value) {
    return badgeVariants.value in badgeClassMap
      ? {
          class: badgeClassMap[badgeVariants.value],
        }
      : {
          style: {
            backgroundColor: badgeVariants.value,
          },
        }
  }
  else {
    return {
      class: 'bg-danger',
    }
  }
})

function handleClick() {
  if (props.item.name === 'BadgeDotDemo') {
    console.log(props.item)
  }

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

        <span v-if="item.meta?.badge" class="menu-badge" v-bind="badgeColor">{{ item.meta?.badge }}</span>
        <span v-else-if="item.meta?.badgeType === 'dot'" class="menu-badge-dot" />
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
      @apply absolute right-2 size-4 line-height-2 overflow-hidden text-ellipsis rounded-full whitespace-nowrap text-10px text-center content-center text-white;
    }

    .menu-badge-dot {
      @apply absolute right-2 size-2  bg-danger rounded-full;
    }
  }
}
</style>
