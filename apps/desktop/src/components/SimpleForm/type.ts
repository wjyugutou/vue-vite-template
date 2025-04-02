import type { FormProps } from 'ant-design-vue'
import type { validateInfos } from 'ant-design-vue/es/form/useForm'

export type FormRules = Record<string, any[]>

export interface FormItem {
  type?: 'input' | 'textarea' | 'select' | 'date' | 'rangedate' | 'time' | 'radio'
  span?: number
  labelCol?: FormProps['labelCol']
  wrapperCol?: FormProps['wrapperCol']
  label?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  rules?: FormRules
  options?: Array<{ label: string, value: any }>
  dateType?: string
  slot?: string
  other?: Record<string, any>
}

export interface Props {
  layout?: FormProps['layout']
  validateInfos?: validateInfos
  formItems: FormItem[]
  gutter?: number
  defaultValue?: Record<string, any>
  disabled?: boolean
  formData?: Record<string, any>
  /** default: 4 */
  labelCol?: FormProps['labelCol']
  /** default: 20 */
  wrapperCol?: FormProps['wrapperCol']
  /** default: true */
  colon?: boolean
}
