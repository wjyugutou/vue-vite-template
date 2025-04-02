import type { TablePaginationConfig, TableProps } from 'ant-design-vue'
import type { FilterValue, SorterResult } from 'ant-design-vue/es/table/interface'

export interface Props {
  columns: TableProps['columns']
  dataSource?: any[]
  rowSelection?: true | TableProps['rowSelection']
  pagination?: Omit<TableProps['pagination'], 'total' | 'current' | 'pageSize'>
  loading?: boolean
  total?: number
  current?: number
  pageSize?: number
}

export interface ChangeEventParams {
  pagination: Pick<TablePaginationConfig, 'current' | 'pageSize'>
  filters: Record<string, FilterValue | null>
  sorter: SorterResult<any> | SorterResult<any>[]
}
