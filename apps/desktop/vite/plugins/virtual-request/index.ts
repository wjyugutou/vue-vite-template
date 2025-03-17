import fs from 'node:fs'
import path from 'node:path'

export default function virtualRequest() {
  const virtualModuleId = 'virtual:request-options'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'vite-virtual-request', // 必须的，将会在 warning 和 error 中显示
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const file = fs.readFileSync(path.resolve(__dirname, './options.js'), 'utf-8')

        return file
      }
    },
  }
}
