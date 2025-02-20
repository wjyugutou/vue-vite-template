import type { Directive, Plugin } from 'vue'
import loading from './loading'

export type CustomDirective = Directive & {
  name: string
}

const directives: CustomDirective[] = [loading]

const directivePlugins: Plugin = {
  install(app) {
    directives.forEach(d => app.directive(d.name, d))
  },
}

export default directivePlugins
