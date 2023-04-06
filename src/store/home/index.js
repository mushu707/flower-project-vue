import {getHomeInfo} from "@/api";

const state = {
  homeInfo: [],
  bannerInfo: [],
  goodsInfo: {}
}
const mutations = {
  GETHOMEINFO(state, data){
    state.homeInfo = data.homeList
    state.bannerInfo = data.bannerList
    state.goodsInfo = data.goodsList
  }
}
const actions = {
  async getHomeInfo({commit}){
    let result = await getHomeInfo()
    if (result.code == 200){
      commit('GETHOMEINFO', result.data)
      return 'success'
    }else return Promise.reject(new Error('error'))
  }
}

export default {
  state,
  mutations,
  actions,
}