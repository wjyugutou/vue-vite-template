import type { FormInstance } from 'element-plus'

export type SimpleFormContext = Ref<FormInstance | null>|undefined

export const SIMPLE_FORM_NAME = Symbol('simpleForm')

export function useForm(formName?: string) {
  const formInstance = ref<FormInstance | null>(null)

  provide<SimpleFormContext>(formName || SIMPLE_FORM_NAME, formInstance)

  return formInstance
}
