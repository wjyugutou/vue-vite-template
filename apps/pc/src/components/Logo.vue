<script lang='ts' setup>
const router = useRouter()

function handleClickLogo() {
  router.push('/')
}
</script>

<template>
  <div class="h-[var(--header-height)] flex cursor-pointer items-center" @click="handleClickLogo">
    <div class="i-carbon-campsite" />
  </div>
</template>
