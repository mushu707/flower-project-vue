<template>
  <div>
    <!--  轮播图  -->
    <div class="home_carousel">
      <el-carousel trigger="click" height="480px">
        <el-carousel-item v-for="item in filterBanner" :key="item.id">
          <a href="javascript:void(0);"><el-image :src="item.img" style="height: 480px; width: 100%"/></a>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!--  主体内容  -->
    <div class="content-wrapper"
         :style="{backgroundColor: item.id % 2 == 0 ? '#E9ECF0' : '#F7F9FA'}"
         v-for="item in homeInfo"
         :key="item.id">
      <div class="content">
        <Content :type="item" :data="goodsInfo(item.style)"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Content from "@/views/Home/Content";
export default {
  name: 'Home',
  components:{
    Content,
  },
  beforeMount() {
    this.$store.dispatch('getHomeInfo');
  },
  computed: {
    ...mapGetters(['homeInfo', 'goodsInfo', 'bannerInfo']),
    filterBanner(){
      return this.bannerInfo.filter(item => item.isShow)
    }
  },
}
</script>
<style lang="scss">
.home_carousel{
  height: 480px;
  margin: 0 auto;
  min-width: 1200px;
}
.content-wrapper{
  .content{
    min-width: 1200px;
    width: 85%;
    padding: 20px 0;
    margin: 0 auto;
  }
}
.el-carousel__arrow--left{
  left: 50px;
}
.el-carousel__arrow--right{
  right: 50px;
}
</style>