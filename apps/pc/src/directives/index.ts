import type { Directive, Plugin } from 'vue'
import auth from './auth'

export type CustomDirective = Directive & {
  name: string
}

const directives: CustomDirective[] = [auth]

const directivePlugins: Plugin = {
  install(app) {
    directives.forEach(d => app.directive(d.name, d))
  },
}

export default directivePlugins
