<template>
  <div class='container'>B
    <button @click="fn">B2A</button>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      msg: 'B组件的数据'
    }
  },
  wethods: {
    fn () {
      eventBus.$emit('B2A', this.msg)
    }
  }
}
</script>

<style scoped lang='less'></style>
