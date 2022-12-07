import VueRouter from "vue-router";
import { getToken } from '@/utils/auth' 
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from "@/store";

NProgress.configure({ showSpinner: false }) // NProgress Configuration


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login/login.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect:"/home",
    component: () => import('@/views/pages/Home.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/pages/Main.vue')
      }
    ]
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})


router.beforeEach( async (to, from, next) => {
  // start progress bar
  NProgress.start()

  const whiteList = ['/login', '/auth-redirect']
  const hasToken = !!getToken()

  if(hasToken){
    if (to.path === "/login") {
      next({ path: '/' }) 
      NProgress.done()
    }else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      }else{
        try {

          const { roles } = await store.dispatch("userInfo/getUserInfo")

          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          router.addRoutes(accessRoutes)

          next({...to, replace: true })

        } catch (error) {

          await store.dispatch('userInfo/resetToken')

          Message.error(error || 'Has Error')

          next(`/login?redirect=${to.path}`)

          NProgress.done()
        }
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

router.afterEach((to) => {
  NProgress.done()
})

//重置router要使用这个方法
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


export default router
