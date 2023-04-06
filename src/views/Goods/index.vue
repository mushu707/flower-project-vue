<template>
  <div class="g-content">
    <div class="g-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }" class="g-breadcrumb-font">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: ''}" class="g-breadcrumb-font">鲜花</el-breadcrumb-item>
        <el-breadcrumb-item class="g-breadcrumb-font">{{detailInfo.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="display: flex; justify-content: space-between">
      <img :src="this.detailInfo.img" class="g-img">

      <div class="g-des">
        <div class="g-title">
          <p class="g-title-name">{{detailInfo.name}}</p>
          <li class="g-title-li">
            <span class="li-point">{{detailInfo.slogan}}</span>
            <span class="li-desc">{{detailInfo.describe}}</span>
          </li>
        </div>
        <div class="g-price">
          <div class="g-price-item">
            <span class="price-label">售价</span>
            <span class="price-sell">&#165;{{detailInfo.price}}</span>
            <span class="price-prev">
          市场价
          <span class="prev-price">
            ￥{{detailInfo.original_price}}
          </span>
        </span>
            <span class="price-sell-count">
          已售
          <span style="color: red">{{detailInfo.sale_count}}</span>
          件
        </span>
            <p class="price-more">
              <i class="el-icon-link"></i>
              手机专享优惠价 &#165;{{detailInfo.price - 30}}
              &nbsp;&nbsp;&nbsp;&nbsp;
              更多优惠内容
              <i class="el-icon-arrow-right"></i>
              &nbsp;
              <a href="" style="text-decoration: none;color: #909399">
                <i class="el-icon-c-scale-to-original"></i>
                鲜花APP
              </a>
            </p>
          </div>
        </div>
        <div class="g-huayu">
          <div class="huayu-item" v-if="detailInfo.huayu">
            <span class="huayu-label">花语</span>
            <p class="huayu-content">{{detailInfo.huayu}}</p>
          </div>
          <div class="huayu-item" v-if="detailInfo.material">
            <span class="huayu-label">材料</span>
            <p class="huayu-content">{{detailInfo.material}}</p>
          </div>
          <div class="huayu-item" v-if="detailInfo.packing">
            <span class="huayu-label">包装</span>
            <p class="huayu-content">{{detailInfo.packing}}</p>
          </div>
          <div class="huayu-item" v-else>
            <span class="huayu-label">描述</span>
            <p class="huayu-content"> 该商品未添加描述 </p>
          </div>
        </div>
        <div class="delivery">
          <div class="delivery-item">
            <span class="del-label">配送说明</span>
            <p class="del-content">
              限送100多个主要城市的市区及近郊：北京,上海,深圳,广州,成都,武汉,南京,杭州,苏州,天津...
              &nbsp;&nbsp;
              <el-link icon="el-icon-map-location" :underline="false" style="font-size:13px;">详细</el-link>
            </p>
          </div>
          <div class="delivery-item">
            <span class="del-label-sel">配送至</span>
            <p class="del-content">
              <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
              </el-select>
            </p>
          </div>
        </div>
        <div class="g-btn-group">
          <el-button type="danger" icon="el-icon-shopping-cart-2" class="g-btn" @click="addCart" round plain>
            <span style="font-weight: bold">加入购物车</span>
          </el-button>
          <el-button type="danger" icon="el-icon-shopping-bag-2" class="g-btn" round>
            <span style="font-weight: bold">立即购买</span>
          </el-button>
          <span class="btn-link" @click="addOrDeleteCollection">
            <i :class="`el-icon-star-${isCollection ? 'on' : 'off'}`"/>
            {{isCollection ? '已收藏' : '收藏商品'}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {addCollectionApi, addHistoryApi, deleteCollectionApi, getCollectionApi} from "@/api";
import {mapGetters} from 'vuex'
import nprogress from 'nprogress'
export default {
  name: "Good",
  data(){
    return{
      options: [{value: 'Beijing', label: '北京'}, {value: 'Shanghai', label: '上海'},
        {value: 'Guangzhou', label: '广州'}, {value: 'Shenzhen', label: '深圳'}],
      value: '',
      isCollection: false,
      identity: localStorage.getItem('IDENTITY')
    }
  },
  methods:{
    errorTip(mes){
      this.$notify({
        title: 'ERROR',
        message: mes
      })
    },
    addCart(){
      if (this.identity == 'customer')
        this.$store.dispatch('addCart', {
          name: this.detailInfo.name,
          img: this.detailInfo.img,
          price: this.detailInfo.price,
          original_price: this.detailInfo.original_price,
          buy_count: 1,  //默认添加数量为1
        }).then(res => {
          if (res == 'success') this.$message.success('添加购物车成功!')
          else this.$message.error('您的购物车添加此商品，请前往购物车查看')
        })
      else if(this.identity == 'admin'){
        this.errorTip('管理员不能添加购物车，如有需要，请使用顾客账户，谢谢配合');
      }else {
        this.errorTip('请先登录顾客账户!');
        nprogress.done();
      }
    },
    async addOrDeleteCollection(){
      if (this.identity == 'customer'){
        if (this.isCollection){
          await deleteCollectionApi({g_id: this.detailInfo.id}).then(res => {
            if (res.code == 200) {
              this.$message.success('取消收藏成功!');
              this.isCollection = false;
            }
            else this.$message.error('取消收藏失败，请稍后再试');
          })
        }else {
          await addCollectionApi({g_id: this.detailInfo.id}).then(res => {
            if (res.code == 200) {
              this.$message.success('添加收藏成功!');
              this.isCollection = true;
            }
            else this.$message.error('添加收藏失败，请稍后再试');
          })
        }
      }else if(this.identity == 'admin'){
        this.errorTip('管理员不能添加购物车，如有需要，请使用顾客账户，谢谢配合');
      }else {
        this.errorTip('请先登录顾客账户!');
        nprogress.done();
      }
    }
  },
  computed: {
    ...mapGetters(['detailInfo']),
  },
  beforeMount() {
    this.$store.dispatch('getDetailInfo', {hua_id: this.$route.params.hua_id});
    if (localStorage.getItem('TOKEN')){
      getCollectionApi().then(res => {
        if (res.code == 200)
          this.isCollection = res.data.collectionData.some(item => {
            if (item.g_id == this.detailInfo.id) return true;
          });
      });
      addHistoryApi({g_id: this.$route.path.split('/')[2]});
    }
  },
}
</script>

<style lang="scss" scoped>
.g-content{
  width: 85%;
  margin: 0 auto;
  min-width: 1200px;
  height: 800px;
}
.g-breadcrumb {
  padding: 15px 0;

  .g-breadcrumb-font {
    font-size: 13px;
    font-family: '微软雅黑 Light';
    font-weight: normal;
  }
}
.g-img{
  max-width: 360px;
  margin-top: 5px;
  border-radius: 20px;
}
.g-des{
  margin-left: 50px;
  padding: 0 0 0 10px;
  .g-title{
    .g-title-name{
      width: 100%;
      margin: 0;
      padding: 0;
      text-align: left;
      font-weight: bold;
      font-size: 24px;
    }
    .g-title-li{
      margin-top: 5px;
      padding: 0;
      width: 100%;
      float: left;
      list-style: none;
      .li-point{
        color: #fd3939;
        margin-right: 15px;
        float: left;
      }
      .li-desc{
        float: left;
      }
    }
  }
  .g-price{
    width: 100%;
    margin: 10px 0 0 0;
    padding: 10px 0;
    background: #f6f6f6;
    float: left;
    border-radius: 7px;
    .g-price-item{
      width: 100%;
      float: left;
      height: 80px;
      .price-label{
        width: 70px;
        padding: 0 0 0 10px;
        float: left;
        margin: 20px 0 0 0;
        font-size: 13px;
        line-height: 18px;
        color: #71797F;
      }
      .price-sell{
        margin: 10px 0 0 10px;
        font-size: 30px;
        line-height: 30px;
        color: #FF3D12;
        font-weight: bold;
        float: left;
      }
      .price-prev{
        margin: 20px 0 0 10px;
        float: left;
        color: #71797F;
        font-size: 13px;
        line-height: 18px;
        .prev-price{
          text-decoration: line-through;
        }
      }
      .price-sell-count{
        margin: 25px 25px 0 0;
        float: right;
        line-height: 18px;
        font-size: 12px;
        color: #232628;
      }
      .price-more{
        margin: 0;
        padding: 5px 0 0 80px;
        width: 100%;
        float: left;
        text-align: left;
        font-size: 13px;
      }
    }
  }
  .g-huayu{
    width: 100%;
    padding: 12px 0;
    float: left;
    border-bottom: #e3e3e5 1px solid;
    .huayu-item{
      width: 100%;
      float: left;
      margin-top: 12px;
      .huayu-label{
        width: 70px;
        padding-left: 10px;
        font-size: 13px;
        line-height: 18px;
        color: #71797F;
        float: left;
      }
      .huayu-content{
        margin: 0;
        width: 85%;
        padding-left: 10px;
        float: left;
        font-size: 13px;
        line-height: 18px;
        color: #232628;
        text-align: left;
      }
    }
  }
  .delivery{
    padding-top: 12px;
    width: 100%;
    float: left;
    height: 100px;
    .delivery-item{
      width: 100%;
      float: left;
      margin: 10px 0;
      .del-label{
        width: 70px;
        padding-left: 10px;
        font-size: 13px;
        line-height: 18px;
        color: #71797F;
        float: left;
      }
      .del-label-sel{
        width: 70px;
        margin-top: 5px;
        padding-left: 10px;
        font-size: 13px;
        line-height: 18px;
        color: #71797F;
        float: left;
      }
      .del-content{
        margin: 0;
        padding-left: 10px;
        float: left;
        font-size: 13px;
        line-height: 18px;
        color: #232628;
        text-align: left;
      }
    }
  }
  .g-btn-group{
    float: left;
    width: 100%;
    .g-btn{
      margin: 0 40px 0 10px;
      float: left;
    }
    .btn-link{
      float:left;
      color: #8c939d;
      margin: 10px 0;
      font-size: 14px;
      &:hover{
        cursor: pointer;
      }
    }
  }
}
</style>
