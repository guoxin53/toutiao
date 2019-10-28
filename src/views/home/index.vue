<template>
  <el-container class="home-container">
    <!-- 当isOpen的值是true时 宽为200 否则为64 -->
    <el-aside :width=" isOpen? '200px' : '64px'">
      <div class="logo" :class="{smallLogo : !isOpen }"></div>
      <!-- 整个菜单的容器 -->
      <!-- default-active="2" 当前激活菜单的 index   菜单项的index的值和default-active的值相等 当前菜单想被选中-->
      <!-- background-color="#545c64"  背景样式-->
      <!-- text-color="#fff"  默认文本颜色-->
      <!-- active-text-color="#ffd04b"  激活文本颜色-->
      <!-- :collapse="!isOpen" 切换侧边栏  展开与收起 -->
      <!-- :collapse-transition="false"  是否开启折叠动画 -->
      <!-- 1. 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
      <!-- 2. router  当一个属性为布尔时  有这个属性为true 没有为false -->
      <!-- 导航菜单 -->
      <el-menu
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 图标 -->
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客教育科技股份有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <!-- 头像 -->
            <img class="headIcon" src="../../assets/avatar.jpg" alt />
            <span class="uesrname">用户名</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 是不是展开的  默认值是展开的
      isOpen: true
    }
  },
  methods: {
    toggleMenu () {
      // 切换侧边栏的   展开与收起  当你是展开的我就变成收起
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat
        center/140px auto;
    }
    // 覆盖大图成小图
    .smallLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 40px auto;
    }
    //二级导航
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 30px;
      vertical-align: middle;
      cursor: pointer; //小手
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      .headIcon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .uesrname {
        font-weight: bold;
        vertical-align: middle;
        cursor: pointer; //小手
      }
      img {
        margin-right: 10px;
      }
    }
  }
  .el-main {
    padding: 0;
  }
}
</style>
