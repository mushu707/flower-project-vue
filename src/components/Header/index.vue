<template>
  <div class="header">
    <TopNav></TopNav>
    <Search></Search>
  </div>
</template>

<script>
import TopNav from "./TopNav";
import Search from "./Search";
export default {
  name: "Header",
  data(){
    return{
    }
  },
  components:{
    TopNav,
    Search
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: 150px;
  min-width: 1200px;
}
</style>