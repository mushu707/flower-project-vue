<template>
  <div class="search">
    <ul>
        <li class="logo">
          <el-link :underline="false" @click="toHome">
            <img :src="logoUrl" style="max-width: 84px;max-height: 84px">
          </el-link>
        </li>
        <li class="searchMsg">
          <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-shopping-bag-1"
              v-model="key"
              @keyup.enter.native="goSearch(key)">
            <el-button slot="append" icon="el-icon-search" @click="goSearch(key)"></el-button>
          </el-input>
          <div class="search_main" v-show="showList">
            <div class="title">
              <div class="title-text">历史搜索</div>
              <el-button icon="el-icon-delete" circle size="mini" @click="emptyTag" class="title-button"/>
            </div>
            <el-tag
                class="tag"
                :key="item"
                size="small"
                closable
                v-for="item in historyList"
                @close="removeTag(item)"
                @click="goSearch(item)">
              {{item}}
            </el-tag>
          </div>
        </li>
        <li class="email">
          <i class="el-icon-message"> 1370826644@qq.com</i>
        </li>
        <li class="phone">
          <i class="el-icon-phone"> 400-777-7777</i>
        </li>
      </ul>
  </div>
</template>

<script>

export default {
  name: "Search",
  inject:['reload'],
  data(){
    return{
      key: '',
      historyList: [], //历史搜索记录，存本地
      showList: false,  //验证是否显示历史记录
      logoUrl: 'http://localhost:4000/assets/home/logo.jpg'
    }
  },
  methods:{
    toHome(){
      this.$router.push('/')
    },
    goSearch(item){
      if (this.$route.query){
        //添加跳转路由
        let location = {name: 'Search', params: {key: item.trim() || undefined}};
        location.query = this.$route.query;
        this.$router.push(location);
        //校对标签（搜索关键字不为空串时添加标签）
        if (this.key.trim() !== '') this.checkTag(this.key)
        console.log('搜索框', this.key)
        //重新渲染页面
        this.reload()
      }
    },
    //校对标签
    checkTag(key){
      if (!this.historyList.includes(key)) {
        this.historyList.unshift(key);
        localStorage.setItem("historyList", JSON.stringify(this.historyList));
      }else {
        //有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
        let i = this.historyList.indexOf(key);
        this.historyList.splice(i, 1)
        this.historyList.unshift(key);
        localStorage.setItem("historyList", JSON.stringify(this.historyList));
      }
    },
    //清空历史标签
    emptyTag(){
      localStorage.removeItem('historyList');
      this.historyList = [];
      this.$message.success('清空历史记录成功!')
    },
    //删除历史标签
    removeTag(item) {
      this.historyList.splice(this.historyList.indexOf(item), 1);
      localStorage.setItem('historyList',JSON.stringify(this.historyList));
    },
    //点击搜索框显示历史记录
    showHistoryList(item){
      let searchMsg = document.getElementsByClassName('searchMsg')[0];
      //当前点击的是searchMsg区域则显示历史菜单
      if (item.path[1] == searchMsg || item.path[2] == searchMsg || item.path[3] == searchMsg){
        this.showList = true;
      }else this.showList = false;
      //如果标签存在，则点击标签时隐藏历史记录
      if (item.path[0].localName == 'span')
        this.showList = false;
    },
  },
  mounted() {
    //如果本地存储的数据historyList有值，直接赋值给data中的historyList
    if (JSON.parse(localStorage.getItem("historyList"))) {
      this.historyList = JSON.parse(localStorage.getItem("historyList"));
    }
    //窗口添加点击事件，实现全局检测点击事件
    window.addEventListener('click',this.showHistoryList);
    //添加关键字在搜索框

    //获取location的路径
    let path = location.pathname.split('/')
    //如果路径的前节点为search，则显示关键字
    //例: /search/123 123为搜索关键字  但/cart/sss 不符合
    if (path[path.length -2] === 'search')
      this.key = this.$route.params.key || decodeURI(path.pop())
  },
  beforeDestroy() {
    //组件销毁时，移除点击事件
    window.removeEventListener('click',this.showHistoryList);
  }
}
</script>

<style lang="scss" scoped>
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
li{
  display: block;
  text-align: -webkit-match-parent;
}
.search{
  min-width: 1200px;
  width: 85%;
  margin: 0 auto;
  height: 65%;
}
.searchMsg{
  width: 40%;
  margin: 20px 0 0 150px;
  float: left;
  line-height: 18px;
  text-align: left;
}
.search_main{
  z-index: 99;
  background: white;
  margin-top: 10px;
  border: 1px solid #dcd9d9;
  position: absolute;
  width: calc(100% - 70.5%);
  min-width: 380px;
  border-radius: 10px;
  .title{
    padding-bottom: 5px;
    width: 100%;
    float: left;
    .title-text{
      float: left;
      font-size: 13px;
      color: #6a6868;
      margin: 10px 0 0 10px;
    }
    .title-button{
      float: right;
      margin: 5px 10px 0 0;
    }
  }
  .tag{
    margin: 5px;
  }
  .tag:hover{
    cursor: pointer;
  }
}
.logo{
  padding: 0;
  float: left;
}
.phone{
  line-height: 18px;
  padding: 30px 20px 0 0;
  float: right;
  color: #71797F;
}
.email{
  line-height: 18px;
  padding: 30px 0 0 15px;
  float: right;
  color: #71797F;
}
</style>