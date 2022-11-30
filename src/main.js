import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import request from "@/utils/request";
import VueRouter from "vue-router";
import store from './store'
import * as echarts from 'echarts';
import '@/styles/element-variables.scss'
import {getStore} from "@/utils/localstoreage";
import utils from "@/libs/utils.js"

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(ElementUI,{size:'small'});
Vue.prototype.request = request;
Vue.use(VueRouter)

export const vm = new Vue({
  router,
  store:store,
  render: h => h(App),
  mounted() {
    utils.initRouter(this)
  },
}).$mount('#app')

