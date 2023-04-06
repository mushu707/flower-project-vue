<template>
  <div style="width: 100%; height: 100%; overflow: hidden;">
    <el-row>
      <el-col :span="12">
        <el-avatar :size="60" :src="this.getInfo.imageUrl == null ? defaultUrl : this.getInfo.imageUrl" class="avatar"/>
      </el-col>
      <el-col :span="12">
        <div class="info">
          <span title="用户">
            <i class="el-icon-user-solid"/>
            {{this.getInfo.name}}
          </span>
          <span title="积分">
            <i class="el-icon-s-data"/>
            999
          </span>
        </div>
      </el-col>
    </el-row>
    <el-menu router>
      <el-menu-item
          @click="item.click == undefined ? toPath(item.toPath) : notification()"
          v-for="item in data.menuInfo"
          :key="item.id">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <el-menu-item index="/" @click="exitAccount(path)">
        <i class="el-icon-circle-close"></i>
        <span slot="title">退出账号</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "UserMode",
  props: ['data', 'notification', 'exitAccount'],
  data(){
    return{
      path: this.data.containPath,
      defaultUrl: 'http://localhost:4000/assets/user/user.png',
    }
  },
  computed: {
    getInfo(){
      return this.$store.state.user.info;
    }
  },
  methods: {
    toPath(path){
      if (this.$route.path == path){
        this.$notify({
          title: '警告',
          message: '你已在当前页面，请勿多次跳转'
        })
      }else {
        this.$bus.$emit('closeDrawer')
        this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
  display: flex;
  height: 94px;
  flex-flow: column;
  justify-content: space-evenly;

  span{
    color: #798d9a;
    text-align: left;
    font-size: 18px;
  }
}
.avatar{
  margin: 15px 0 15px 50px;
}
</style>