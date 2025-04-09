import type { FormRules } from 'element-plus'

export interface FormItem {
  type?: 'input' | 'select' | 'date' | 'radio' | 'time'
  span?: number
  label?: string
  prop?: string
  placeholder?: string
  disabled?: boolean
  rules?: any[]
  options?: Array<{ label: string, value: any }>
  dateType?: string
  slot?: string
  other?: any
}

export interface Props {
  name?: string
  formItems: FormItem[]
  gutter?: number
  labelWidth?: string | number
  defaultValue?: Record<string, any>
  disabled?: boolean
  labelPosition?: 'top' | 'left'
  formData?: Record<string, any>
  rules?: FormRules
  /** 是否显示冒号 */
  colon?: boolean
}
