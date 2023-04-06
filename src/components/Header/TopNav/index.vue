<template>
  <div class="top">
    <div class="topNav">
      <ul class="topNav-l">
        <li class="menu-l"><el-link icon="el-icon-location-information" type="info">广东</el-link></li>
        <li class="menu-l"><el-link icon="el-icon-star-off" type="info">收藏页面</el-link></li>
      </ul>
      <ul class="topNav-r">
        <li class="menu-r">鲜花网:国内领先鲜花购物品牌</li>
        <li class="menu-r"><el-link icon="el-icon-s-custom" type="info" :underline="false">在线客服</el-link></li>
        <li class="menu-r login">
          <router-link to="/register" v-show="!token">
            <i class="el-icon-tickets"></i>
            注册
          </router-link>
        </li>
        <li class="menu-r login">
          <router-link to="/login" v-show="!token">
            <i class="el-icon-user"></i>
            你好，请登录
          </router-link>
        </li>
        <li class="menu-r login">
          <router-link to="/admin" v-if="identity == 'admin'">
            返回管理页面
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  data(){
    return{
      token: localStorage.getItem('TOKEN'),
      identity: localStorage.getItem('IDENTITY')
    }
  },
}
</script>

<style lang="scss" scoped>
.top{
  background-color: #F3F5F7;
  overflow: hidden;
}
ul{
  list-style: none;
}
li{
  display: list-item;
  text-align: -webkit-match-parent;
}
.topNav{
  min-width: 1200px;
  height: 30%;
  width: 85%;
  margin: 0 auto;
  font-size: 14px;
  color: #71797F;
  .topNav-l{
    padding: 0;
    float: left;
    .menu-l{
      padding: 0 16px 0 0;
      float: left;
    }
  }
  .topNav-r{
    padding: 0;
    float: right;
    .menu-r{
      padding: 0  0 0 20px;
      float: right;
    }
  }
}
.login a {
  font-weight: 500;
  font-size: 14px;
  color: #909399;
  text-decoration: none;
}


</style>