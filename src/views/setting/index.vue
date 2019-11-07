<template>
  <div class='container-setting'>
    <!-- 卡片组件 -->
    <el-card>
      <!-- 头部容器 -->
      <div slot="header">
        <!-- 面包屑组件 -->
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 内容容器 Layout布局 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!-- 表单 -->
            <el-form label-width="120px">
              <el-form-item label="编号:">
                {{userInfo.id}}
              </el-form-item>
              <el-form-item label="手机:">
                {{userInfo.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称:">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍:">
                <el-input
                  type="textarea"
                  :rows="3"
                  v-model="userInfo.intro"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱:">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="saveInfo"
                >保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <!-- 上传组件 -->
            <el-upload
              style="margin-top:100px"
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="updatePhoto"
            >
              <img
                v-if="userInfo.photo"
                :src="userInfo.photo"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
            <p style="text-align:center">修改头像</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userInfo: {
        // 用户名
        name: null,
        // 头条号简历
        intro: null,
        // 邮箱
        email: null,
        // 图片地址
        photo: null
      }
    }
  },
  // 组件初始化
  created () {
    this.getUserInfo()
  },
  methods: {
    // 修改头像  上传图片
    async updatePhoto (result) {
      // 1.获取图片文件数据     选择文件后触发当前函数，默认传入一个选择后的结果(包括文件信息)
      // console.log(result)
      const file = result.file
      // 2.创建formDate
      const formData = new FormData()
      // 3.追加图片数据到fromDae   字段名字和后台一致
      formData.append('photo', file)
      // 4.使用axios提交数据
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // 5.拿着上传成功后的地址进行预览
      this.userInfo.photo = data.photo
      // 6.提示
      this.$message.success('修改头像成功')
      // 7.更新home组件的头像
      eventBus.$emit('updatePhoto', data.photo)
      // 8.更新本地存储的photo
      // 拿出来
      const user = local.getUser()
      // 改一改
      user.photo = this.userInfo.photo
      // 存进去
      local.setUser(user)
    },
    // 获取用户的信息
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      // 填充到表单中，页面上
      this.userInfo = data
    },
    // 点击保存设置按钮  （除去头像不能保存）
    async saveInfo () {
      // 通过userInfo 结构出来
      var { name, intro, email } = this.userInfo
      // 发送修改用户信息的请求
      await this.$http.patch('user/profile', { name, intro, email
      })
      // 成功后的提示
      this.$message.success('保存用户信息成功')
      // 更新home     通过eventBus 传过去
      eventBus.$emit('updateName', this.userInfo.name)
      // 更新本地存储

      // 拿出来
      const user = local.getUser()
      // 改一改
      user.name = this.userInfo.name
      // 存进去
      local.setUser(user)
    }
  }
}
</script>

<style scoped lang='less'></style>
