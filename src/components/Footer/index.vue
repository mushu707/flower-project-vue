<template>
  <div class="footer-wrapper">
    <div class="footer">
      <div class="f-left">
        <ul class="f-ul">
          <li class="f-link" v-for="link in links" :key="link.id">
            <a href="javascript: void(0);"><i :class="`el-icon-${link.icon}`"/>
              {{link.name}}
            </a>
          </li>
        </ul>
        <span class="f-des">白云鲜花网 www.baiyunhua.com 白云领先的鲜花网，品牌鲜花服务，鲜花速递专家！</span>
        <span class="f-des">
        @<i style="padding-right: 10px">2021-2022</i> 广东白云学院陈文智破产公司
        <span style="padding-left: 20px;padding-right: 20px">版权所有</span>
        <a href="#">粤IBY备777777号-7</a>
      </span>
      </div>
      <div class="f-right">
        <el-image class="f-img" :src="qrcodeImg" style="max-height: 100px;max-width: 100px"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data(){
    return{
      links: [
          {id: 1, name: '首页', icon: 's-home'},
          {id: 2, name: '关于我们', icon: 'thumb'},
          {id: 3, name: '联系方式', icon: 'mobile-phone'},
          {id: 4, name: '花店入驻', icon: 'house'},
          {id: 5, name: '友情链接', icon: 'link'},
          {id: 6, name: '知识产权', icon: 'notebook-1'}
      ],
      qrcodeImg: require('./image/qrcode.png'),
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-wrapper{
  background-color: #343a40;
  overflow: hidden;
}
.footer{
  min-width: 1200px;
  width: 85%;
  margin: 0 auto;
  color: #c7c7c7;
  height: 140px;
}
.f-left{
  width: 80%;
  height: 100%;
  float: left;

  a{
    text-decoration: none;
    color: #c7c7c7;
  }
  a:hover{
    color: #ffffff;
  }
  .f-ul{
    list-style: none;
    width: 100%;
    height: 50px;
    padding: 0;
    margin: 0;
  }
  .f-link{
    display: block;
    text-align: -webkit-match-parent;
    float: left;
    font-size: 16px;
    padding: 20px 60px 0  0;
    a:hover{
      cursor: pointer;
    }
  }
  .f-des{
    width: 90%;
    display: block;
    float: left;
    text-align: left;
    padding: 10px 0;
    margin: 0;
    font-size: 12px;
  }
}
.f-right{
  margin: 0 auto;
  padding-right: 10px;
  height: 100%;
  float: right;
  .f-img{
    padding: 15px 1px;
    float: right;
  }
}

</style>