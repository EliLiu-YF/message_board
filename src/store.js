import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录状态
    isLogin: false,
    // 登录的id
    loginUser: '',
    //登录的用户名
    loginUserName: ''
    // 留言
  },
  mutations: {
    handleLoginUserName(state, loginUserName) {
      state.loginUserName = loginUserName;
    },
    handleIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    handleLoginUser(state, user) {
      state.loginUser = user;
    }
  },
  actions: {

  }
})
