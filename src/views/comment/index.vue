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
      <el-table style="width: 100%">
        <el-table-column
          label="标题"
          width="380px"
        >
        </el-table-column>
        <el-table-column
          label="总评论数"
        ></el-table-column>
        <el-table-column label="粉丝评论数"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>
