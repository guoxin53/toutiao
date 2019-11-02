// 封装一个插件   注册所有的全局组件
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    // 基于Vue做任何事情(注册全局组件，指令，过滤器，挂载原型函数)
    // Vue.component('my-bread', MyBread)
    Vue.component(MyBread.name, MyBread) // 约定好的组件名字   name属性
    Vue.component(MyChannel.name, MyChannel)
  }
}
