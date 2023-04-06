<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card style="margin: 0 5px">
          <Detail title="TotalSales" count="$126,560">
            <template slot="chart">
              <div style="padding-top: 30px">
                <span style="">Weekly 56.6% <svg style="margin: -3px 0" t="1644495035033" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4877" width="16" height="16"><path d="M325.456471 862.280661" p-id="4878" fill="#d81e06"></path><path d="M882.057788 862.280661" p-id="4879" fill="#d81e06"></path><path d="M236.028491 877.160382" p-id="4880" fill="#d81e06"></path><path d="M960.132455 877.160382" p-id="4881" fill="#d81e06"></path><path d="M63.683483 788.736998" p-id="4882" fill="#d81e06"></path><path d="M958.469023 788.736998" p-id="4883" fill="#d81e06"></path><path d="M64.77753 858.792098" p-id="4884" fill="#d81e06"></path><path d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z" p-id="4885" fill="#d81e06"></path><path d="M959.523505 858.792098" p-id="4886" fill="#d81e06"></path></svg></span>
                <span style="margin: 0 10px"></span>
                <span style="">Daily 19.9% <svg style="margin: -3px 0" t="1644495059843" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5948" width="16" height="16"><path d="M325.456471 862.280661" p-id="5949" fill="#1afa29"></path><path d="M882.057788 862.280661" p-id="5950" fill="#1afa29"></path><path d="M236.028491 877.160382" p-id="5951" fill="#1afa29"></path><path d="M960.132455 877.160382" p-id="5952" fill="#1afa29"></path><path d="M63.683483 788.736998" p-id="5953" fill="#1afa29"></path><path d="M958.469023 788.736998" p-id="5954" fill="#1afa29"></path><path d="M64.77753 858.792098" p-id="5955" fill="#1afa29"></path><path d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z" p-id="5956" fill="#1afa29"></path><path d="M959.523505 858.792098" p-id="5957" fill="#1afa29"></path></svg></span>
              </div>
            </template>
            <template slot="footer">
              <span>DailySales $1,721</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="margin: 0 5px">
          <Detail title="Visits" count="88,460">
            <template slot="chart">
              <LineChart/>
            </template>
            <template slot="footer">
              <span>DailyVisits 3,217</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="margin: 0 5px">
          <Detail title="Payments" count="103,529">
            <template slot="chart">
              <BarChart/>
            </template>
            <template slot="footer">
              <span>ConversionRate 64.23%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="margin: 0 5px">
          <Detail title="Activity" count="78.12%">
            <template slot="chart">
              <ProgressChart/>
            </template>
            <template slot="footer">
              <span style="">Weekly 23.3% <svg style="margin: -3px 0" t="1644495035033" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4877" width="16" height="16"><path d="M325.456471 862.280661" p-id="4878" fill="#d81e06"></path><path d="M882.057788 862.280661" p-id="4879" fill="#d81e06"></path><path d="M236.028491 877.160382" p-id="4880" fill="#d81e06"></path><path d="M960.132455 877.160382" p-id="4881" fill="#d81e06"></path><path d="M63.683483 788.736998" p-id="4882" fill="#d81e06"></path><path d="M958.469023 788.736998" p-id="4883" fill="#d81e06"></path><path d="M64.77753 858.792098" p-id="4884" fill="#d81e06"></path><path d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z" p-id="4885" fill="#d81e06"></path><path d="M959.523505 858.792098" p-id="4886" fill="#d81e06"></path></svg></span>
              <span style="margin: 0 10px"></span>
              <span style="">Daily 10.6% <svg style="margin: -3px 0" t="1644495059843" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5948" width="16" height="16"><path d="M325.456471 862.280661" p-id="5949" fill="#1afa29"></path><path d="M882.057788 862.280661" p-id="5950" fill="#1afa29"></path><path d="M236.028491 877.160382" p-id="5951" fill="#1afa29"></path><path d="M960.132455 877.160382" p-id="5952" fill="#1afa29"></path><path d="M63.683483 788.736998" p-id="5953" fill="#1afa29"></path><path d="M958.469023 788.736998" p-id="5954" fill="#1afa29"></path><path d="M64.77753 858.792098" p-id="5955" fill="#1afa29"></path><path d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z" p-id="5956" fill="#1afa29"></path><path d="M959.523505 858.792098" p-id="5957" fill="#1afa29"></path></svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import LineChart from './LineChart'
import BarChart from './BarChart'
import ProgressChart from './ProgressChart'
export default {
  name: "Card",
  components: {
    Detail,
    LineChart,
    BarChart,
    ProgressChart
  }
}
</script>

<style scoped>

</style>
