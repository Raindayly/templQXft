import Vuex from 'vuex'
import Vue from "vue";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userinfo: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
  },
  mutations: {
    updateUserInfo (state) {
      state.userinfo = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
    }
  }
})
export default store
