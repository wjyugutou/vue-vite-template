export interface FormItem {
  type?: 'input' | 'select' | 'date'
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
  formItems: FormItem[]
  gutter?: number
  labelWidth?: string | number
  defaultValue?: Record<string, any>
  disabled?: boolean
  labelPosition?: 'top' | 'left'
  formData?: Record<string, any>
}
