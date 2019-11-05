<template>
  <div class="container-article">
    <!-- 筛选条件布局 -->
    <el-card>
      <!-- 头 -->
      <div slot="header">
        <!-- 使用面包屑组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单控件部分 -->
      <el-form label-width="80px" size="small">
        <!-- 状态部分 -->
        <!-- 单选框 -->
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道部分 -->
        <!-- 下拉列表 -->
        <!-- clearable  是否可以清空选项  默认不清除 -->
        <el-form-item label="频道:">
          <!-- 使用频道组件 -->
          <!-- v-model 第一 :value    第二   @input -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <!-- 日期部分 -->
        <!-- 日期选择器   选择日期范围-->
        <el-form-item label="日期:">
          <!-- v-model 绑定的值是[起始日期,结束日期]  type="daterange"日期范围不加是一个值-->
          <el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <!-- 筛选按钮 -->
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 筛选结果布局 -->
    <el-card>
      <!-- 头部筛选结果说明 -->
      <div slot="header">
        <span>根据筛选条件共查询到{{total}}条结果</span>
      </div>
      <el-table :data="articles">
        <!-- 自定义列 封面 -->
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <!-- 当图片加载失败时，显示一下面的图 -->
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px">
              </div>
            </el-image>
          </template>
        </el-table-column>

        <!-- 普通列   标题 -->
        <el-table-column prop="title" label="标题">
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">以删除</el-tag>
          </template>
        </el-table-column>
        <!-- 普通列   发布时间 -->
        <el-table-column prop="pubdate" label="发布时间">
        </el-table-column>

        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="toEdit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="delArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- layout="prev, pager, next" 当前分页组包含的布局 -->
      <!-- total 总条数 -->
      <!-- page-size 默认一页显示10条 -->
      <!-- current-page 指定当前激活的按钮 -->
      <!-- @current-change="pager"  作用：页码发生改变触发  默认传入当前新的页码 -->
      <div style="text-align: center;">
        <el-pagination background layout="prev, pager, next" :total="total" style="margin-top:20px" :page-size="reqParams.per_page" :current-page="reqParams.page" @current-change="pager">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 表单里面的数据是要提交给后台的参数对象   所有要跟后台的参数对象对应
      // 由axios进行数据提交，字段的值null，axios是不会提交该字段
      // 请求参数
      reqParams: {
        // 状态部分
        status: null,
        // 频道id部分
        channel_id: null,
        // 起始时间
        begin_pubdate: null,
        // 结束时间
        end_pubdate: null,
        // 当前页码
        page: 1,
        // 每页多少条
        per_page: 20
      },
      // 频道下拉选项数据   value唯一标识   label频道的名称
      channelOptions: [],
      // 接收日期范围数据  是两个值所以是数组
      dateArr: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  //   在组件初始化之前
  created () {
    // 下拉列表数据
    // this.getChannelOptions()
    // 内容管理列表 标题与时间数据
    this.getArticles()
  },
  // 方法
  methods: {
    // // 获取频道选项数据
    // async getChannelOptions () {
    //   //   获取数据 发送请求
    //   const { data: { data } } = await this.$http.get('channels')
    //   // 把数据赋值channelOptions
    //   this.channelOptions = data.channels
    // },
    // 获取文章列表数据
    async getArticles () {
      //   获取数据 发送请求
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // 把数据赋值articles
      this.articles = data.results
      // 把文章总数赋值给total
      this.total = data.total_count
    },
    // 分页函数
    pager (newPage) {
      // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新获取数据
      this.getArticles()
    },
    // 获取时间选定时的值
    changeDate (dateArr) {
      // dateArr 是数组[date,date]  起始时间  结束时间
      // 通过value-format 把格式转换成后台想要的数据 yyyy-MM-dd
      // 注意：清空日期之后，dateArr是null   对应的 begin  end 值也该是null
      if (this.dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选
    search () {
      //   获取筛选数据(准备日期数据)
      // 处理频道空字符串问题
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      //   把页面换成1
      this.reqParams.page = 1
      // 使用getArticles提交给后台
      this.getArticles()
    },
    // 去编辑
    toEdit (id) {
      // 第一种   query传参方式 模板字符串   一个数据
      // this.$router.push(`/publish?id=${id}`)
      // 第二种 query传参方式  对象的方式  多个数据 灵活    由query来指定id
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async delArticle (id) {
      // 发请求  restfull 接口规则  (get post delete put)
      await this.$http.delete(`article/${id}`)
      // 提示
      this.$message.success('删除成功')
      // 更新列表
      this.getArticles()
    }
  }
}
</script>

<style scoped lang='less'></style>
