import type { Directive, Plugin } from 'vue'
import { permissionAuthDirective, roleAuthDirective } from './auth'
import { loadingDirective } from './loading'

export type CustomDirective = Directive & {
  name: string
}

const directives: CustomDirective[] = [permissionAuthDirective, roleAuthDirective, loadingDirective]

const directivePlugins: Plugin = {
  install(app) {
    directives.forEach(d => app.directive(d.name, d))
  },
}

export default directivePlugins
