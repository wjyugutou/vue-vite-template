import type { UseQueryOptions } from '@tanstack/vue-query'

type Options = Omit<UseQueryOptions, 'queryKey' | 'queryFn'>

export function usePagination<T extends (pageNum: number, pageSize: number) => Promise<any>>(queryFn: T, options?: Options) {
  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })

  const { data, isLoading, refetch } = useQuery({
    queryFn: () => queryFn(pagination.pageNum, pagination.pageSize),
    queryKey: ['usePagination', pagination],
    ...(options ?? {}),
  })

  watch(pagination, () => {
    refetch()
  })

  function reload() {
    pagination.pageNum = 1
    refetch()
  }

  return {
    data,
    isLoading,
    ...toRefs(pagination),
    search: refetch,
    reload,
  }
}
