<template>
  <el-card>
    <div slot="header">
      <!-- 面包屑组件 -->
      <my-bread>素材管理</my-bread>
    </div>
    <!-- 按钮 -->
    <div class="btn_box">
      <!-- 全部与收藏 -->
      <!-- label 指定选中当前单选框的值  因为是布尔类型的值-->
      <el-radio-group v-model="reqParams.collect" size="small" @change="totalList">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="small" style="float:right" @click="open">添加素材</el-button>
    </div>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px" :on-success="handleSuccess">
      <span>
        <!-- :on-success="handleSuccess"   上传成功时的回调函数
          name="image"   后台规定好的参数名
          :headers="headers"   设置请求头  获取token
            -->
        <el-upload class="avatar-uploader" action="http://ttapi.research.itcast.cn/mp/v1_0/user/images" :show-file-list="false" :headers="headers" name="image" :on-success="handleSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>
    </el-dialog>
    <!-- 素材区域 -->
    <div class="img_list">
      <div class="img_item" v-for="item in images" :key="item.id">
        <img :src="item.url">
        <div class="footer" v-show="!reqParams.collect">
          <span class="el-icon-star-off" style="cursor:pointer;" :class="{red : item.is_collected}" @click="tooggleStaus(item)"></span>
          <span class="el-icon-delete" style="cursor:pointer;" @click="deleteImage(item.id)"></span>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div style="text-align: center;">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="reqParams.per_page" :current-page="reqParams.page" @current-change="pager">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import local from '@/utils/local' // token工具

export default {
  data () {
    return {
      // 提交的筛选参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      // 控制对话框 显示与隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null,
      // 设置请求头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  // 在组件初始化做的事情
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      // 获取数据
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      // 赋值给images
      this.images = data.results
      // 赋值给总条数
      this.total = data.total_count
    },
    // 分页页码改变时  拉取新数据
    pager (newPage) {
      // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新渲染
      this.getImages()
    },
    // 切换全部与收藏的列表
    totalList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 切换  添加收藏  取消收藏
    // item 就是当前元素的数据
    async tooggleStaus (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      // 成功       （改当前图片的状态   添加收藏成功提示）
      item.is_collected = data.collect
      // 提示
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    // 删除
    deleteImage (id) {
      // 显示对话框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        // 1.发请求
        await this.$http.delete(`user/images/${id}`)
        // 2.提示
        this.$message.success('删除成功')
        // 3.更新列表
        this.getImages()
      }).catch(() => {
        // 点击取消
      })
    },
    // 上传图片成功后
    handleSuccess (res) {
      // res 成功后的响应
      this.imageUrl = res.data.url
      // 提示用户
      this.$message.success('上传成功')
      // 2s后
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogVisible = false
        // 更新列表
        this.getImages()
      }, 2000)
    },
    // 打开对话框
    // 重置预览图
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    }

  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    border-bottom: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      //span .red{}  选择器无效
      //span.res{}  选择器有效的  &连接符
      span {
        margin: 0 30px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
