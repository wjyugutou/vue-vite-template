<script lang="ts" setup>
defineOptions({ name: 'Settings' })

const { settings } = storeToRefs(useAppStore())
</script>

<template>
  <ADrawer v-model:open="settings.settingsDrawerVisible" title="设置" append-to-body>
    <template #default>
      <AForm :label-col="{ span: 24 }">
        <AFormItem label="布局模式">
          <ARadioGroup v-model:value="settings.layoutMode">
            <ARadio value="side">
              <span>侧边栏</span>
            </ARadio>
            <ARadio value="vertical">
              <span>垂直</span>
            </ARadio>
          </ARadioGroup>
        </AFormItem>

        <AFormItem label="标签栏">
          <ARadioGroup v-model:value="settings.showTagView">
            <ARadio :value="true">
              <span>显示</span>
            </ARadio>
            <ARadio :value="false">
              <span>隐藏</span>
            </ARadio>
          </ARadioGroup>
        </AFormItem>
      </AForm>
    </template>
  </ADrawer>
</template>
