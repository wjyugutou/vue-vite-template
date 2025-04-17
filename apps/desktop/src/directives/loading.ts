import type { CustomDirective } from '.'

export const loadingDirective: CustomDirective = {
  name: 'loading',
  created(el: HTMLElement, binding: any, vnode: any) {
    const value = binding.value
    console.log(el)

    console.log(value)

    console.log(vnode)
  },
}
