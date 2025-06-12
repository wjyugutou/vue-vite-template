import { getListMenuApi } from '@repo/api'
import { generatTreeNode } from '@repo/utils'

export function useMenuTree() {
  const { data: menuList, isLoading, refetch: search } = useQuery({
    queryKey: ['menuList'],
    queryFn: () => getListMenuApi(),
    staleTime: 0,
  })

  const data = computed(() => {
    const _list = (menuList.value || []).map(item => ({
      ...item,
      label: item.menuName,
      value: item.menuId,
    }))

    return generatTreeNode(_list, 'menuId')
  })
  return { data, isLoading, search }
}
