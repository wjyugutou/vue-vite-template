import type { User } from './type'
import request from '../../../request'

/**
 * 获取用户路由
 */
export function getUserMenuApi<T>() {
  // return request.Get<RouteRecordRawC[]>('/user/routes')
  return Promise.resolve({
    code: 200,
    data: [
      {
        meta: {
          keepAlive: true,
          order: 1000,
          title: '演示',
        },
        name: 'Demos',
        path: '/demos',
        children: [
          {
            meta: {
              title: '缺省页',
            },
            name: 'FallbackDemos',
            path: 'fallback',
            children: [
              {
                name: 'Fallback403Demo',
                path: '403',
                meta: {
                  title: '403',
                },
              },
              {
                name: 'Fallback404Demo',
                path: 'fallback/404',
                meta: {
                  title: '404',
                },
              },
              {
                name: 'Fallback500Demo',
                path: 'fallback/500',
                meta: {
                  title: '500',
                },
              },
              {
                name: 'FallbackOfflineDemo',
                path: 'fallback/offline',
                meta: {
                  title: '离线页面',
                },
              },
            ],
          },
          {
            meta: {
              badgeType: 'dot',
              badgeVariants: 'destructive',
              title: '菜单徽标',
            },
            name: 'BadgeDemos',
            path: 'badge',
            children: [
              {
                name: 'BadgeDotDemo',
                path: 'badge/dot',
                meta: {
                  badgeType: 'dot',
                  title: '点徽标',
                },
              },
              {
                name: 'BadgeTextDemo',
                path: 'badge/text',
                meta: {
                  badge: '10',
                  title: '文本徽标',
                },
              },
              {
                name: 'BadgeColorDemo',
                path: 'badge/color',
                meta: {
                  badge: 'Hot',
                  badgeVariants: 'destructive',
                  title: '徽标颜色',
                },
              },
            ],
          },
          {
            meta: {
              title: '菜单激活图标',
            },
            name: 'ActiveIconDemos',
            path: 'active-icon',
            children: [
              {
                name: 'ActiveIconDemo',
                path: 'active-icon/children',
                meta: {
                  title: '子级激活图标',
                },
              },
            ],
          },
          {
            meta: {
              title: '外部页面',
            },
            name: 'OutsideDemos',
            path: 'outside',
            children: [
              {
                name: 'IframeDemos',
                path: 'outside/iframe',
                meta: {
                  title: '内嵌',
                },
                children: [
                  {
                    name: 'VueDocumentDemo',
                    path: 'outside/iframe/vue-document',
                    meta: {
                      iframeSrc: 'http://localhost/emergency/screen/secure',
                      keepAlive: true,
                      title: '应急大屏',
                    },
                  },
                  {
                    name: 'TailwindcssDemo',
                    path: 'outside/iframe/tailwindcss',
                    meta: {
                      iframeSrc: 'https://tailwindcss.com/',
                      title: 'Tailwindcss',
                    },
                  },
                ],
              },
              {
                name: 'ExternalLinkDemos',
                path: 'outside/external-link',
                meta: {
                  title: '外链',
                },
                children: [
                  {
                    name: 'ViteDemo',
                    path: 'outside/external-link/vite',
                    meta: {
                      link: 'https://vitejs.dev/',
                      title: 'Vite',
                    },
                  },
                  {
                    name: 'VueUseDemo',
                    path: 'outside/external-link/vue-use',
                    meta: {
                      link: 'https://vueuse.org',
                      title: 'VueUse',
                    },
                  },
                ],
              },
            ],
          },
          {
            meta: {
              title: '嵌套菜单',
            },
            name: 'NestedDemos',
            path: 'nested',
            children: [
              {
                name: 'Menu1Demo',
                path: 'nested/menu1',
                meta: {
                  keepAlive: true,
                  title: '菜单 1',
                },
              },
              {
                name: 'Menu2Demo',
                path: 'nested/menu2',
                meta: {
                  keepAlive: true,
                  title: '菜单 2',
                },
                children: [
                  {
                    name: 'Menu21Demo',
                    path: 'nested/menu2/menu2-1',
                    meta: {
                      keepAlive: true,
                      title: '菜单 2-1',
                    },
                  },
                ],
              },
              {
                name: 'Menu3Demo',
                path: 'nested/menu3',
                meta: {
                  title: '菜单 3',
                },
                children: [
                  {
                    name: 'Menu31Demo',
                    path: 'menu3-1',
                    meta: {
                      keepAlive: true,
                      title: '菜单 3-1',
                    },
                  },
                  {
                    name: 'Menu32Demo',
                    path: 'menu3-2',
                    meta: {
                      title: '菜单 3-2',
                    },
                    children: [
                      {
                        name: 'Menu321Demo',
                        path: 'nested/menu3/menu3-2/menu3-2-1',
                        meta: {
                          keepAlive: true,
                          title: '菜单 3-2-1',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'System',
        path: '/system',
        meta: {
          title: '系统管理',
        },
        children: [
          {
            name: 'User',
            path: 'user',
            meta: {
              title: '用户管理',
            },
            component: 'system/user/index',
          },
          {
            name: 'UserAdd',
            path: 'user/add',
            meta: {
              hideInMenu: true,
              title: '新增用户',
              activePath: '/system/user',
            },
            component: 'system/user/add',
          },
          {
            name: 'Role',
            path: 'role',
            component: 'system/role/index',
            meta: {
              title: '角色管理',
            },
          },
          {
            name: 'Menu',
            path: 'menu',
            component: 'system/menu/index',
            meta: {
              title: '菜单管理',
            },
          },
          {
            name: 'Dept',
            path: 'dept',
            component: 'system/dept/index',
            meta: {
              title: '部门管理',
            },
          },
          {
            name: 'Post',
            path: 'post',
            component: 'system/post/index',
            meta: {
              title: '岗位管理',
            },
          },
          {
            name: 'Dict',
            path: 'dict',
            component: 'system/dict/index',
            meta: {
              title: '字典管理',
            },
          },
          {
            name: 'Config',
            path: 'config',
            component: 'system/config/index',
            meta: {
              title: '参数设置',
            },
          },
          {
            name: 'Notice',
            path: 'notice',
            component: 'system/notice/index',
            meta: {
              title: '通知公告',
            },
          },

        ],
      },
    ] as T[],
  })
}

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
