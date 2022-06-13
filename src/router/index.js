import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [//出现在导航栏的菜单
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home/home.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-s-home'
        }
      },

      {
        path: '',
        component: () => import('../views/Flow/index.vue'),
        meta: {
          title: '流程',
          icon: 'el-icon-s-operation'
        },
        children: [
          {
            path: '/flow',
            name: 'flow',
            component: () => import('../views/Flow/flow.vue'),
            meta: {
              title: '大流程',
            }
          },
          {
            path: '/smallFlow',
            name: 'smallFlow',
            component: () => import('../views/Flow/smallFlow.vue'),
            meta: {
              title: '小流程',
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
