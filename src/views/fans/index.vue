<template>
  <div class='container-fans'>
    <!-- 卡片组件 -->
    <el-card>
      <!-- 头部容器 -->
      <div slot="header">
        <!-- 面包屑组件 -->
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs的选项卡 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="fansLists">
          <div class="fans_list">
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <div style="text-align: center;">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="reqParams.per_page" :current-page="reqParams.page" @current-change="pager">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="pic">
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div ref="dom" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import circleUrl from '../../assets/avatar.jpg'
import echarts from 'echarts' // 导入echarts插件
export default {
  data () {
    return {
      activeName: 'pic',
      circleUrl,
      fansList: [],
      reqParams: {
        page: 1,
        per_page: 21
      },
      // 总页数
      total: 0
    }
  },
  // 初始化
  created () {
    this.getFansList()
  },
  methods: {
    async getFansList () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      // console.log(data)
      this.fansList = data.results
      this.total = data.total_count
    },
    // 分页页码改变时  拉取新数据
    pager (newPage) {
      // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新渲染
      this.getFansList()
    }
  },
  // 初始化之后dom元素
  mounted () {
    //  echarts 绘制图表是需要操作dom元素的
    const dom = this.$refs.dom
    // 初始化echarts实例
    const myEchartd = echarts.init(dom)
    // 指定图表的配置项和数据
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myEchartd.setOption(option)
  }
}
</script>

<style scoped lang='less'>
.fans_item {
  width: 150px;
  height: 190px;
  padding-top: 20px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin: 0 20px 20px 0;
  text-align: center;
}
</style>
