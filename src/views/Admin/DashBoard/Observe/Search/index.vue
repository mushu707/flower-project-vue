<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>Search hot</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineCharts header="Search users" title="12,736" amount="17.1" :up="true" :data="data1"/>
        </el-col>
        <el-col :span="12">
          <LineCharts header="Per capita search" title="7.1" amount="2.5" :up="false" :data="data2"/>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          prop="date"
          label="Rank"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="SearchKey">
        </el-table-column>
        <el-table-column
          prop="address"
          label="UserNumber"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="WeeklyIncrease"
          sortable
        >
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        class="pagination"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import LineCharts from './LineCharts'

export default {
  name: "Search",
  data(){
    return{
      data1: [10,7,33,9,21,4,49,17],
      data2: [24,7,56,9,21,36,26,15],
      tableData: []
    }
  },
  components: {
    LineCharts
  }
}
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}

.header {
  border-bottom: 1px solid #ddddde;
  padding-bottom: 10px;
}
.pagination{
  margin-top: 5px;
  text-align: center;
}
</style>
