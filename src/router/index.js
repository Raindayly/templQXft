import VueRouter from "vue-router";
import { getStore, rmStore, setStore } from "@/utils/localstoreage";
import utils from "@/libs/utils";
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from "@/store";

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

  console.log(to);
  // start progress bar
  NProgress.start()

  const whiteList = ['/login', '/auth-redirect']
  const hasToken = !!getStore("token")
  const hasUserInfo = !!getStore("userInfo")

  if(hasToken){
    if (to.path === "/login") {
      next("/");
      NProgress.done()
    }else {
      if (hasUserInfo) {
        if(to.path === "/"){
          next("/home/index")
        }
        next() 
      }else{
        await store.dispatch("userInfo/getUserInfo")
        if(to.path !== "/login") next("/login")
        utils.initStore()
      }
    }
  }else{
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  
  
  
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
