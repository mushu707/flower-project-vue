<template>
  <div>
    <div class="c-header">
      <div class="c-header-left">
        <a href="javascript: void(0)">{{type.name}}</a>
        <span>{{type.desc}}</span>
      </div>
      <div class="c-header-right">
        <router-link to="/list">
          更多鲜花
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </div>
    </div>
    <div class="c-content">
      <div class="c-img">
        <a href=""><img :src="type.img"/></a>
        <div class="c-link-cover"><a href="javascript: ;">
          {{type.name + '专区'}}
          <el-icon class="el-icon-right" style="font-weight: bolder"/>
        </a></div>
      </div>
      <div class="goods">
        <el-row><el-col :span="4" class="goods-item" v-for="(items,index) in data" :key="items.id">
          <router-link :to="`/goods/${items.id}`" style="text-decoration: none">
            <el-card :body-style="{padding: 0}">
              <div class="img-box">
                <img :src="items.img" class="img">
              </div>
              <div style="padding: 14px;">
                <span class="item-name">{{items.name}}</span>
                <span class="item-price">￥{{items.price}}</span>
                <span class="item-sellCount">已售出 {{items.sale_count}} 件</span>
              </div>
            </el-card>
          </router-link>
        </el-col></el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  props:['type', 'data'],
}
</script>

<style lang="scss">
.c-header{
  height: 50px;
  display: block;
  .c-header-left{
    float: left;
    padding: 10px 0 10px 0;
    a{
      font-weight: bold;
      font-size: 24px;
      color: #363636;
      text-decoration: none;
      padding: 0 10px 0 0;
      &:hover{
        color: #e8486c;
      }
    }
    span{
      padding: 0 0 0 10px;
      margin: 0 0 0 10px;
      border-left: #363636 solid 1px;
      font-size: 16px;
    }
  }
  .c-header-right{
    float: right;
    padding: 20px 0 0 0;
    a{
      font-size: 14px;
      color: gray;
      text-decoration: none;
    }
  }
}
.c-content{
  clear: both;
  display: inline-block;
  margin-bottom: 10px;
  height: 665px;
  overflow: hidden;
  .c-img{
    width: 288px;
    float: left;
    overflow: hidden;
    position: relative;
    .c-link-cover{
      a{
        text-decoration: none;
        display: block;
        width: 240px;
        height: 60px;
        text-align: center;
        margin: 76px auto 0;
        border: 2px solid rgba(255, 255, 255, 0.7);
        font-size: 22px;
        line-height: 56px;
        color: #fff;
        font-weight: bold;
        text-align: center;
      }
      position: absolute;
      bottom: 4px;
      background-image: url("http://localhost:4000/assets/home/home_linkcover.png");
      width: 100%;
      height: 160px;
    }
  }
  .goods{
    width: calc(100% - 288px);
    float: left;
    .goods-item{
      min-width: 212px;
      min-height: 320px;
      margin: 0 2px 15px 36px;
      padding: 0 0 0 5px;
      &:hover{
        .img{
          transform: scale(1.1);
        }
        .item-name, .item-price, .item-sellCount{
          color: #e8486c;
        }
      }
    }
    .img-box{
      overflow: hidden;
      .img {
        width: 100%;
        display: block;
        transition: .7s;
      }
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