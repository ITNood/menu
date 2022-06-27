import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      //出现在导航栏的菜单
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
      },
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
router.beforeEach((to, from, next) => {
  //判断路由是否是/login，如果是，直接调用next方法
  if (to.path == "/login") {
    next();
  } else {
    const info = JSON.parse(localStorage.getItem('userInfo'))
    //否则判断用户是否已经登录,注意这里是字符串判断
    if (info) {
      next();
    }
    //如果用户访问的是受保护的资源，且没有登录，则跳转到登录页面
    //并将当前路由的完整路径作为查询参数传给Login组件，以便登录成功后返回
    //先前的页面
    else {
      next({
        path: "login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
})
//重复点击路由解决报错
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
