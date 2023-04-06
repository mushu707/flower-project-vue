import {getCollectionApi} from "@/api";

const state = {
  collection: []
}
const mutations = {
  SETCOLLECTION(state, collection){
    state.collection = collection;
  }
}
const actions = {
  async getCollection({commit}){
    let result = await getCollectionApi();
    if (result.code == 200){
      commit('SETCOLLECTION', result.data.collectionData);
      return 'success'
    }else return Promise.reject(new Error('error'));
  }
}

export default {
  state,
  actions,
  mutations
}