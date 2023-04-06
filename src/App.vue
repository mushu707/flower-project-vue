<template>
  <div id="app" v-if="isRouterAlive">
    <Header v-if="showComponent"/>

    <router-view/>

    <Footer v-if="showComponent"/>

    <User v-if="identity != 'admin' && showComponent"/>

    <!--  回到顶部按钮  -->
    <el-backtop/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import User from '@/components/User'
export default {
  name: 'App',
  data(){
    return{
      isRouterAlive: true,
      showComponent: true,
      identity: localStorage.getItem('IDENTITY')
    }
  },
  provide(){
    return{
      reload: this.reload,
    }
  },
  components:{
    Header,
    Footer,
    User
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function (){
        this.isRouterAlive = true;
      })
    },
    isMobile(){
      return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  },
  watch:{
    $route(to, from){
      this.showComponent = to.meta.defaultComponent
      if (this.isMobile() && !this.$route.path.includes('/admin')){
        location.href = 'http://localhost:8081';
      };
    },
  },
}
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
