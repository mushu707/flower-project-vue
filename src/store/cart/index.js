import {addCartApi, deleteCartApi, getCartList, updateCartApi} from "@/api";

const state = {
  cartList: [],
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList.cartList;
  }
}
const actions = {
  async getCartList({commit}){
    let result = await getCartList()
    if (result.code == 200){
      commit('GETCARTLIST', result.data)
      return 'success'
    }else return Promise.reject(new Error('error'))
  },
  async addCart({commit}, data){
    let result = await addCartApi(data)
    if (result.code == 200) return 'success'
    else return 'error'
  },
  async deleteCart({commit}, data){
    let result = await deleteCartApi(data)
    if (result.code == 200) return  'success'
    else return 'error'
  },
  async updateCart({commit}, data){
    let result = await updateCartApi(data)
    if (result.code == 200) return 'success'
    else return 'error'
  }
}
const getters = {
  updateInfo(state) {
    let info = []
    for (const index in state.cartList) {
      let item = state.cartList[index]
      info[index] = {name: item.name, buy_count: item.buy_count, isChecked: item.checkState ? 1 : 0}
    }
    return info;
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}