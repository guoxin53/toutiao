import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
Vue.use(VueRouter) // 全局使用

// 实例化
const router = new VueRouter({
  // 匹配路由规则
  routes: [
    // 登录
    {
      path: '/login',
      component: Login
    }
  ]
})
export default router
