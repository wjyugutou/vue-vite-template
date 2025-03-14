/**
 * 此文件更改后，必须重启项目，否则不会生效
 */

// 必须在项目中也引入一个，否则会样式丢失
import { ElMessage } from 'element-plus'

/**
 * 虚拟请求 options
 * @type {import('api').Options}
 */
const options = {
  baseURL: '',
  timeout: 10000,
  alertErr: (msg) => {
    console.error(msg)
    ElMessage.error(msg)
  },
}

export default options
