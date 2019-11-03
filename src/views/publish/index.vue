<template>
  <div class='container-publish'>
    <!-- 卡片 -->
    <el-card>
      <!-- 头部容器 -->
      <div slot='header'>
        <!-- 面包屑组件 -->
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单组件 -->
      <el-form
        label-width="80px"
        size="small"
      >
        <!-- 标题 -->
        <el-form-item label="标题  :">
          <!-- 输入框 -->
          <el-input style="width:400px"></el-input>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="内容  :">

          <!-- 中部插件编辑 -->

        </el-form-item>
        <el-form-item label="封面  :">
          <el-radio-group v-model="reqParams.integer">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 上传图片 -->
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          style=" float: left; margin-left : 80px"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <img
            src="../../assets/default.png"
            style="width:200px;"
          >
        </el-upload>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        integer: 1
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
