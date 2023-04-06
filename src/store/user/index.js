import {getInfoApi, LoginApi, LogoutApi, RegisterApi} from '@/api'

const state = {
  token: localStorage.getItem('TOKEN'),
  info: {}
}
const mutations = {
  USERINFO(state, info){
    state.info = info
  },
  SETTOKEN(state, token){
    state.token = token
  },
  USERLOGOUT(state){
    state.token = ''
    state.info = {}
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('IDENTITY')
  }
}
const actions = {
  //用户登录
  async Login({commit}, data){
    let result = await LoginApi(data)
    if (result.code == 200){
      const {token, identity} = result.data
      commit('SETTOKEN', token)
      localStorage.setItem('TOKEN', token)
      localStorage.setItem('IDENTITY', identity)
      return 'success'
    }else return Promise.reject(new Error('error'))
  },

  //用户注册
  async Register({commit}, data){
    let result = await RegisterApi(data)
    if (result.code == 200) {
      const {token, identity} = result.data
      commit('SETTOKEN', token)
      localStorage.setItem('TOKEN', token)
      localStorage.setItem('IDENTITY', identity)
      return 'register success'
    }
    else if (result.code == 403) return 'existed user'
    else return Promise.reject(new Error('register error'))
  },

  async getInfo({commit}) {
    let result = await getInfoApi()
    if (result.code == 200) {
      commit('USERINFO', result.data)
      return 'success'
    } else return Promise.reject(new Error('error'))
  },

  async Logout({commit}){
    let result = await LogoutApi()
    if (result.code == 200){
      commit('USERLOGOUT')
      return 'success'
    }else return Promise.reject(new Error('error'))
  }
}

export default {
  state,
  mutations,
  actions,
}