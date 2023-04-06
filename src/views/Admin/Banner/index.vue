<template>
  <div>
    <div class="manage-operate">
      <el-button
          icon="el-icon-circle-plus-outline"
          round plain
          type="success"
          @click="newForm">
        添加横幅信息
      </el-button>
      <el-button round>选择横幅信息</el-button>
      <el-button type="danger" round plain>More...</el-button>

      <el-dialog title="横幅信息" :visible.sync="infoVisible" width="50%" center>
        <div class="form-inner">
          <el-form :model="Form" label-width="60px" size="small">

            <el-form-item label="ID:" prop="id" v-if="showIdInput">
              <el-input v-model="Form.id" :disabled="showIdInput"></el-input>
            </el-form-item>

            <el-form-item label="图片:" prop="img">
              <el-upload
                  class="avatar-uploader"
                  :key="key"
                  :action="`http://localhost:4000/banner`"
                  :on-success="handleSuccess"
                  :show-file-list="false">
                <el-image v-if="Form.img" :src="Form.img" class="avatar"/>
                <i v-else class="el-icon-plus"/>
              </el-upload>
            </el-form-item>

            <el-form-item label="是否展示: " prop="isShow" label-width="80px">
              <el-switch
                  style="margin-left: 10px"
                  v-model="switchShow"
                  inactive-text="隐藏"
                  active-text="展示"
                  active-color="#AD8B73"
                  inactive-color="#e5c89a"/>
            </el-form-item>

<!--            <el-form-item label-width="是否移动端: " prop="isMobile" label="80px">-->
<!--              <el-switch-->
<!--            </el-form-item>-->
          </el-form>
        </div>
        <div slot="footer">
          <el-button type="primary" @click="handleAddOrUpdate"> 确 定 </el-button>
          <el-button @click="infoVisible = false"> 取 消 </el-button>
        </div>
      </el-dialog>
    </div>

    <el-table
        :data="tableData"
        :key="key">
      <el-table-column label="图片">
        <template scope="scope">
          <el-image :src="scope.row.img" :preview-src-list="[scope.row.img]"/>
        </template>
      </el-table-column>
      <el-table-column label="是否展示" align="center">
        <template scope="scope">
          <span :style="scope.row.isShow ? {'color': '#9c7b62'} : {'color': '#8e8c8c'}">
            <span style="font-weight: bold">{{scope.row.isShow ? '展示' : '隐藏'}}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template scope="scope">
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template scope="scope">
          <span>{{scope.row.update_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template scope="scope" class="table-column">
          <el-button icon="el-icon-delete" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button icon="el-icon-setting" size="mini" @click="handleUpdate(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {format} from "@/utils/format_date";
export default {
  name: "BannerManage",
  data(){
    return{
      tableData: [],
      Form: {},
      infoVisible: false,
      showIdInput: false,
      switchShow: true,
      key: true,
    }
  },
  methods: {
    async getBannerList(){
      let result = await this.$API.getHomeInfo()
      if (result.code == 200){
        this.tableData = result.data.bannerList.map(item => {
          item.create_time = format(item.create_time);
          item.update_time = format(item.update_time);
          return item;
        })
      }
    },
    newForm(){
      this.Form = {};
      this.switchShow = true;
      this.showIdInput = false;
      this.infoVisible = true;
    },
    handleAddOrUpdate() {
      let tmpForm = this.Form;
      tmpForm.isShow = this.switchShow ? 1 : 0;
      this.$delete(tmpForm, 'create_time');
      this.$delete(tmpForm, 'update_time');
      this.$API.addOrUpdateBannerInfo(tmpForm).then(res => {
        if (res.message == 'success'){
          this.$message.success('横幅信息 [添加/更新] 成功')
          this.getBannerList()
          this.infoVisible = false
        }else this.$message.error('横幅信息 [添加/更新] 失败')
      }).catch(err => this.$message.error(err))
    },
    handleDelete(id){
      this.$confirm('确定删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(_ => {
        this.$API.deleteBannerInfo(id).then(res => {
          if (res.message == 'success'){
            this.$message.success('横幅删除成功!')
            this.getBannerList()
            this.infoVisible = false
          }else this.$message.error('横幅删除失败!')
        }).catch(err => this.$message.error(err))
      }).catch(_ => this.$message.info('取消删除'))
    },
    handleUpdate(id){
      this.showIdInput = true;
      this.Form = this.tableData.filter(item => {return item.id == id}).pop();
      this.switchShow = this.Form.isShow ? true : false;
      this.infoVisible = true;
    },
    handleSuccess(res){
      this.Form.img = res.url
      this.key = !this.key
    },
  },
  beforeMount() {
    this.getBannerList()
  }
}
</script>

<style lang="scss">
$width: 500px;
$height: 150px;

@import "../styles/index";
</style>
