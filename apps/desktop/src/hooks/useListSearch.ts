import { usePagination } from 'alova/client'

export function useListSearch<T>(request: any, defaultForm: Record<string, any>) {
  const searchForm = ref<Record<string, any>>(defaultForm)

  const {
    loading,
    data,
    page,
    pageSize,
    total,
    send: search,
  } = usePagination((pageNum, pageSize) => request({ ...searchForm.value, pageNum, pageSize }))

  function handleSearch() {
    console.log('handleSearch')

    page.value = 1
    search()
  }

  function handleReset() {
    searchForm.value = {}
    page.value = 1
    pageSize.value = 10
    total.value = 0
    data.value = []
    handleSearch()
  }

  return {
    searchForm,
    data,
    loading,
    pageNum: page,
    pageSize,
    total,
    handleSearch,
    handleReset,
    resetCache: search,
  }
}
