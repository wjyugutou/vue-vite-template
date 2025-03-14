// import type { RouteRecordRawC } from './type'
// import request from 'virtual:request'
import request from '../request'

/**
 * 获取用户路由
 */
export function getUserRoutesApi<T>() {
  // return request.Get<RouteRecordRawC[]>('/user/routes')
  return Promise.resolve({
    code: 200,
    data: [
      {
        meta: {
          // icon: 'lucide:layout-dashboard',
          order: -1,
          title: '概览',
        },
        name: 'Dashboard',
        path: '/dashboard',
        children: [
          {
            name: 'Analytics',
            path: '/analytics',
            meta: {
              affixTab: true,
              // icon: 'lucide:area-chart',
              title: '分析页',
            },
          },
          {
            name: 'Workspace',
            path: '/workspace',
            meta: {
              // icon: 'carbon:workspace',
              title: '工作台',
            },
          },
        ],
      },
      {
        meta: {
          // icon: 'ic:baseline-view-in-ar',
          keepAlive: true,
          order: 1000,
          title: '演示',
        },
        name: 'Demos',
        path: '/demos',
        children: [
          {
            meta: {
              // icon: 'mdi:shield-key-outline',
              title: '前端权限',
            },
            name: 'AccessDemos',
            path: '/demos/access',
            children: [
              {
                name: 'AccessPageControlDemo',
                path: '/demos/access/page-control',
                meta: {
                  // icon: 'mdi:page-previous-outline',
                  title: '页面访问',
                },
              },
              {
                name: 'AccessButtonControlDemo',
                path: '/demos/access/button-control',
                meta: {
                  // icon: 'mdi:button-cursor',
                  title: '按钮控制',
                },
              },
              {
                name: 'AccessMenuVisible403Demo',
                path: '/demos/access/menu-visible-403',
                meta: {
                  authority: [
                    'no-body',
                  ],
                  // icon: 'mdi:button-cursor',
                  menuVisibleWithForbidden: true,
                  title: '菜单可见(403)',
                },
              },
              {
                name: 'AccessSuperVisibleDemo',
                path: '/demos/access/super-visible',
                meta: {
                  authority: [
                    'super',
                  ],
                  // icon: 'mdi:button-cursor',
                  title: 'Super 可见',
                },
              },
              {
                name: 'AccessAdminVisibleDemo',
                path: '/demos/access/admin-visible',
                meta: {
                  authority: [
                    'admin',
                  ],
                  // icon: 'mdi:button-cursor',
                  title: 'Admin 可见',
                },
              },
              {
                name: 'AccessUserVisibleDemo',
                path: '/demos/access/user-visible',
                meta: {
                  authority: [
                    'user',
                  ],
                  // icon: 'mdi:button-cursor',
                  title: 'User 可见',
                },
              },
            ],
          },
          {
            meta: {
              // icon: 'mdi:feature-highlight',
              title: '功能',
            },
            name: 'FeaturesDemos',
            path: '/demos/features',
            children: [
              {
                name: 'LoginExpiredDemo',
                path: '/demos/features/login-expired',
                meta: {
                  // icon: 'mdi:encryption-expiration',
                  title: '登录过期',
                },
              },
              {
                name: 'IconsDemo',
                path: '/demos/features/icons',
                meta: {
                  // icon: 'lucide:annoyed',
                  title: '图标',
                },
              },
              {
                name: 'WatermarkDemo',
                path: '/demos/features/watermark',
                meta: {
                  // icon: 'lucide:tags',
                  title: '水印',
                },
              },
              {
                name: 'FeatureTabsDemo',
                path: '/demos/features/tabs',
                meta: {
                  // icon: 'lucide:app-window',
                  title: '标签页',
                },
              },
              {
                name: 'FeatureTabDetailDemo',
                path: '/demos/features/tabs/detail/:id',
                meta: {
                  activePath: '/demos/features/tabs',
                  hideInMenu: true,
                  maxNumOfOpenTab: 3,
                  title: '标签详情页',
                },
              },
              {
                name: 'HideChildrenInMenuParentDemo',
                path: '/demos/features/hide-menu-children',
                meta: {
                  hideChildrenInMenu: true,
                  // icon: 'ic:round-menu',
                  title: '隐藏子菜单',
                },
                children: [
                  {
                    name: 'HideChildrenInMenuDemo',
                    path: '',
                    meta: {
                      hideInMenu: true,
                      title: '隐藏子菜单',
                    },
                  },
                  {
                    name: 'HideChildrenInMenuChildrenDemo',
                    path: '/demos/features/hide-menu-children/children',
                    meta: {
                      title: '隐藏子菜单',
                    },
                  },
                ],
              },
              {
                name: 'FullScreenDemo',
                path: '/demos/features/full-screen',
                meta: {
                  // icon: 'lucide:fullscreen',
                  title: '全屏',
                },
              },
              {
                name: 'FileDownloadDemo',
                path: '/demos/features/file-download',
                meta: {
                  // icon: 'lucide:hard-drive-download',
                  title: '文件下载',
                },
              },
              {
                name: 'ClipboardDemo',
                path: '/demos/features/clipboard',
                meta: {
                  // icon: 'lucide:copy',
                  title: '剪贴板',
                },
              },
              {
                name: 'MenuQueryDemo',
                path: '/demos/menu-query',
                meta: {
                  // icon: 'lucide:curly-braces',
                  query: {
                    id: 1,
                  },
                  title: '带参菜单',
                },
              },
              {
                name: 'NewWindowDemo',
                path: '/demos/new-window',
                meta: {
                  // icon: 'lucide:app-window',
                  openInNewWindow: true,
                  title: '新窗口打开',
                },
              },
              {
                name: 'VueQueryDemo',
                path: '/demos/features/vue-query',
                meta: {
                  // icon: 'lucide:git-pull-request-arrow',
                  title: 'Tanstack Query',
                },
              },
            ],
          },
          {
            name: 'BreadcrumbDemos',
            path: '/demos/breadcrumb',
            meta: {
              // icon: 'lucide:navigation',
              title: '面包屑导航',
            },
            children: [
              {
                name: 'BreadcrumbLateralDemo',
                path: '/demos/breadcrumb/lateral',
                meta: {
                  // icon: 'lucide:navigation',
                  title: '平级模式',
                },
              },
              {
                name: 'BreadcrumbLateralDetailDemo',
                path: '/demos/breadcrumb/lateral-detail',
                meta: {
                  activePath: '/demos/breadcrumb/lateral',
                  hideInMenu: true,
                  title: '平级模式详情',
                },
              },
              {
                name: 'BreadcrumbLevelDemo',
                path: '/demos/breadcrumb/level',
                meta: {
                  // icon: 'lucide:navigation',
                  title: '层级模式',
                },
                children: [
                  {
                    name: 'BreadcrumbLevelDetailDemo',
                    path: '/demos/breadcrumb/level/detail',
                    meta: {
                      title: '层级模式详情',
                    },
                  },
                ],
              },
            ],
          },
          {
            meta: {
              // icon: 'mdi:lightbulb-error-outline',
              title: '缺省页',
            },
            name: 'FallbackDemos',
            path: '/demos/fallback',
            children: [
              {
                name: 'Fallback403Demo',
                path: '/demos/fallback/403',
                meta: {
                  // icon: 'mdi:do-not-disturb-alt',
                  title: '403',
                },
              },
              {
                name: 'Fallback404Demo',
                path: '/demos/fallback/404',
                meta: {
                  // icon: 'mdi:table-off',
                  title: '404',
                },
              },
              {
                name: 'Fallback500Demo',
                path: '/demos/fallback/500',
                meta: {
                  // icon: 'mdi:server-network-off',
                  title: '500',
                },
              },
              {
                name: 'FallbackOfflineDemo',
                path: '/demos/fallback/offline',
                meta: {
                  // icon: 'mdi:offline',
                  title: '离线页面',
                },
              },
            ],
          },
          {
            meta: {
              badgeType: 'dot',
              badgeVariants: 'destructive',
              // icon: 'lucide:circle-dot',
              title: '菜单徽标',
            },
            name: 'BadgeDemos',
            path: '/demos/badge',
            children: [
              {
                name: 'BadgeDotDemo',
                path: '/demos/badge/dot',
                meta: {
                  badgeType: 'dot',
                  // icon: 'lucide:square-dot',
                  title: '点徽标',
                },
              },
              {
                name: 'BadgeTextDemo',
                path: '/demos/badge/text',
                meta: {
                  badge: '10',
                  // icon: 'lucide:square-dot',
                  title: '文本徽标',
                },
              },
              {
                name: 'BadgeColorDemo',
                path: '/demos/badge/color',
                meta: {
                  badge: 'Hot',
                  badgeVariants: 'destructive',
                  // icon: 'lucide:square-dot',
                  title: '徽标颜色',
                },
              },
            ],
          },
          {
            meta: {
              activeIcon: 'fluent-emoji:radioactive',
              // icon: 'bi:radioactive',
              title: '菜单激活图标',
            },
            name: 'ActiveIconDemos',
            path: '/demos/active-icon',
            children: [
              {
                name: 'ActiveIconDemo',
                path: '/demos/active-icon/children',
                meta: {
                  activeIcon: 'fluent-emoji:radioactive',
                  // icon: 'bi:radioactive',
                  title: '子级激活图标',
                },
              },
            ],
          },
          {
            meta: {
              // icon: 'ic:round-settings-input-composite',
              title: '外部页面',
            },
            name: 'OutsideDemos',
            path: '/demos/outside',
            children: [
              {
                name: 'IframeDemos',
                path: '/demos/outside/iframe',
                meta: {
                  // icon: 'mdi:newspaper-variant-outline',
                  title: '内嵌',
                },
                children: [
                  {
                    name: 'VueDocumentDemo',
                    path: '/demos/outside/iframe/vue-document',
                    meta: {
                      // icon: 'logos:vue',
                      iframeSrc: 'http://localhost/emergency/screen/secure',
                      keepAlive: true,
                      title: '应急大屏',
                    },
                  },
                  {
                    name: 'TailwindcssDemo',
                    path: '/demos/outside/iframe/tailwindcss',
                    meta: {
                      // // icon: 'devicon:tailwindcss',
                      iframeSrc: 'https://tailwindcss.com/',
                      title: 'Tailwindcss',
                    },
                  },
                ],
              },
              {
                name: 'ExternalLinkDemos',
                path: '/demos/outside/external-link',
                meta: {
                  // icon: 'mdi:newspaper-variant-multiple-outline',
                  title: '外链',
                },
                children: [
                  {
                    name: 'ViteDemo',
                    path: '/demos/outside/external-link/vite',
                    meta: {
                      // icon: 'logos:vitejs',
                      link: 'https://vitejs.dev/',
                      title: 'Vite',
                    },
                  },
                  {
                    name: 'VueUseDemo',
                    path: '/demos/outside/external-link/vue-use',
                    meta: {
                      // icon: 'logos:vueuse',
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
              // icon: 'ic:round-menu',
              title: '嵌套菜单',
            },
            name: 'NestedDemos',
            path: '/demos/nested',
            children: [
              {
                name: 'Menu1Demo',
                path: '/demos/nested/menu1',
                meta: {
                  // icon: 'ic:round-menu',
                  keepAlive: true,
                  title: '菜单 1',
                },
              },
              {
                name: 'Menu2Demo',
                path: '/demos/nested/menu2',
                meta: {
                  // icon: 'ic:round-menu',
                  keepAlive: true,
                  title: '菜单 2',
                },
                children: [
                  {
                    name: 'Menu21Demo',
                    path: '/demos/nested/menu2/menu2-1',
                    meta: {
                      // icon: 'ic:round-menu',
                      keepAlive: true,
                      title: '菜单 2-1',
                    },
                  },
                ],
              },
              {
                name: 'Menu3Demo',
                path: '/demos/nested/menu3',
                meta: {
                  // icon: 'ic:round-menu',
                  title: '菜单 3',
                },
                children: [
                  {
                    name: 'Menu31Demo',
                    path: 'menu3-1',
                    meta: {
                      // icon: 'ic:round-menu',
                      keepAlive: true,
                      title: '菜单 3-1',
                    },
                  },
                  {
                    name: 'Menu32Demo',
                    path: 'menu3-2',
                    meta: {
                      // icon: 'ic:round-menu',
                      title: '菜单 3-2',
                    },
                    children: [
                      {
                        name: 'Menu321Demo',
                        path: '/demos/nested/menu3/menu3-2/menu3-2-1',
                        meta: {
                          // icon: 'ic:round-menu',
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
        meta: {
          // icon: 'ion:layers-outline',
          keepAlive: true,
          order: 1000,
          title: '示例',
        },
        name: 'Examples',
        path: '/examples',
        children: [
          {
            name: 'FormExample',
            path: '/examples/form',
            meta: {
              // icon: 'mdi:form-select',
              title: '表单',
            },
            children: [
              {
                name: 'FormBasicExample',
                path: '/examples/form/basic',
                meta: {
                  title: '基础表单',
                },
              },
              {
                name: 'FormQueryExample',
                path: '/examples/form/query',
                meta: {
                  title: '查询表单',
                },
              },
              {
                name: 'FormRulesExample',
                path: '/examples/form/rules',
                meta: {
                  title: '表单校验',
                },
              },
              {
                name: 'FormDynamicExample',
                path: '/examples/form/dynamic',
                meta: {
                  title: '动态表单',
                },
              },
              {
                name: 'FormLayoutExample',
                path: '/examples/form/custom-layout',
                meta: {
                  title: '自定义布局',
                },
              },
              {
                name: 'FormCustomExample',
                path: '/examples/form/custom',
                meta: {
                  title: '自定义组件',
                },
              },
              {
                name: 'FormApiExample',
                path: '/examples/form/api',
                meta: {
                  title: 'Api',
                },
              },
              {
                name: 'FormMergeExample',
                path: '/examples/form/merge',
                meta: {
                  title: '合并表单',
                },
              },
            ],
          },
          {
            name: 'VxeTableExample',
            path: '/examples/vxe-table',
            meta: {
              // icon: 'lucide:table',
              title: 'Vxe 表格',
            },
            children: [
              {
                name: 'VxeTableBasicExample',
                path: '/examples/vxe-table/basic',
                meta: {
                  title: '基础表格',
                },
              },
              {
                name: 'VxeTableRemoteExample',
                path: '/examples/vxe-table/remote',
                meta: {
                  title: '远程加载',
                },
              },
              {
                name: 'VxeTableTreeExample',
                path: '/examples/vxe-table/tree',
                meta: {
                  title: '树形表格',
                },
              },
              {
                name: 'VxeTableFixedExample',
                path: '/examples/vxe-table/fixed',
                meta: {
                  title: '固定表头/列',
                },
              },
              {
                name: 'VxeTableCustomCellExample',
                path: '/examples/vxe-table/custom-cell',
                meta: {
                  title: '自定义单元格',
                },
              },
              {
                name: 'VxeTableFormExample',
                path: '/examples/vxe-table/form',
                meta: {
                  title: '搜索表单',
                },
              },
              {
                name: 'VxeTableEditCellExample',
                path: '/examples/vxe-table/edit-cell',
                meta: {
                  title: '单元格编辑',
                },
              },
              {
                name: 'VxeTableEditRowExample',
                path: '/examples/vxe-table/edit-row',
                meta: {
                  title: '行编辑',
                },
              },
              {
                name: 'VxeTableVirtualExample',
                path: '/examples/vxe-table/virtual',
                meta: {
                  title: '虚拟滚动',
                },
              },
            ],
          },
          {
            name: 'CaptchaExample',
            path: '/examples/captcha',
            meta: {
              // icon: 'logos:recaptcha',
              title: '验证码',
            },
            children: [
              {
                name: 'DragVerifyExample',
                path: '/examples/captcha/slider',
                meta: {
                  title: '滑块验证',
                },
              },
              {
                name: 'RotateVerifyExample',
                path: '/examples/captcha/slider-rotate',
                meta: {
                  title: '旋转验证',
                },
              },
              {
                name: 'CaptchaPointSelectionExample',
                path: '/examples/captcha/point-selection',
                meta: {
                  title: '点选验证',
                },
              },
            ],
          },
          {
            name: 'ModalExample',
            path: '/examples/modal',
            meta: {
              // icon: 'system-uicons:window-content',
              title: '弹窗',
            },
          },
          {
            name: 'DrawerExample',
            path: '/examples/drawer',
            meta: {
              // icon: 'iconoir:drawer',
              title: '抽屉',
            },
          },
          {
            name: 'EllipsisExample',
            path: '/examples/ellipsis',
            meta: {
              // icon: 'ion:ellipsis-horizontal',
              title: '文本省略',
            },
          },
          {
            name: 'VueResizeDemo',
            path: '/demos/resize/basic',
            meta: {
              // icon: 'material-symbols:resize',
              title: '拖动调整',
            },
          },
          {
            name: 'ColPageDemo',
            path: '/examples/layout/col-page',
            meta: {
              badge: 'Alpha',
              badgeVariants: 'destructive',
              // icon: 'material-symbols:horizontal-distribute',
              title: '双列布局',
            },
          },
          {
            name: 'TippyDemo',
            path: '/examples/tippy',
            meta: {
              // icon: 'mdi:message-settings-outline',
              title: 'Tippy',
            },
          },
          {
            name: 'JsonViewer',
            path: '/examples/json-viewer',
            meta: {
              // icon: 'tabler:json',
              title: 'JsonViewer',
            },
          },
          {
            name: 'Motion',
            path: '/examples/motion',
            meta: {
              // icon: 'mdi:animation-play',
              title: 'Motion',
            },
          },
          {
            name: 'CountTo',
            path: '/examples/count-to',
            meta: {
              // icon: 'mdi:animation-play',
              title: 'CountTo',
            },
          },
          {
            name: 'Loading',
            path: '/examples/loading',
            meta: {
              // icon: 'mdi:circle-double',
              title: 'Loading',
            },
          },
          {
            name: 'ButtonGroup',
            path: '/examples/button-group',
            meta: {
              // icon: 'mdi:check-circle',
              title: '按钮组',
            },
          },
        ],
      },
      {
        meta: {
          badgeType: 'dot',
          // icon: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp',
          order: 9998,
          title: '项目',
        },
        name: 'VbenProject',
        path: '/vben-admin',
        children: [
          {
            name: 'VbenDocument',
            path: '/vben-admin/document',
            meta: {
              // icon: 'lucide:book-open-text',
              link: 'https://doc.vben.pro',
              title: '文档',
            },
          },
          {
            name: 'VbenGithub',
            path: '/vben-admin/github',
            meta: {
              // icon: 'mdi:github',
              link: 'https://github.com/vbenjs/vue-vben-admin',
              title: 'Github',
            },
          },
          {
            name: 'VbenAntdv',
            path: '/vben-admin/antdv',
            meta: {
              badgeType: 'dot',
              // icon: {
              //   name: 'Icon-svg:antdv-logo',
              // },
              link: 'https://ant.vben.pro',
              title: 'Ant Design Vue 版本',
            },
          },
          {
            name: 'VbenNaive',
            path: '/vben-admin/naive',
            meta: {
              badgeType: 'dot',
              // icon: 'logos:naiveui',
              link: 'https://naive.vben.pro',
              title: 'Naive UI 版本',
            },
          },
          {
            name: 'VbenElementPlus',
            path: '/vben-admin/ele',
            meta: {
              badgeType: 'dot',
              // icon: 'logos:element',
              link: 'https://ele.vben.pro',
              title: 'Element Plus 版本',
            },
          },
        ],
      },
      {
        meta: {
          // icon: 'lucide:copyright',
          order: 9999,
          title: '关于',
        },
        name: 'VbenAbout',
        path: '/vben-admin/about',
      },
    ] as T[],
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request.Get('/user/info', {
    params: {},
  })
}
