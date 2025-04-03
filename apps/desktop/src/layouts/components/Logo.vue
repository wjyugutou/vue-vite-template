<script lang='ts' setup>
const router = useRouter()

const { settings } = storeToRefs(useAppStore())

function handleClickLogo() {
  router.push('/')
}
</script>

<template>
  <div class="h-[var(--header-height)] flex cursor-pointer items-center" @click="handleClickLogo">
    <div class="i-carbon-campsite text-24px" :class="settings.layoutMode === 'vertical' ? 'text-black' : 'text-white'" />
  </div>
</template>
