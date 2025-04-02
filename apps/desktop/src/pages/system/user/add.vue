<script setup lang="ts">
defineOptions({ name: 'UserEdit' })

const visible = defineModel<boolean>('visible', { required: true })
</script>

<template>
  <AModal v-model:open="visible">
    <h1>用户add</h1>
  </AModal>
</template>
