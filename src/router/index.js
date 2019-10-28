import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import NotFound from '@/views/404'

Vue.use(VueRouter) // 全局使用
/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
// 实例化
const router = new VueRouter({
  // 匹配路由规则
  routes: [
    // 登录
    {
      path: '/login',
      component: Login
    },
    // 首页
    {
      path: '/',
      component: home,
      children: [{
        // 欢迎
        path: '/',
        component: welcome
      }]
    },
    // 404处理 匹配不到路由时
    {
      path: '*',
      component: NotFound
    }
  ]
})

export default router
