import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './modules/userInfo.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 状态
        userinfo: ''
    },
    mutations: {
        // 改变方法
        updateUserInfo (state) {
          state.userinfo = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
        }
    },
    actions: {
    },
    getters:{
    },
    modules: {
      userInfo
    }
});

export default store;
