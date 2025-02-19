<script setup lang="ts">
const route = useRoute()

console.log('[404]', route)
</script>

<template>
  <div>
    <p>[...404].vue</p>
    Not Found
    <RouterLink to="/" class="text-blue">
      Home
    </RouterLink>
  </div>
</template>
