import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

interface Options {
  queryFn: QueryFn<any>
}

type QueryFn<T> = (...args: any) => Promise<T>

export function usePagination<T extends { total: number, rows: any[] }>(options: Options) {
  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
  })

  const path = useRoute().path

  const { data, isLoading, refetch } = useQuery({
    placeholderData: keepPreviousData,
    enabled: true,
    queryFn: () => options.queryFn(pagination.pageNum, pagination.pageSize),
    queryKey: [`${path}-usePagination`, pagination],
    staleTime: 1000 * 5,
  })
  refetch()

  function reload() {
    pagination.pageNum = 1
    refetch()
  }

  return {
    data: data.value ? data : { total: 0, rows: [] },
    loading: isLoading,
    ...toRefs(pagination),
    search: refetch,
    reload,
  }
}
