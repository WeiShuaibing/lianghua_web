import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
// 物业人员管理
  {
    path: '/admin',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '/index',
        component: () => import('@/views/admin/index'),
        name: 'AdminIndex',
        meta: { title: '物业人员管理', noCache: true, icon: 'wuye' }
      }
    ]
  },
  // 楼房管理
  {
    path: '/building',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '/building',
        component: () => import('@/views/building/index'),
        name: 'BuildingIndex',
        meta: { title: '楼房管理', noCache: true, icon: 'building' }
      }
    ]
  },
  // 用户管理
  {
    path: '/webuser',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '/webuser',
        component: () => import('@/views/webuser/index'),
        name: 'WebuserIndex',
        meta: { title: '用户管理', noCache: true, icon: 'people' }
      }
    ]
  },
  // 停车位管理
  {
    path: '/carposition',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '/carposition',
        component: () => import('@/views/carposition/index'),
        name: 'CarPositionIndex',
        meta: { title: '停车位', noCache: true, icon: 'car' }
      }
    ]
  },
  // 物业缴费
  {
    path: '/pay',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '/pay',
        component: () => import('@/views/pay/index'),
        name: 'PayIndex',
        meta: { title: '物业缴费', noCache: true, icon: 'pay' }
      }
    ]
  },
  // 公告管理
  {
    path: '/gonggao',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '/gonggao',
        component: () => import('@/views/gonggao/index'),
        name: 'GongGaoIndex',
        meta: { title: '公告管理', noCache: true, icon: 'gonggao' }
      }
    ]
  },
  // 投诉建议管理
  {
    path: '/suggestion',
    component: Layout,
    hidden: false,
    meta: {
      title: '投诉建议',
      icon: 'suggestion',
      roles: ['admin']
    },
    children: [
      {
        path: '/suggestionIndex',
        component: () => import('@/views/suggestion/index'),
        name: 'SuggestionIndex',
        meta: { title: '投诉建议', noCache: true, icon: 'suggestion' }
      }
    ]
  },
  // 投诉建议管理
  {
    path: '/suggestion_edit',
    component: Layout,
    meta: {
      title: '投诉建议',
      icon: 'suggestion',
      roles: ['editor']
    },
    children: [
      {
        path: 'suggestionEdit',
        component: () => import('@/views/suggestion_edit/index'),
        name: 'SuggestionEditIndex',
        meta: {
          title: '投诉建议',
          icon: 'suggestion',
          noCache: true,
          roles: ['editor'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 报修
  {
    path: '/repair',
    component: Layout,
    hidden: false,
    meta: {
      title: '报修管理',
      icon: 'suggestion',
      roles: ['admin']
    },
    children: [
      {
        path: '/repair',
        component: () => import('@/views/repair/index'),
        name: 'RepairIndex',
        meta: { title: '报修管理', noCache: true, icon: 'repair' }
      }
    ]
  },
  {
    path: '/repair_edit',
    component: Layout,
    meta: {
      title: '报修管理',
      icon: 'suggestion',
      roles: ['editor']
    },
    children: [
      {
        path: 'repairEdit',
        component: () => import('@/views/repair_edit/index'),
        name: 'repairEditIndex',
        meta: {
          title: '报修管理',
          icon: 'repair',
          noCache: true,
          roles: ['editor'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '/system',
        component: () => import('@/views/system/index'),
        name: 'SystemIndex',
        meta: { title: '系统管理', noCache: true, icon: 'system' }
      }
    ]
  },
  // 系统管理
  {
    path: '/log',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '/log',
        component: () => import('@/views/log/index'),
        name: 'LogIndex',
        meta: { title: '操作日志', noCache: true, icon: 'log' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
