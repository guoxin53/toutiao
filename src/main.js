import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router' // 引入路由模块  会默认去找index.js

import axios from '@/api' // 引入axios    挂载axios   不是基于Vue的插件  所以不能使用use

// import MyBread from '@/components/my-bread' // 我的面包屑组件
// Vue.component('my-bread', MyBread) // 注册全局用component面包屑组件   局部是components
import plugin from '@/components' // 导入插件
Vue.use(plugin) // 全局注册插件

Vue.prototype.$http = axios // 把axios添加到vue的prototype原型对象上

Vue.use(ElementUI) // use是使用 括号里是插件内所有组件的全局注册  在全局安装了ElementUI

Vue.config.productionTip = false // 阻止启动生产消息，常用作指令

// 根实例
new Vue({
  router, // 挂载
  render: h => h(App)
}).$mount('#app')
// main.js 作用 是 入口文件
// 职责1：创建一个根实例
// 职责2. 负责全局范围的依赖导入
