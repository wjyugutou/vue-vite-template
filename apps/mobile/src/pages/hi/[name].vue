<route lang="yaml">
{
  name: 'hi-name',
  meta: {
    title: "Name113322"
  }
}
</route>

<script setup lang="ts">
const router = useRouter()
const route = useRoute('hi-name')

const { params, meta } = route

console.log(meta)
</script>

<template>
  <div>
    <p>hi/[name].vue  <span class="mx-2" /> name: {{ params.name }}</p>
    <div class="i-carbon-pedestrian inline-block text-4xl" />
    <p>
      Hi, {{ params.name }}
    </p>
    <p class="text-sm op-50">
      <em>Dynamic route!</em>
    </p>

    <div>
      <button
        class="m-3 mt-8 text-sm btn"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
