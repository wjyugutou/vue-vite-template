<script lang='ts' setup>
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
}
</script>

<template>
  <ElPopover width="auto">
    <template #reference>
      <ElAvatar src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp" />
    </template>
    <div class="w-64">
      <div class="flex gap-4 b-b b-b-[var(--el-border-color)] pb-2">
        <ElAvatar src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp" />
        <div class="flex flex-col justify-around">
          <div>name</div>
          <div>user description</div>
        </div>
      </div>
      <div class="m-t-1 flex cursor-pointer items-center b-rounded-1 p-2 px-2 hover:bg-gray-400/30" @click="handleLogout">退出登录</div>
    </div>
  </ElPopover>
</template>
