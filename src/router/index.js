import VueRouter from "vue-router";
import { getStore, rmStore, setStore } from "@/utils/localstoreage";
import utils from "@/libs/utils";
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/pages/Home.vue')
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach( async (to, from, next) => {

  // start progress bar
  NProgress.start()

  const hasToken = getStore("token")

  if(hasToken){
    if (to.path === "/login" || to.path === "/register" || to.name === "error-404") {
      next();
      return
    }else {
      const hasUserInfo = !!getStore("userInfo")
      const hasToken = !!getStore("token")
      if (hasUserInfo && hasToken) {
        if(to.path === "/"){
          next("/home/index")
        }
        next()
        return 
      }else{
        if(to.path !== "/login") next("/login")
        utils.initStore()
        return
      }
    }
  }
  
  
  
});


export default router
