<script lang="ts" setup>
import type { Rules } from 'utils'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { vaildateForm } from 'utils'

const data = {
  email: '1234567890',
  count: 10,
  name: '1234567890',
}

const rules: Rules = {
  email: {
    required: true,
    type: 'email',
    message: '邮箱格式不正确',
  },
  count: {
    required: true,
    min: 11,
    max: 10,
  },
  name: {
    validator: (value) => {
      return value === '1234567890'
    },
    message: '名称格式不正确',
  },
  test: {
    validator(value) {
      return 'test 校验错误'
    },
  },
  async: {
    validator: async (value) => {
      return 'async 校验错误'
    },
  },
}

vaildateForm(data, rules)
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>
