import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

//先把VueRouter原型对象的push，先保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
//第一个参数：告诉原来push方法，往哪里跳转（传递哪些参数）
//第二个参数；成功回调
//第三个参数；失败回调
VueRouter.prototype.push = function (location, resolve, reject){
  if (resolve && reject) originPush.call(this, location, resolve, reject)
  else originPush.call(this, location, () => {}, () => {})
}
VueRouter.prototype.replace = function (location,resolve,reject){
  if (resolve && reject) originReplace.call(this, location, resolve, reject);
  else originReplace.call(this, location, () => {}, () => {});
}

export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    meta:{
      keepAlive: true,
      defaultComponent: true,
      title: 'Home',
    },
    component: () => import('@/views/Home')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      defaultComponent: false
    },
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      defaultComponent: false
    },
    component: () => import('@/views/Register')
  },
  {
    path: '/goods/:hua_id',
    name: 'Goods',
    meta:{
      keepAlive: true,
      defaultComponent: true
    },
    component: () => import('@/views/Goods'),
  },
  {
    path: '/cart',
    name: 'Cart',
    meta:{
      keepAlive: true,
      defaultComponent: true
    },
    component: () => import('@/views/Cart')
  },
  {
    path: '/search/:key?',
    name: 'Search',
    meta:{
      keepAlive: true,
      defaultComponent: true
    },
    component: () => import('@/views/Search')
  },
  {
    path: '/collection',
    name: 'Collection',
    meta: {
      keepAlive: true,
      defaultComponent: true
    },
    component: () => import('@/views/Collection')
  },
  {
    path: '/history',
    name: 'History',
    meta: {
      keepAlive: true,
      defaultComponent: true
    },
    component: () => import('@/views/History')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/components/Admin'),
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Admin/DashBoard'),
        meta: {title: '主页', icon: 'el-icon-s-home', defaultComponent: false}
      },
      {
        path: 'goods',
        name: 'GoodsManage',
        component: () => import('@/views/Admin/Goods'),
        meta: {title: '商品管理', icon: 'el-icon-s-goods', defaultComponent: false}
      },
      {
        path: 'home',
        name: 'HomeManage',
        component: () => import('@/views/Admin/Home'),
        meta: {title: '专区管理', icon: 'el-icon-s-help', defaultComponent: false}
      },
      {
        path: 'banner',
        name: 'BannerManage',
        component: () => import('@/views/Admin/Banner'),
        meta: {title: '横幅管理', icon: 'el-icon-picture', defaultComponent: false}
      }
    ]
  },
]

const router = new VueRouter({
  mode:'history',
  routes: constantRoutes,
  //默认跳转路由时在页面顶部显示
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
    }
    return {x:0, y:to.meta.savedPosition || 0}
  }
})

//全局守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let identity = store.state.user.identity

  if (token){
    if(to.path == '/login' ||  to.path == '/register'){
      next('/')
    }else {
      if (identity){
        next()
      }else {
        try {
          await store.dispatch('getInfo')
          next()
        }catch (err){
          await store.dispatch('Logout')
          next('/login')
        }
      }
    }
  }else {
    let toPath = to.path
    if (to.path == '/cart' || to.path.indexOf('/admin') != -1)
      next('/login?redirect=' + toPath)
    else {
      if (identity == 'admin')
        next('/admin')
      else next()
    }
  }
})

export default router
