import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters'
import userInfo from './modules/userInfo.js'
import roleInfo from './modules/roleInfo.js'
import pageInfo from './modules/pageInfo.js'
import permission from './modules/permission.mjs';


Vue.use(Vuex);

const store = new Vuex.Store({
    getters,
    modules: {
      userInfo,
      roleInfo,
      pageInfo,
      permission
    }
});

export default store;
