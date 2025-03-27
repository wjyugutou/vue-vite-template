import type { User } from './type'
import request from '../../../request'

// 查询用户列表
export function getListUserApi(query: any) {
  return Promise.resolve({
    data: [
      {
        id: 1,
        username: '张三',
        email: 'zhangsan@example.com',
        phone: '12345678901',
        status: '1',
      },
      {
        id: 2,
        username: '李四',
        email: 'lisi@example.com',
        phone: '12345678902',
        status: '0',
      },
      {
        id: 3,
        username: '王五',
        email: 'wangwu@example.com',
        phone: '12345678903',
        status: '1',
      },
      {
        id: 4,
        username: '赵六',
        email: 'zhaoliu@example.com',
        phone: '12345678904',
        status: '0',
      },
      {
        id: 5,
        username: '孙七',
        email: 'sunqi@example.com',
        phone: '12345678905',
        status: '1',
      },
      {
        id: 6,
        username: '周八',
        email: 'zhouba@example.com',
        phone: '12345678906',
        status: '0',
      },
      {
        id: 7,
        username: '吴九',
        email: 'wujiu@example.com',
        phone: '12345678907',
        status: '1',
      },
      {
        id: 8,
        username: '郑十',
        email: 'zhengshi@example.com',
        phone: '12345678908',
        status: '0',
      },
      {
        id: 9,
        username: '钱十一',
        email: 'qianshi@example.com',
        phone: '12345678909',
        status: '1',
      },
      {
        id: 10,
        username: '孙十二',
        email: 'sunshi@example.com',
        phone: '12345678910',
        status: '0',
      },
      {
        id: 11,
        username: '周十三',
        email: 'zhoushi@example.com',
        phone: '12345678911',
        status: '1',
      },
      {
        id: 12,
        username: '钱十四',
        email: 'qianshi@example.com',
        phone: '12345678912',
        status: '0',
      },
    ],
    total: 2,
  })

  return request.Get<{
    data: User[]
    total: number
  }>('/system/user/list', {
    params: query,
  })
}

// 查询用户详细
export function getUser(userId: string | number) {
  return request.Get(`/system/user/${userId}`)
}

// 新增用户
export function addUser(data: any) {
  return request.Post('/system/user', data)
}

// 修改用户
export function updateUser(data: any) {
  return request.Put('/system/user', data)
}

// 删除用户
export function delUser(userId: string | number) {
  return request.Delete(`/system/user/${userId}`)
}

// 用户密码重置
export function resetUserPwd(userId: string, password: string) {
  const data = {
    userId,
    password,
  }
  return request.Put('/system/user/resetPwd', data)
}

// 用户状态修改
export function changeUserStatus(userId: string | number, status: string) {
  const data = {
    userId,
    status,
  }
  return request.Put('/system/user/changeStatus', data)
}

// 查询用户个人信息
export function getUserProfile() {
  return request.Get('/system/user/profile')
}

// 修改用户个人信息
export function updateUserProfile(data: any) {
  return request.Put('/system/user/profile', data)
}

// 用户密码重置
export function updateUserPwd(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword,
  }
  return request.Put('/system/user/profile/updatePwd', data)
}

// 用户头像上传
export function uploadAvatar(data: any) {
  return request.Post('/system/user/profile/avatar', data)
}

// 查询授权角色
export function getAuthRole(userId: string | number) {
  return request.Get(`/system/user/authRole/${userId}`)
}

// 保存授权角色
export function updateAuthRole(data: any) {
  return request.Put('/system/user/authRole', data)
}

// 查询部门下拉树结构
export function getDeptTreeApi() {
  return request.Get('/system/user/deptTree')
}
