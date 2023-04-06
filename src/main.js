import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from "vue-particles";
import * as API from '@/api'
import store from '@/store'

Vue.use(ElementUI);
Vue.use(VueParticles);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
