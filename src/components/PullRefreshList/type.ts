import type { ListDirection, PickerColumn, PickerOption } from 'vant'

export interface PullRefreshListProps<T> {
  dataFetch: (params: Record<string, any>) => Promise<PagenationResponse<T>>
  /* 禁止下拉刷新 */
  disabledPullRefresh?: boolean
  /* 禁止触底加载 */
  disabledDownFetch?: boolean
  // list props
  offset?: string | number
  direction?: ListDirection
  immediateCheck?: boolean
  finishedText?: string
  errorListText?: string
  loadingText?: string
  scroller?: Element

  // 下拉刷新 props
  pullingText?: string
  loosingText?: string
  errorPullRefreshText?: string
  successText?: string
  headHeight?: string | number
  successDuration?: string | number
  animationDuration?: string | number

  /** 每页显示条数 */
  limit?: number

  /** 搜索表单 */
  searchOptions?: {
    prop: string
    label?: string
    placeholder?: string
  }

  /**
   * picker props
   */
  pickerOptions?: {
    prop: string
    label?: string
    columns: (PickerColumn | PickerOption)[]
  }

  /**
   * dropdown props
   * @field prop dropdown-item 的 v-model 属性
   * @field title dropdown-item 的 title 属性
   */
  dropdownOptions?: {
    prop: string
    title: string
    options: { text: string, value: string | number }[]
  }[]
}

export interface PullRefreshListSlots<T> {
  header: () => any
  search: () => any
  picker: () => any
  dropdown: () => any
  pulling: (props: { distance: number }) => any
  loosing: (props: { distance: number }) => any
  default: (props: { data: T, index: number }) => any
}
