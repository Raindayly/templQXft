import VueRouter from "vue-router";
import { getStore, rmStore, setStore } from "@/utils/localstoreage";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login/login.vue')
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
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
      next("/login")
      rmStore("userInfo")
      rmStore("token")
      return
    }


    // if(to.path === "")
  }
  
  
  
});


export default router
