<template>
  <div class="searchContent">
    <h2 class="title">
      <i class="el-icon-search"></i>
      <template v-if="key != ''">
        关键字: '{{key}}' &nbsp;
      </template>
      搜索结果:
    </h2>
    <div class="goods">
      <el-row>
        <el-col :span="5" class="goods-item" v-for="items in this.searchList" :key="items.id">
          <router-link :to="`/goods/${items.id}`" style="text-decoration: none">
            <el-card :body-style="{padding: 0}">
              <img :src="items.img" class="image">
              <div style="padding: 14px;">
                <span class="item-name">{{ items.name }}</span>
                <span class="item-price">￥{{ items.price }}</span>
                <span class="item-sellCount">已售出 {{ items.sale_count }} 件</span>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Search",
  data(){
    return{
      key: '',
    }
  },
  computed: {
    ...mapGetters(['searchList'])
  },
  methods: {
    getSearchData(){
      if (this.key !== undefined){
        this.$store.dispatch('getSearchList' ,{key: this.key, begin: 0, count: 99})
      }
    }
  },
  beforeMount() {
    this.key = this.$route.params.key
    console.log(this.$route.params)
  },
  mounted() {
    this.getSearchData();
  },
}
</script>

<style lang="scss" scoped>
.searchContent{
  min-width: 1200px;
  width: 85%;
  margin: 0 auto;
  overflow: hidden;
  .title{
    color: lightcoral;
    text-align: left;
    margin-left: 47px;
    border-bottom: lightcoral solid 2px;
    line-height: 50px;
  }
  .goods{
    width: 100%;
    height: 100%;
    float: left;
    .el-row{
      float: right;
      width: 100%;
    }
    .goods-item{
      min-width: 210px;
      min-height: 320px;
      margin: 0 2px 15px 45px;
      padding: 0 5px 5px 5px;
    }
    .image {
      width: 100%;
      display: block;
    }
    .item-name{
      width: 100%;
      float: left;
      font-size: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .item-price{
      width: 100%;
      float: left;
      font-size: 20px;
      font-weight: bold;
    }
    .item-sellCount{
      font-size: 13px;
      color: #909399;
    }
  }
}
</style>