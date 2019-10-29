// 导出一个配置好的axios提供给main挂载
import axios from 'axios'
import local from '@/utils/local'
import router from '@/router' // router实例

// 对axios进行配置
// baseURL   作用：设置基准地址(前面一段相同的地址)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做的事情
  // 1.获取token
  const user = local.getUser() || {}
  // 2.头部设置token
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 响应成功直接返回
  return response
}, function (error) {
  // 对响应失败时做点什么
  // 可以通过error.response 获取响应对象 响应对象里有对应的status状态码
  if (error.response.status === 401) {
    // 当响应失败401时 跳转到login登录组件   根据路由跳转
    return router.push('/login')
  }
  return Promise.reject(error) // 必须要return一个错误对象
})
export default axios
