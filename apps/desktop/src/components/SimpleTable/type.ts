export interface Column {
  prop?: string
  label: string
  width?: number | string
  minWidth?: number | string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  fixed?: boolean | 'left' | 'right'
  slot?: string
  render?: (row: any, index: number) => any
  formatter?: (value: any, row: any, index: number) => string
}

export interface Props {
  columns: Column[]
  data: any[]
  height?: string | number
  border?: boolean
  stripe?: boolean
  selection?: boolean
  index?: boolean
  pagination?: boolean
  total?: number
  currentPage?: number
  pageSize?: number
}
