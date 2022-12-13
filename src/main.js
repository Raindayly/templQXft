import Vue from 'vue'

import './initStyle.js'
import '@/styles/index.scss'


import ElementUI from 'element-ui';
import VueRouter from "vue-router";
import * as echarts from 'echarts';
import { initVuePrototype } from "@/libs/initVuePrototype.js"

import App from './App.vue'
import store from './store'
import router from './router'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(ElementUI,{size:'small'});
Vue.use(VueRouter)


//初始化vue原型
initVuePrototype(Vue)

new Vue({
  router,
  store:store,
  render: h => h(App),
}).$mount('#app')

