<template>
  <div class="collection-container">
    <h2 class="title">
      <i class="el-icon-star-off"></i>
      我的收藏:
    </h2>
    <div class="collection-data">
      <el-row><el-col :span="4" class="goods-item" v-for="items in collection" :key="items.id">
        <router-link :to="`/goods/${items.g_id}`" style="text-decoration: none">
          <el-card :body-style="{padding: 0}">
            <img :src="items.g_info.img" class="img">
            <div style="padding: 14px;">
              <span class="item-name">{{items.g_info.name +' '+ items.g_info.describe}}</span>
              <span class="item-price">￥{{items.g_info.price}}</span>
            </div>
          </el-card>
        </router-link>
      </el-col></el-row>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "Collection",
  computed: {
    ...mapGetters(['collection'])
  },
  mounted() {
    this.$store.dispatch('getCollection');
  }
}
</script>

<style lang="scss" scoped>
.collection-container{
  width: 1000px;
  margin: 0 auto;

  .title{
    color: lightcoral;
    text-align: left;
    border-bottom: lightcoral solid 2px;
    line-height: 50px;
  }
  .goods-item{
    min-width: 190px;
    margin-bottom: 15px;
    padding-left: 5px;
    margin-right: 10px;

    .img {
      width: 100%;
    }
    .item-name{
      margin-bottom: 10px;
      font-size: 12px;
      display: -webkit-box;
      text-align: left;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .item-price{
      font-size: 18px;
      font-weight: bold;
      color: #e34490;
    }
  }
}
</style>