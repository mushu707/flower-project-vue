<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>Proportion of sales category</span>
        <el-radio-group v-model="value" size="mini">
          <el-radio-button label="All"></el-radio-button>
          <el-radio-button label="Online"></el-radio-button>
          <el-radio-button label="in-Store"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="charts" ref="charts">

    </div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  name: "Category",
  data(){
    return{
      value: 'All'
    }
  },
  mounted() {
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title: {
        text: '',
        subtext: '',
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['42%', '90%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 3
          },
          label: {
            show: true,
            position: 'outsize',
            fontSize: '14'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    });
    //绑定鼠标事件
    mychart.on('mouseover', (parmas) => {
      //获取数据
      const {name, value} = parmas.data;
      const color = parmas.color;
      //设置标题
      mychart.setOption({
        title: {
          text: name,
          subtext: value,
          textStyle: {
            color: color
          }
        }
      })
    });
    mychart.on('mouseout', () => {
      mychart.setOption({
        title: {text: '', subtext: ''}
      })
    })
  },
}
</script>

<style scoped>
.category-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header{
  margin-top: -6px;
  padding-bottom: 6px;
  border-bottom: 1px solid #ddddde;
}
.charts{
  width: 100%;
  height: 331px;
}
</style>
