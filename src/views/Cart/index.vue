<template>
  <div class="cart-container">
    <h2 class="title">
      <i class="el-icon-shopping-cart-1"></i>
      我的购物车:
    </h2>
    <div class="cart-panel">
      <el-table
          :data="cartList"
          style="width: 100%"
          v-loading="loading">
        <el-table-column width="50">
          <template scope="scope">
            <el-checkbox v-model="scope.row.checkState"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="400" show-overflow-tooltip>
          <template scope="scope">
            <el-image :src="scope.row.img" style="width: 80px;height: 88px;float: left"></el-image>
            <span style="line-height: 88px; margin-left: 5px">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="市场价">
          <template scope="scope">
          <span style="text-decoration: line-through; color: #aaaeb1">
          ￥{{scope.row.original_price}}
        </span>
          </template>
        </el-table-column>
        <el-table-column label="订购价">
          <template scope="scope">
            <span>￥{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="数量" width="160" align="center">
          <template scope="scope">
            <el-input-number size="mini" v-model="scope.row.buy_count" :min="0"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template scope="scope">
            <div>
              <el-button icon="el-icon-delete" size="mini" @click="handleDelete(scope.row.name,scope.$index)">删除</el-button>
              <el-button icon="el-icon-star-off" size="mini">加入收藏</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cart-settle">
      <div class="cart-back">
        <el-link icon="el-icon-arrow-left" :underline="false" type="info" @click="toHome">返回浏览页面</el-link>
      </div>
      <div class="cart-setButton">
        <el-button type="primary" style="height: 100%" @click="handleUpdate">保存购物车,下次购买</el-button>
        <el-button type="danger" style="height: 100%">去结算</el-button>
      </div>
      <div class="cart-pay">
        <span class="payDes">应付金额:</span>
        <span class="payCount">
        ￥{{getTotalPrice}}
      </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  data(){
    return{
      totalPrice: 0,
      loading: true,
    }
  },
  computed:{
    getTotalPrice(){
      this.totalPrice = 0;
      for (let i=0; i<this.cartList.length; i++){
        if (this.cartList[i].checkState)
          this.totalPrice += this.cartList[i].price * this.cartList[i].buy_count;
      }
      return this.totalPrice
    },
    ...mapGetters(['cartList', 'updateInfo']),
  },
  methods:{
    toHome(){
      this.$router.push('/')
    },
    //购物车商品删除操作
    handleDelete(name,index) {
      this.$confirm('确定从购物车中删除该商品？', '提示', {
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then( _ => {
        this.$store.dispatch('deleteCart', {name}).then(res => {
          if (res == 'success'){
            this.$message.success('购物车商品删除成功!');
            //删除当前页面显示数据，这样当前页面不用刷新，后台数据已经删除
            this.cartList.splice(index,1);
          }else this.$message.error('购物车商品删除失败!')
        })
      }).catch( _ => {this.$message.info('已取消删除')})
    },
    //购物车商品更新操作
    handleUpdate(){
      this.$store.dispatch('updateCart', this.updateInfo).then(res => {
        if (res == 'success') this.$message.success('购物车更新成功!')
        else this.$message.error('购物车更新失败!')
      })
    },
  },
  beforeMount() {
    //获取购物车列表
    this.$store.dispatch('getCartList').then(_ => {
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].isChecked) this.$set(this.cartList[i], 'checkState', true);
        else this.$set(this.cartList[i], 'checkState', false);
      }
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
.cart-container{
  width: 1000px;
  margin: 0 auto;
  .title{
    color: lightcoral;
    text-align: left;
    border-bottom: lightcoral solid 2px;
    line-height: 50px;
  }
  .cart-panel{
    width: 100%;
    padding: 15px 0;
  }
  .cart-settle{
    width: 100%;
    height: 50px;
    margin: 20px 0;
    border: #d9dcdc 1px solid;
    .cart-back{
      float: left;
      font-size: 14px;
      margin: 17px 0 0 10px;
    }
    .cart-pay{
      width: 200px;
      margin: 10px 0 0 10px;
      float: right;
      .payDes{
        font-size: 12px;
        color: #9e9d9d
      }
      .payCount{
        color: #fc2525;
        font-size: 22px;
        font-weight: bold;
      }
    }
    .cart-setButton{
      height: 100%;
      float: right;
    }
  }
}
</style>