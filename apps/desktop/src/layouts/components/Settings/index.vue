<script lang="ts" setup>
defineOptions({ name: 'Settings' })

const { settings } = storeToRefs(useAppStore())
</script>

<template>
  <ElDrawer v-model="settings.settingsDrawerVisible" title="设置" append-to-body>
    <template #default>
      <ElForm label-position="top">
        <ElFormItem label="布局模式">
          <ElRadioGroup v-model="settings.layoutMode">
            <ElRadio value="side">
              <span>侧边栏</span>
            </ElRadio>
            <ElRadio value="vertical">
              <span>垂直</span>
            </ElRadio>
          </ElRadioGroup>
        </ElFormItem>
      </ElForm>
    </template>
  </ElDrawer>
</template>
