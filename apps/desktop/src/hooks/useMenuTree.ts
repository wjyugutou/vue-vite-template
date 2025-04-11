import { getListMenuApi } from '@repo/api'
import { generatTreeNode } from '@repo/utils'
import { useRequest } from 'alova/client'

export function useMenuTree() {
  const { data: menuList, loading, send: search } = useRequest(getListMenuApi, {
    initialData: [],
    force: true,
  })
  const data = computed(() => {
    const _list = menuList.value.map(item => ({
      ...item,
      label: item.menuName,
      value: item.menuId,
    }))
    return generatTreeNode(_list, 'menuId')
  })
  return { data, loading, search }
}
