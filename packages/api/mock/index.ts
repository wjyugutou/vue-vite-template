import request from '../request'

/**
 * 测试
 */
export function testApi() {
  return request.Get('http://127.0.0.1:4523/m1/4595320-4244870-default/api/test/1', {
    params: {
      name: 'test',
    },

  })
}
