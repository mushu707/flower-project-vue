<template>
  <div>
    <div class="manage-type">
      <el-radio-group v-model="type" :fill="color">
        <el-radio-button label="all" border>所有商品</el-radio-button>
        <el-radio-button
            v-for="item in homeInfo"
            :key="item.id"
            :label="item.style"
            border>
          {{item.name + '系列'}}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="manage-operate">
      <el-button
          icon="el-icon-circle-plus-outline"
          round plain
          type="success"
          @click="newForm">
        添加商品
      </el-button>
      <el-button round>选择商品</el-button>
      <el-button type="danger" round plain>More...</el-button>

      <el-dialog title="商品信息" :visible.sync="goodsInfoVisible" width="50%" center>
        <div class="form-inner">
          <el-form :model="Form" :label-width="labelWidth" size="small">

            <el-form-item label="ID:" prop="id" v-if="showIdInput">
              <el-input v-model="Form.id" :disabled="showIdInput"></el-input>
            </el-form-item>

            <el-form-item label="名称:" prop="name" style="width: 70%">
              <el-input v-model="Form.name"></el-input>
            </el-form-item>

            <el-form-item label="类型:" prop="type">
              <el-select v-model="Form.type" placeholder="选择商品类型" size="small">
                <el-option v-for="item in this.homeInfo" :key="item.id" :label="item.style" :value="item.style">
                  <span style="float: left">{{item.style}}</span>
                  <span style="float: right;color: #8492a6; font-size: 13px">{{item.name}}</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="图片:" prop="img">
              <el-upload
                  class="avatar-uploader"
                  :key="key"
                  :action="`http://localhost:4000/goods?type=${Form.type}`"
                  :on-success="handleSuccess"
                  :show-file-list="false">
                <el-image v-if="Form.img" :src="Form.img" class="avatar"/>
                <i v-else class="el-icon-plus"/>
              </el-upload>
            </el-form-item>

            <el-form-item label-width="0">
              <el-col :span="8">
                <el-form-item label="售价:" prop="price">
                  <el-input v-model="Form.price"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="原价:" prop="original_price">
                  <el-input v-model="Form.original_price"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="销量:" prop="sale_count">
                  <el-input v-model="Form.sale_count"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>

          <el-dialog title="商品附属信息" :visible.sync="creGoodsInfoVisible" width="40%" center append-to-body>
            <el-form :model="Form" :label-width="labelWidth" size="small">
              <el-form-item :label="`${item.name}:`" :prop="item.value" v-for="item in otherForm" :key="item.id">
                <el-input type="textarea" v-model="Form[item.value]" :autosize="{maxRows: 2}"/>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <div slot="footer">
          <el-button type="success" plain @click="creGoodsInfoVisible = true"> 附属信息 </el-button>
          <el-button type="primary" @click="handleAddOrUpdate"> 确 定 </el-button>
          <el-button @click="goodsInfoVisible = false"> 取 消 </el-button>
        </div>
      </el-dialog>
    </div>

    <el-table
        :data="tableData"
        style="width: 100%"
        :key="key" :default-sort="{prop: 'price', order: 'ascending'}">
      <el-table-column label="商品名称" width="300" show-overflow-tooltip>
        <template scope="scope">
          <el-image :src="scope.row.img" style="width: 80px;height: 88px;float: left;" :preview-src-list="[scope.row.img]"/>
          <span style="line-height: 88px; margin-left: 5px">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="售价" align="center" prop="price" sortable>
        <template scope="scope">
          <span>￥{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="原价" align="center" prop="original_price" sortable>
        <template scope="scope">
          <span>￥{{scope.row.original_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销量" align="center" prop="sale_count" sortable>
        <template scope="scope">
          <span>{{scope.row.sale_count}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template scope="scope" class="table-column">
          <el-button icon="el-icon-delete" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button icon="el-icon-setting" size="mini" @click="handleUpdate(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
        style="text-align: center; margin: 15px 0"
        @size-change="handleSizeChange"
        @current-change="getListData"
        :current-page="curPage"
        :page-sizes="[3,5,7]"
        :page-size="pageSize"
        :total="total"
        layout="sizes, prev, pager, next, jumper, total"/>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  name: "GoodsManage",
  data(){
    return{
      //页面数据
      type: 'all',
      color: '#CEAB93',
      key: true,

      //分页器数据
      curPage: 1,
      pageSize: 3,
      total: 0,

      //表单数据
      tableData: [],
      Form: {},
      labelWidth: '60px',    //动态标签宽度
      goodsInfoVisible: false,    //商品信息显示
      creGoodsInfoVisible: false,    //附属信息显示
      showIdInput: false,  //显示id输入框和是否可用功能

      otherForm: [
        {id: 1, name: '标语', value: 'slogan'},
        {id: 2, name: '描述', value: 'describe'},
        {id: 3, name: '花语', value: 'huayu'},
        {id: 4, name: '材料', value: 'material'},
        {id: 5, name: '包装', value: 'packing'}
      ],

    }
  },
  methods: {
    newForm(){
      this.Form = {};
      this.showIdInput = false;  //ID,具体商品名不可修改( 表的主键 )
      this.goodsInfoVisible = true;
    },
    //获取列表数据
    async getListData(curPages = 1){
      this.curPage = curPages
      const {type, curPage, pageSize} = this
      let result = await this.$API.getGoodsListApi(type,{curPage, pageSize})
      if (result.code == 200){
        this.total = result.data.total
        this.tableData = result.data.data
      }
    },
    //更改显示页数回调
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.getListData()
    },
    //添加或更新商品
    handleAddOrUpdate(){
      this.$store.dispatch('addOrUpdateGoodsInfo', this.Form).then(res => {
        if (res == 'success') {
          this.$message.success('[添加/修改] 商品信息成功!')
          this.getListData()
          this.goodsInfoVisible = false    //关闭对话窗
        }
        else this.$message.error('[添加/修改] 信息失败，请核查信息是否准确，稍后重新添加!')
      }).catch(_ => {
        this.$message.error('请求失败，请稍后再试!')
      })
    },
    //删除商品
    handleDelete(id) {
      this.$confirm('确定删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(_ => {
        this.$store.dispatch('deleteGoodsInfo', {id}).then(res => {
          if (res == 'success'){
            this.$message.success('删除成功!');
          }else {
            this.$message.error('删除商品失败，请稍后重试!')
          }
          this.getListData();
        })
      }).catch(_ => this.$message.info('已取消删除'));
    },
    //获取需要更新的商品信息在表单中显示
    handleUpdate(id){
      this.showIdInput = true;  //id不可修改( 表的主键 )
      this.Form = this.tableData.filter(item => {return item.id == id}).pop()
      this.goodsInfoVisible = true;
    },
    //添加图片
    handleSuccess(res) {
      this.Form.img = res.url;
      this.key = !this.key
    },
  },
  watch: {
    type(){
      this.getListData()
    }
  },
  computed: {
    ...mapGetters(['homeInfo'])
  },
  beforeMount() {
    this.$store.dispatch('getHomeInfo')
    this.getListData()
  },
}
</script>

<style lang="scss">
$width: 84px;
$height: 84px;

@import "../styles/index";

.manage-type {
  display: flex;
  margin-bottom: 10px;
}

.el-dialog--center .el-dialog__body {
  padding: 10px 25px;
}

.el-dialog--center .el-dialog__footer {
  padding: 0 10px 15px;
}

.el-radio {
  margin: 0;
}

.el-pagination__jump {
  margin-right: 15px;
}

.el-form-item__content {
  overflow: hidden;
}

</style>
