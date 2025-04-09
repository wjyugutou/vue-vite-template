<script lang='ts' setup>
import type { RouteRecordRawC } from '@/router/type'

const props = defineProps<{
  item: RouteRecordRawC
  parentPath?: RouteRecordRawC['path']
}>()

const router = useRouter()

const { menuState } = storeToRefs(useAppStore())

const key = computed(() => `${props.parentPath ? `${props.parentPath}/` : ''}${props.item.path}`)

function handleClick() {
  menuState.value.active = props.item.meta?.activePath || props.item.path

  if (props.item.meta?.link) {
    window.open(props.item.meta.link, '_blank')
  }
  else {
    router.push(key.value)
  }
}
</script>

<template>
  <ElSubMenu v-if="item.children && item.children.length > 0" :index="key">
    <template #title>
      <!-- <span v-if="item.meta?.icon" :class="item.meta.icon" class="mr-4" /> -->
      <span class="icon i-carbon-user" />
      <span>{{ item.meta?.title }}</span>
    </template>
    <template v-for="child in item.children" :key="child.path">
      <SidebarItem v-if="!child.meta?.hideInMenu" :item="child" :parent-path="item.path" />
    </template>
  </ElSubMenu>
  <ElMenuItem v-else :index="key" :route="item" @click="handleClick">
    <template #title>
      <div class="relative w-full flex items-center">
        <!-- <span v-if="item.meta?.icon" :class="item.meta.icon" class="mr-4" /> -->
        <span class="icon i-carbon-user" />
        <span>{{ item.meta?.title }}</span>
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
      --at-apply: absolute right-2 size-4 line-height-2 overflow-hidden text-ellipsis rounded-full whitespace-nowrap text-10px text-center content-center text-white;
    }

    .menu-badge-dot {
      --at-apply: absolute right-2 size-2  bg-danger rounded-full;
    }
  }
}
</style>
