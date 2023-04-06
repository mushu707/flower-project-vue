import Vue from 'vue'
import Vuex from 'vuex'

//需要使用插件一次
Vue.use(Vuex)

//state；仓库存储数据
//mutations：修改state的唯一手段
//action：处理action，可以书写自己的业务逻辑，也可以吃力异步
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便

//引入模块仓库
import user from './user'
import cart from './cart'
import home from './home'
import goods from './goods'

import app from "./admin/app";
import settings from "./admin/settings";
import collection from './collection';

import getters from "./getters";

export default new Vuex.Store({
  //实现Vuex仓库模块式开发存储数据
  modules:{
    user,
    cart,
    home,
    goods,
    collection,
    app,
    settings,
  },
  getters
})