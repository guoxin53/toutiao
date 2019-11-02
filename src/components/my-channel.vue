<template>
  <!-- @change="fn" 频道改变的element-ui提供的监听事件的事件 -->
  <el-select
    :value="value"
    placeholder="请选择"
    clearable
    @change="fn"
  >
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // 接收父组件的数据   绑定 :value="value"  看到父组件的数据
  props: ['value'],
  data () {
    return {
      // value : null
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取频道选项数据
    async getChannelOptions () {
      //   获取数据 发送请求
      const { data: { data } } = await this.$http.get('channels')
      // 把数据赋值channelOptions
      this.channelOptions = data.channels
    },
    // 频道改变时函数   接收改变的值
    fn (channelId) {
      // 清空值是 ''  改变成null
      if (channelId === '') channelId = null
      // 把ID提交给父组件  自定义事件名v-model
      this.$emit('input', channelId)
    }
  }
}
</script>

<style scoped lang='less'></style>
