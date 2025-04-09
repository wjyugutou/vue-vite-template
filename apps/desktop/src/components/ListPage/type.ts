import type { FormItem } from '@/components/SimpleForm/type'
import type { Column } from '@/components/SimpleTable/type'

export interface Props {
  formItems: FormItem[]
  columns: Column[]
  tableData: any[]
  rowKey: string
  loading?: boolean
  selection?: boolean
  total?: number
  index?: boolean
  handleSearch: () => void
  handleReset: () => void
}
