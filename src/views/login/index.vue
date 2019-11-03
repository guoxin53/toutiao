<template>
  <!-- 全屏容器 -->
  <div class="container">
    <!-- 卡片容器 -->
    <el-card>
      <!-- login -->
      <img src="../../assets/logo_index.png" />
      <!-- 表单 -->
      <el-form
        status-icon
        :rules="LoginRules"
        ref="loginForm"
        :model="LoginForm"
      >
        <el-form-item prop="mobile">
          <el-input
            v-model="LoginForm.mobile"
            placeholder="请输入手机号"
            v-focus
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="LoginForm.code"
            placeholder="请输入验证码"
            style="width:240px; margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已经同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login"
            style="width:100%"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机格式'))
      }
    }
    return {
      LoginForm: {
        mobile: '19666666666',
        code: '246810'
      },
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位的手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '请输入6位数的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  directives: {
    // 自动获取焦点
    focus: {
      inserted (dom) {
        dom.querySelector('input').focus()
      }
    }
  },
  methods: {
    // 登录
    login () {
      // 对整个表单进行校验
      // 1.先对表单元素先加一个ref属性
      this.$refs['loginForm'].validate(async value => {
        if (value) {
          // 验证成功  进行登录   发送请求axios
          // post(url,参数对象)
          // get(url,{params : 参数对象})
          // this.$http
          //   .post('authorizations', this.LoginForm) // promise对象
          //   .then   res => {
          //     // 成功 res 是响应对象  res.data是响应主体
          //     // 保存用户信息(token)
          //     local.setUser(res.data.data)
          //     // 通过编程式导航跳转到首页
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     // 失败
          //     this.$message.   error('手机号或者验证码错误')
          //   })`
          // exception s异常 意外 报错
          // 成功的结果  以下代码可能出现异常(报错)   使用try{可能报错的代码}catch(e){处理}
          try {
            const {
              data: { data }
            } = await this.$http.post('authorizations', this.LoginForm)
            local.setUser(data)
            this.$router.push('/')
          } catch (e) {
            // 出异常就用catch处理一下
            this.$message.error('手机号或者验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 25px;
    }
  }
}
</style>
