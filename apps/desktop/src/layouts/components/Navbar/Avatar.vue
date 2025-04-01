<script lang='ts' setup>
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
}
</script>

<template>
  <APopover width="auto">
    <AAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    <template #content>
      <div class="w-64">
        <div class="flex gap-4 b-b b-b-[var(--colorBorder)] pb-2">
          <AAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <div class="flex flex-col justify-around">
            <div>name</div>
            <div>user description</div>
          </div>
        </div>
        <div class="m-t-1 flex cursor-pointer items-center b-rounded-1 p-2 px-2 hover:bg-gray-400/30" @click="handleLogout">退出登录</div>
      </div>
    </template>
  </APopover>
</template>
