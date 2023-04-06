<template>
  <div>
    <el-button class="user" icon="el-icon-user-solid" @click="drawer = true" circle></el-button>
    <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :with-header="false"
        :show-close="false"
        size="300px"
    >
      <template v-if="token">
        <UserMode
            :data="customer"
            :drawer="drawer"
            :notification="this.notification"
            :exitAccount="this.exitAccount"/>
      </template>

      <template v-else>
        <h3 style="color: lightslategray">请先
          <router-link to="/login" style="text-decoration: none;color: lightcoral">登录</router-link>
        </h3>
        <h3 style="color: lightslategray">还没账户?
          <router-link to="/register" style="text-decoration: none;color: lightcoral">注册</router-link>
        </h3>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import UserMode from './UserMode'
export default {
  name: "User",
  inject: ['reload'],
  data(){
    return{
      drawer: false,
      direction: 'ltr',
      token: localStorage.getItem('TOKEN'),
      customer: {
        containPath: '/manage',
        menuInfo: [
          {id: 1, toPath: '#1', icon: 'user', title: '我的信息', click: true},
          {id: 2, toPath: '#2', icon: 'document', title: '我的订单', click: true},
          {id: 3, toPath: '/cart', icon: 'shopping-cart-2', title: '购物车'},
          {id: 4, toPath: '/collection', icon: 'star-off', title: '我的收藏'},
          {id: 5, toPath: '/history', icon: 'time', title: '历史记录'},
        ]
      },
    }
  },
  components:{
    UserMode
  },
  methods:{
    notification(){
      this.$notify({
        title: '无效应用',
        message: '该功能还未实施!'
      })
    },
    async exitAccount(path){
      await this.$store.dispatch('Logout')
      //如果当前页面为一些特殊页面，则退出账号时返回到主页
      if (this.$route.path == path){
        await this.$router.push('/')
        this.drawer = false
        this.reload()
      }else this.reload()
    },
  },
  mounted() {
    this.$bus.$on('closeDrawer', _ => {
      this.drawer = false
    })
  }
}
</script>

<style scoped>
.user{
  background: #ffffff;
  color: #1873ef;
  z-index: 99;
  position: fixed;
  right: 40px;
  top: 40px;
}
</style>