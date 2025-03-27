type Request<T> = (query: any) => Promise<{
  data: T[]
  total: number
}>

export function useListSearch<T>(request: Request<T>, defaultForm: Record<string, any>) {
  const searchForm = ref<Record<string, any>>(defaultForm)

  const loading = ref(false)
  const data = ref<T[]>([])
  const pagination = reactive({
    pageSize: 10,
    pageNum: 1,
    total: 0,
  })

  function search() {
    loading.value = true

    request({
      ...searchForm.value,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
    })
      .then((res) => {
        data.value = res.data
        pagination.total = res.total
      })
      .finally(() => {
        loading.value = false
      })
  }

  function handleSearch() {
    pagination.pageNum = 1
    search()
  }

  function handleReset() {
    searchForm.value = {}
    pagination.pageNum = 1
    pagination.pageSize = 10
    pagination.total = 0
    data.value = []
    handleSearch()
  }

  return {
    searchForm,
    data,
    loading,
    ...toRefs(pagination),
    search,
    handleSearch,
    handleReset,
  }
}
