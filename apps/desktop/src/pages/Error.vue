<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * 描述
   */
  description?: string
  /**
   *  @zh_CN 首页路由地址
   *  @default /
   */
  homePath?: string
  /**
   * @zh_CN 默认显示的图片
   * @default pageNotFoundSvg
   */
  image?: string
  /**
   *  @zh_CN 内置类型
   */
  status?: '403' | '404' | '500'
  /**
   *  @zh_CN 页面提示语
   */
  title?: string
}>(), {
  description: '',
  homePath: '/',
  image: '',
  showBack: true,
  status: '404',
  title: '',
})

const route = useRoute()
const router = useRouter()

console.log('[Error]', route)

const Icon403 = defineAsyncComponent(() => import('@/assets/icons/icon-403.vue'))
const Icon404 = defineAsyncComponent(() => import('@/assets/icons/icon-404.vue'))
const Icon500 = defineAsyncComponent(() => import('@/assets/icons/icon-500.vue'))

const fallbackIcon = computed(() => {
  switch (props.status) {
    case '403': {
      return Icon403
    }
    case '404': {
      return Icon404
    }
    case '500': {
      return Icon500
    }
    default: {
      return null
    }
  }
})

function goHome() {
  router.push(props.homePath)
}
</script>

<template>
  <div class="size-full flex flex-col items-center justify-center duration-300">
    <h1 v-if="title">{{ title }}</h1>
    <img v-if="image" :src="image" class="w-1/2 lg:w-1/4">
    <component
      :is="fallbackIcon"
      v-else-if="fallbackIcon"
      class="md:1/3 h-1/3 w-1/2 lg:w-1/4"
    />
    <div class="text-center">
      <AButton type="primary" @click="goHome">返回首页</AButton>
    </div>
  </div>
</template>
