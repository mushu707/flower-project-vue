<template>
  <el-card class="box-card" style="margin: 10px 0">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="Sales" name="Sales"></el-tab-pane>
        <el-tab-pane label="Visits" name="Visits"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span class="hover" @click="setDay">Day</span>
        <span class="hover" @click="setWeek">Week</span>
        <span class="hover" @click="setMonth">Month</span>
        <span class="hover" @click="setYear">Year</span>
        <el-date-picker
          v-model="date"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="StartDate"
          end-placeholder="EndDate"
          class="date"
          size="mini"
        ></el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6" style="font-family: 微软雅黑">
          <h3 style="margin: 0">{{activeName}} ranking</h3>
          <ul>
            <li>
              <span class="rindex">1</span>
              <span class="rname">Kentucky Fried Chicken</span>
              <span class="rvalue">721,235</span>
            </li>
            <li>
              <span class="rindex">2</span>
              <span class="rname">MacDonald</span>
              <span class="rvalue">692,136</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span class="rname">Burger King</span>
              <span class="rvalue">641,672</span>
            </li>
            <li>
              <span class="rnone">4</span>
              <span class="rname">Wallace</span>
              <span class="rvalue">573,241</span>
            </li>
            <li>
              <span class="rnone">5</span>
              <span class="rname">Dicos</span>
              <span class="rvalue">492,526</span>
            </li>
            <li>
              <span class="rnone">6</span>
              <span class="rname">Starbucks</span>
              <span class="rvalue">478,211</span>
            </li>
            <li>
              <span class="rnone">7</span>
              <span class="rname">Pizza hut</span>
              <span class="rvalue">424,912</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  name: "Sale",
  data(){
    return{
      activeName: 'Sales',
      mycharts: null,
      //收集日历数据
      date: []
    }
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      title:{text: 'Sales trend'},
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'shadow'}
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
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisTick: {alignWithLabel: true}
        }
      ],
      yAxis: [{type: 'value'}],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '40%',
          data: [132, 79, 200, 334, 119, 390, 330, 220, 124, 251, 90, 175],
          color: '#c5e7b1'
        }
      ]
    });
  },
  watch: {
    activeName(){
      //重新修改配置数据
      this.mycharts.setOption({
        title: {text: `${this.activeName} trend`}
      })
    }
  },
  methods: {
    setDay(){
      const day = dayjs().format('YYYY-MM-DD');
      this.date = [day, day];
    },
    setWeek(){
      const start = dayjs().day(1).format('YYYY-MM-DD');
      const end = dayjs().day(7).format('YYYY-MM-DD');
      this.date = [start, end];
    },
    setMonth(){
      const start = dayjs().startOf('month').format('YYYY-MM-DD');
      const end = dayjs().endOf('month').format('YYYY-MM-DD');
      this.date = [start, end];
    },
    setYear(){
      const start = dayjs().startOf('year').format('YYYY-MM-DD');
      const end = dayjs().endOf('year').format('YYYY-MM-DD');
      this.date = [start, end];
    }
  }
}
</script>

<style scoped>
.clearfix{
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab{
  width: 100%;
}
.right{
  position: absolute;
  right: 0;
}
.date{
  margin-left: 20px;
  width: 250px;
}
.right span{
  margin: 0 15px;
}
.charts{
  width: 100%;
  height: 300px;
}
ul{
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
  overflow: hidden;
  margin: 5px 0 0 0;
}
ul li{
  height: 8%;
  margin: 12px 0;
}
.rindex{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #a79de2;
  color: white;
  text-align: center;
  float: left;
}
.rname{
  font-family: 微软雅黑;
  margin-left: 20px;
}
.rvalue{
  float: right;
}
.rnone{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  text-align: center;
  float: left;
}
.hover{
  cursor: pointer;
}
</style>
