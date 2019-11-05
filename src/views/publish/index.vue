<template>
  <div class='container-publish'>
    <!-- 卡片 -->
    <el-card>
      <!-- 头部插槽 -->
      <div slot='header'>
        <!-- 面包屑组件 -->
        <my-bread>{{this.$route.query.id? '修改':'发布'}}文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form
        label-width="120px"
        size="small"
      >
        <!-- 标题 -->
        <el-form-item label="标题:">
          <!-- 输入框 -->
          <el-input
            v-model="articleFrom.title"
            style="width:400px"
          ></el-input>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="内容:">
          <!-- 中部富文本框 -->
          <quill-editor
            v-model="articleFrom.content"
            :options="editorOption"
          >
          </quill-editor>
        </el-form-item>

        <el-form-item label="封面:">
          <!-- @change="articleFrom.cover.images=[]" 当选项发生改变时 清空images的地址 -->
          <el-radio-group
            v-model="articleFrom.cover.type"
            @change="articleFrom.cover.images=[]"
          >
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面图组件     根据type动态渲染组件个数-->
          <div v-if="articleFrom.cover.type === 1">
            <my-image v-model="articleFrom.cover.images[0]"></my-image>
          </div>
          <div v-if="articleFrom.cover.type === 3">
            <!-- 循环三个后 发现是块级元素 改变其样式、  在组件上改的 -->
            <my-image
              v-for="i in 3"
              :key="i"
              v-model="articleFrom.cover.images[i-1]"
            ></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleFrom.channel_id"></my-channel>
        </el-form-item>
        <!-- 按钮 -->
        <!-- 修改按钮 -->
        <el-form-item v-if="$route.query.id">
          <el-button
            type="success"
            @click="update(false)"
          >修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
        <!-- 发表按钮 -->
        <el-form-item v-else>
          <el-button
            type="primary"
            @click="create(false)"
          >发表</el-button>
          <el-button @click="create(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入富文本组件
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 提交文章表单
      articleFrom: {
        // 文章标题
        title: null,
        // 文章内容
        content: null,
        // 文章所属频道id
        channel_id: null,
        // 文章类型
        cover: {
          type: 1,
          // 后台要的图片地址数据
          images: []
        }
      },
      // 富文本配置对象
      editorOption: {
        // 输入内容提示
        placeholder: '',
        // 选项
        modules: {
          // 所有的选项
          toolbar: [
            // 文本操作  加粗 斜体 下划线 中线
            ['bold', 'italic', 'underline', 'strike'],
            // 双引号 代码块
            ['blockquote', 'code-block'],
            // 标题
            [{ 'header': 1 }, { 'header': 2 }],
            // 有序列表  无序列表
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            // 向前缩进 向后缩进
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            // 图片
            ['image']
          ]
        }
      }
    }
  },
  // 侦听器
  watch: {
    // 监听地址栏参数变化，切换填充表单还是重置表单
    // key  ===> 被监听的数据的字段的名字    不止监听data里的数据   this下的数据都可以监听到数据的改变     this下的字段名  就不需要添加this. 了
    // vlaue ===> 值改变后触发的函数 (nawVal,oldVal) 新值 旧值
    '$route.query.id': function (newVal) {
      if (newVal) {
        // 修改   填充表单内容
        this.getArticle(newVal)
      } else {
        // 新建  发布  重置表单内容
        this.articleFrom = {
          // 文章标题
          title: null,
          // 文章内容
          content: null,
          // 文章所属频道id
          channel_id: null,
          // 文章类型
          cover: {
            type: 1,
            // 后台要的图片地址数据
            images: []
          }
        }
      }
    }
  },
  created () {
    // 根据地址是否有 ID来判断
    const articleId = this.$route.query.id
    if (articleId) {
      // 修改逻辑
      // 填充表单内容
      this.getArticle(articleId)
    }
  },
  methods: {
    // 新建
    async create (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleFrom)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 跳转到内容管理
      this.$router.push('/article')
    },
    // 获取文章内容
    async getArticle (id) {
      const { data: { data } } = await this.$http.get(`articles/${id}`)
      this.articleFrom = data
    },
    // 修改
    async update (draft) {
      await this.$http.put(`articles/${this.articleFrom.id}?draft=${draft}`, this.articleFrom)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      // 跳转到内容管理
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'></style>
