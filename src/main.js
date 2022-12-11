import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import VueRouter from "vue-router";
import store from './store'
import * as echarts from 'echarts';
import { initVuePrototype } from "@/libs/initVuePrototype.js"


Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(ElementUI,{size:'small'});
Vue.use(VueRouter)


//初始化vue原型
initVuePrototype(Vue)

export const vm = new Vue({
  router,
  store:store,
  render: h => h(App),
}).$mount('#app')

