<template>
  <div class='container-comment'>
    <!-- 卡片组件 -->
    <el-card>
      <!-- 头部容器 -->
      <div slot='header'>
        <!-- 面包屑组件 -->
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格区域 -->
      <el-table :data="articles">
        <el-table-column label="标题" width="400px" prop="title">
        </el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.comment_status? '正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="toggleStatus(scope.row)" v-if="scope.row.comment_status" type="danger" size="small">关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="success" size="small">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="total" style="margin-top:20px" :page-size="reqParams.per_page" :current-page="reqParams.page" @current-change="pager">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 文章列表
      articles: [],
      // 请求参数
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      // 分页总条数
      total: 0

    }
  },
  // 初始化之前
  created () {
    this.getArticles()
  },
  methods: {
    // 切换   评论的状态  正常  关闭
    toggleStatus (row) {
      // row 有id comment——
      // 错误写法： 结构赋值 const { id, comment_stauts } = row   值的不可改变性  语法有过不去  eslint语法验证
      const text = row.comment_status ? '你确认关闭该文章的评论功能吗？如果关闭用户将不能对该文章进行评论' : '您确定打开评论功能吗'
      // 打开对话框
      this.$confirm(text, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发修改状态的请求
        const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
        // 成功
        this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
        // 更新当前文章的状态   数据驱动视图
        row.comment_status = data.allow_comment
      }).catch(() => {

      })
    },
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 拿到数据给总条数赋值
      this.total = data.total_count
    },
    // 分页函数
    pager (newPage) {
      // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新获取数据
      this.getArticles()
    }

  }
}
</script>

<style scoped lang='less'></style>
