<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "ProgressChart",
  mounted() {
    //初始化实例
    let ProgressCharts = echarts.init(this.$refs.charts);
    //配置数据
    ProgressCharts.setOption({
      xAxis: {
        show: false,
        //最小值和最大值设置
        min: 0,
        max: 100
      },
      yAxis: {show: false, type: 'category'},
      series: [
        {
          type: 'bar',
          data: [78.12],
          color: '#4eb6e0',
          //柱状图宽度设置
          barWidth: 15,
          //背景颜色设置
          showBackground: true,
          backgroundStyle: {color: '#ececec'},
          //文本
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }
        }
      ],
      grid: {
        left: 0,
        top: 5,
        right: 0,
        bottom: 0
      },
      //提示组件
      tooltip: {},
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
