import type { CustomDirective } from '.'

export const roleAuthDirective: CustomDirective = {
  name: 'hasRole',
  beforeMount(el: HTMLElement, binding: any) {
    const value = binding.value
    const roles = useUserStore().roles
    const super_admin = 'admin'

    if (value && Array.isArray(value) && value.length > 0) {
      const roleFlag = value

      const hasRole = roles.some((role) => {
        return super_admin === role || roleFlag.includes(role)
      })

      if (!hasRole) {
        el.remove()
      }
    }
    else {
      throw new Error(`请设置操作权限标签值`)
    }
  },
}

export const permissionAuthDirective: CustomDirective = {
  name: 'hasPermi',
  beforeMount(el: HTMLElement, binding: any) {
    const value = binding.value
    const permissions = useUserStore().permissions
    const all_permission = '*:*:*'

    if (value && Array.isArray(value) && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some((permission) => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.remove()
      }
    }
    else {
      throw new Error(`请设置操作权限标签值`)
    }
  },
}
