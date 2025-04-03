import { message } from 'ant-design-vue'

const [messageApi, contextHolder] = message.useMessage()

export function useMessage() {
  const { success, error, warning, info } = messageApi

  return {
    ContextHolder: contextHolder,
    success,
    error,
    warning,
    info,
  }
}
