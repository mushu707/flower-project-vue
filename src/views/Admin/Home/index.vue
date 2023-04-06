<template>
  <div>
    <div class="manage-operate">
      <el-button
          icon="el-icon-circle-plus-outline"
          round plain
          type="success"
          @click="newForm">
        添加专区
      </el-button>
      <el-button round>选择专区</el-button>
      <el-button type="danger" round plain>More...</el-button>

      <el-dialog title="专区信息" :visible.sync="infoVisible" width="50%" center>
        <div class="form-inner">
          <el-form :model="Form" label-width="60px" size="small">

            <el-form-item label="ID:" prop="id" v-if="showIdInput">
              <el-input v-model="Form.id" :disabled="showIdInput"></el-input>
            </el-form-item>

            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="名称:" prop="name" style="width: 90%">
                  <el-input v-model="Form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类型:" prop="style" style="width: 90%">
                  <el-input v-model="Form.style" placeholder="输入专区类型" size="small"/>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="PC端图片:" prop="img">
              <el-upload
                  class="avatar-uploader"
                  :key="key"
                  :action="`http://localhost:4000/home`"
                  :on-success="handleSuccess"
                  :show-file-list="false">
                <el-image v-if="Form.img" :src="Form.img" class="avatar"/>
                <i v-else class="el-icon-plus"/>
              </el-upload>
            </el-form-item>

            <el-form-item label="描述:" prop="desc" style="width: 95%">
              <el-input v-model="Form.desc" type="textarea" autosize/>
            </el-form-item>
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
          <el-image :src="scope.row.img" style="max-width: 100px;max-height: 110px;" :preview-src-list="[scope.row.img]"/>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" show-overflow-tooltip>
        <template scope="scope">
          <span style="line-height: 150px;margin-left: 5px">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template scope="scope">
          <span>{{scope.row.style}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template scope="scope">
          <span>{{scope.row.desc}}</span>
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
  name: "HomeManage",
  data(){
    return{
      tableData: [],
      Form: {},
      infoVisible: false,
      showIdInput: false,
      key: true,
    }
  },
  methods: {
    async getHomeInfo(){
      let result = await this.$API.getHomeInfo();
      if (result.code == 200){
        this.tableData = result.data.homeList.map(item => {
          item.create_time = format(item.create_time)
          item.update_time = format(item.update_time)
          return item;
        })
      }
    },
    newForm(){
      this.Form = {};
      this.showIdInput = false;  //ID,具体商品名不可修改( 表的主键 )
      this.infoVisible = true;
    },
    //添加专区
    handleAddOrUpdate(){
      let tmpForm = this.Form;
      tmpForm.m_img = tmpForm.img;
      this.$delete(tmpForm, 'create_time');
      this.$delete(tmpForm, 'update_time');
      this.$API.addOrUpdateHomeInfo(tmpForm).then(res => {
        if (res.message == 'success'){
          this.$message.success('首页专区 [添加/更新] 成功!')
          this.getHomeInfo()
          this.infoVisible = false
        }
        else this.$message.error('首页专区 [添加/更新] 失败!')
      }).catch(err => this.$message.error(err))
    },
    handleDelete(id){
      this.$confirm('确定删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(_ => {
        this.$API.deleteHomeInfo(id).then(res => {
          if (res.message == 'success'){
            this.$message.success('专区删除成功!')
            this.getHomeInfo()
            this.infoVisible = false
          }else this.$message.error('专区删除失败!')
        }).catch(err => this.$message.error(err))
      }).catch(_ => this.$message.info('取消删除'))
    },
    handleUpdate(id){
      this.showIdInput = true;
      this.Form = this.tableData.filter(item => {return item.id == id}).pop();
      this.infoVisible = true;
    },
    handleSuccess(res){
      this.Form.img = res.url
      this.key = !this.key
    },
  },
  beforeMount() {
    this.getHomeInfo()
  }
}
</script>

<style lang="scss">
$width: 84px;
$height: 84px;

@import "../styles/index";

</style>
