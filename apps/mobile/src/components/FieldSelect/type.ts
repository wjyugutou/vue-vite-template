import type { FieldProps, PickerProps, PopupProps } from 'vant'

export interface FieldSelectProps {
  fieldOptions: Partial<FieldProps>
  popupOptions?: Partial<PopupProps>
  pickerOptions: Partial<PickerProps>
}
