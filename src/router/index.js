import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import fa from 'element-ui/src/locale/lang/fa'

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
  {
    path: '/scoring',
    component: Layout,
    redirect: '/scoring/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/scoring/index'),
        name: 'ScoringIndex',
        meta: { title: '计分项管理', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  }, {
    path: '/course',
    component: Layout,
    redirect: '/course/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/course/index'),
        name: 'ScoringIndex',
        meta: { title: '课程管理', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  }, {
    path: '/class',
    component: Layout,
    redirect: '/class/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/class/index'),
        name: 'ClassIndex',
        meta: { title: '班级管理', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  }, {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacher/index'),
        name: 'TeacherIndex',
        meta: { title: '教师管理', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  }, {
    path: '/student',
    component: Layout,
    redirect: '/student/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/student/index'),
        name: 'StudentIndex',
        meta: { title: '学生管理', icon: 'skill', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/teacher/course',
    component: Layout,
    redirect: '/teacher/course/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacherManager/course/index'),
        name: 'StudentIndex',
        meta: { title: '我的课程', icon: 'skill', noCache: true, roles: ['teacher'] }
      },
      {
        path: 'ScoreIndex',
        hidden: true,
        component: () => import('@/views/teacherManager/course/score'),
        name: 'StudentIndex',
        meta: { title: '学生成绩', icon: 'skill', noCache: true, roles: ['teacher'] }
      },
      {
        path: 'ScoreLog',
        hidden: true,
        component: () => import('@/views/teacherManager/course/scoreLog'),
        name: 'ScoreLog',
        meta: { title: '成绩日志', icon: 'skill', noCache: true, roles: ['teacher'] }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/teacher/message/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacherManager/message/index'),
        name: 'StudentIndex',
        meta: { title: '留言管理', icon: 'message', noCache: true, roles: ['teacher'] }
      }
    ]
  },
  {
    path: '/studentScore',
    component: Layout,
    redirect: '/student/score/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/studentManager/myscore'),
        name: 'StudentScore',
        meta: { title: '我的成绩', icon: 'skill', noCache: true, roles: ['student'] }
      }
    ]
  },
  {
    path: '/studentMessage',
    component: Layout,
    redirect: '/student/message/index',
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/studentManager/message'),
        name: 'StudentMessage',
        meta: { title: '留言', icon: 'message', noCache: true, roles: ['student'] }
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
