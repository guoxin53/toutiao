// 导出一个本地操作用户信息的模块 (设置用户 获取用户 清除用户)
// key的唯一性
const KEY = 'toutiao'
const local = {
  setUser (user) {
    // 存储 setItem(ket,value) key将来获取时候需要使用  value  json字符串格式
    // 值需要JSON字符串   通过JSON.stringify转换成需要的
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    // 存储的是啥  拿出来就是啥 通过唯一性的属性KEY 可以获取到
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
    // clear()清除所有的数据   不建议使用
    // 继续用setItem(KEY,'')  删除
  }
}

export default local
