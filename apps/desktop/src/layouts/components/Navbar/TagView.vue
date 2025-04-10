<script lang="ts" setup>
defineOptions({ name: 'TagView' })

interface Tag {
  path: string
  title: string
}

const route = useRoute()
const router = useRouter()
const { cachedList, menuState, tags } = storeToRefs(useAppStore())

// 如果首页标签不存在，则添加
if (tags.value.findIndex(tag => tag.path === route.path) === -1) {
  tags.value.push({
    path: route.path,
    title: route.meta.title as string,
  })
}

watch(route, () => {
  // 修改defaultActive
  menuState.value.active = route.meta?.activePath || route.path

  if (tags.value.findIndex(tag => tag.path === route.path) === -1) {
    if (route.meta.keepAlive && typeof route.name === 'string') {
      cachedList.value.push(route.name)
    }

    tags.value.push({
      path: route.path,
      title: route.meta.title as string,
    })
  }
}, { immediate: true })

function handleClose(e: Event, tag: Tag) {
  e.stopPropagation()
  e.preventDefault()
  tags.value = tags.value.filter(t => t.path !== tag.path)

  if (route.path === tag.path) {
    const index = tags.value.findIndex(t => t.path === tag.path)
    const prevTag = tags.value[index - 1]
    router.push(prevTag.path)
  }
}
</script>

<template>
  <ScrollView class="tag-view-scroll-view" scroll-x :scroll-y="false" hide-scrollbar>
    <div class="tag-view">
      <RouterLink
        v-for="tag in tags" :key="tag.path" :to="tag.path"
        class="group flex cursor-pointer items-center justify-between rounded hover:(bg-primary text-white)"
        :class="{ 'bg-primary text-white': tag.path === route.path }"
      >
        <span class="flex-1 whitespace-nowrap px-2 text-12px">{{ tag.title }}</span>
        <span v-if="tag.path !== '/' && tag.path !== '/home'" class="i-carbon-close hover:scale-80" @click="handleClose($event, tag)" />
        <span v-else class="i-carbon-pin-filled text-12px" />
      </RouterLink>
    </div>
  </ScrollView>
</template>

<style scoped>
.tag-view {
  --at-apply:  h-[var(--tag-view-height)] flex gap-2 border-b b-b-[var(--el-border-color)] px-2 py-1;
  width: fit-content;
  min-width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
