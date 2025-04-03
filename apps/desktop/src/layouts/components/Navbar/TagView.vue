<script lang="ts" setup>
import type { Tag } from '@/store/app'

const route = useRoute()
const router = useRouter()
// const {tags} = useSessionStorage<Tag[]>('app-tags', [{ path: '/', title: '首页' }])

const { cachedList, menuState, tags } = storeToRefs(useAppStore())

watch(route, () => {
  // 修改defaultActive
  menuState.value.selectedKeys = [route.meta?.activePath || route.path]

  if (tags.value.findIndex(tag => tag.path === route.path) === -1) {
    if (route.meta.keepAlive) {
      cachedList.value.push(route.path)
    }

    tags.value.push({
      path: route.path,
      title: route.meta.title as string,
    })
  }
})

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
        class="group hover:bg-primary text-primary flex cursor-pointer items-center justify-between rounded decoration-none hover:(text-white)"
        :class="{ 'bg-primary text-white': tag.path === route.path }"
      >
        <span class="flex-1 whitespace-nowrap px-2 text-12px">{{ tag.title }}</span>
        <span v-if="tag.path === '/' || tag.path === '/home'" class="i-ant-design-pushpin-filled text-12px" />
        <span v-else class="i-ant-design-close-outlined scale-80 hover:scale-60" @click="handleClose($event, tag)" />
      </RouterLink>
    </div>
  </ScrollView>
</template>

<style scoped>
.tag-view {
  --at-apply: h-[var(--tag-view-height)] flex gap-2 px-2 py-1;

  width: fit-content;
  min-width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
