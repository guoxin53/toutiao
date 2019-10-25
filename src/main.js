import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI) // 全局安装了ElementUI

Vue.config.productionTip = false

// 根实例
new Vue({
  render: h => h(App)
}).$mount('#app')
// main.js 作用 是 入口文件
// 职责1：创建一个根实例
// 职责2. 负责全局范围的依赖导入
