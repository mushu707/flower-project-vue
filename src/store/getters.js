const getters = {
  //admin
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  //home
  homeInfo: state => state.home.homeInfo,
  bannerInfo: state => state.home.bannerInfo,
  goodsInfo: state => type => state.home.goodsInfo[type],

  //goods
  detailInfo: state => state.goods.detailInfo,
  searchList: state => state.goods.searchList,
  goodsList: state => state.goods.goodsList,

  //cart
  cartList: state => state.cart.cartList,

  //collection
  collection: state => state.collection.collection
}
export default getters
