import {
  addOrUpdateGoodsInfoApi,
  deleteGoodsInfoApi,
  getDetailInfoApi,
  getSearchApi,
} from "@/api";

const state = {
  detailInfo: {},
  searchList: [],
  goodsList: {}
}
const mutations = {
  GETDETAILINFO(state, detailInfo){
    state.detailInfo = detailInfo.goodsInfo
  },
  GETSEARCHINFO(state, searchList){
    state.searchList = searchList.searchList
  },
}
const actions = {
  //获取商品信息
  async getDetailInfo({commit}, data){
    let result = await getDetailInfoApi(data)
    if (result.code == 200){
      commit('GETDETAILINFO', result.data)
      return 'success'
    }else return Promise.reject(new Error('error'))
  },
  //搜索商品
  async getSearchList({commit}, data){
    let result = await getSearchApi(data)
    if (result.code == 200){
      commit('GETSEARCHINFO', result.data)
      return 'success'
    }else return Promise.reject(new Error('error'))
  },
  //添加商品
  async addOrUpdateGoodsInfo({commit}, data){
    let result = await addOrUpdateGoodsInfoApi(data)
    if (result.code == 200) return 'success'
    else return 'error'
  },
  //删除商品
  async deleteGoodsInfo({commit}, data){
    let result = await deleteGoodsInfoApi(data)
    if (result.code == 200) return 'success'
    else return 'error'
  },
}
export default {
  state,
  mutations,
  actions,
}