import Vue from 'vue' // vue框架
import VueRouter from 'vue-router' // 路由插件
import Login from '@/views/login' // 登录
import Home from '@/views/home' // 首页
import Welcome from '@/views/welcome' // 欢迎
import NotFound from '@/views/404' // 404
import local from '@/utils/local' // 操本地用户信息的模块工具 根据本存储的信息
import Article from '@/views/article' // 内容

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
      component: Home,
      // 二级路由
      children: [
        {
          // 欢迎
          path: '/',
          component: Welcome
        },
        // 内容管理
        { path: '/article', component: Article }
      ]
    },
    // 404处理 匹配不到路由时
    {
      path: '*',
      component: NotFound
    }
  ]
})
// 路由导航守卫 (前置导航守卫 访问权限)
router.beforeEach((to, from, next) => {
  // to 跳转路由对象
  // from 从哪里跳过来的路由对象
  // next() 放行 next('/login') 拦截到登录
  // 如果你访问的不是登录面，且没有登录，跳转到登录页面。
  const user = local.getUser() // 拿本地存储的用户的信息
  // 如果path 不等于'/login'  且user不存在  直接跳转'/login'
  if (to.path !== '/login' && !user) return next('/login')
  next() // 否则其他情况下放行
})
export default router
