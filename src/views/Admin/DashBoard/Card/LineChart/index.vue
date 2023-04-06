<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: "index",
  mounted() {
    //初始化实例
    let lineCharts = echarts.init(this.$refs.charts);
    //配置数据
    lineCharts.setOption({
      xAxis: {
        show: false,
        //均分
        type: 'category'
      },
      yAxis: {show: false},
      series: [
        {
          type: 'line',
          data: [10,7,33,9,21,4,49,17],
          smooth: true,
          //拐点样式
          itemStyle: {
            opacity: 0
          },
          //线条样式
          lineStyle: {color: 'purple'},
          //填充颜色设置
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#e0a3e0', //0%的颜色
                },
                {
                  offset: 1,
                  color: '#fff', //100%的颜色
                }
              ],
              global: false
            }
          }
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
    });
  }
}
</script>

<style scoped>
.charts{
  width: 100%;
  height: 100%;
}
</style>
