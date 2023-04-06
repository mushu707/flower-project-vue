<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "BarChart",
  mounted() {
    //初始化实例
    let BarCharts = echarts.init(this.$refs.charts);
    //配置数据
    BarCharts.setOption({
      xAxis: {
        show: false,
        data: ['Epoch','Ineffable','Hiraeth','Petrichor','Serendipity','Sonorous','Aquiver'
          ,'Limerence','Bombinate','Ethereal','Iridescent','Epiphany']
      },
      yAxis: {show: false},
      series: [
        {
          type: 'bar',
          data: [23,7,33,70,21,52,38,17,62,49,38,64],
          color: '#f6baba'
        }
      ],
      grid: {
        left: 0,
        top: 0,
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
