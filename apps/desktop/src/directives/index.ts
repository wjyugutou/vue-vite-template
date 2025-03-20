import type { Directive, Plugin } from 'vue'
import { permissionAuthDirective, roleAuthDirective } from './auth'

export type CustomDirective = Directive & {
  name: string
}

const directives: CustomDirective[] = [permissionAuthDirective, roleAuthDirective]

const directivePlugins: Plugin = {
  install(app) {
    directives.forEach(d => app.directive(d.name, d))
  },
}

export default directivePlugins
