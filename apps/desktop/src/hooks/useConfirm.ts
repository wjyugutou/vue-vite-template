import { ElMessageBox } from 'element-plus'

export function useConfirm(message: string, title = '系统提示') {
  return ElMessageBox.confirm(message, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
}
