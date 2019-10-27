import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router' // 引入路由模块  会默认去找index.js

import axios from '@/api' // 引入axios    挂载axios   不是基于Vue的插件  所以不能使用use
Vue.prototype.$http = axios

Vue.use(ElementUI) // 全局安装了ElementUI

Vue.config.productionTip = false

// 根实例
new Vue({
  router, // 挂载
  render: h => h(App)
}).$mount('#app')
// main.js 作用 是 入口文件
// 职责1：创建一个根实例
// 职责2. 负责全局范围的依赖导入
