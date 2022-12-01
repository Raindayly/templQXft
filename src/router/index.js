import VueRouter from "vue-router";
import { getStore, setStore } from "@/utils/localstoreage";
import { vm } from "@/main"


// path以/开头会被解析为根路径,不管是否在嵌套路由里
let constantRoute = {}
let tempMenus = []
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login/login.vue')
  },
  // {
    
  // }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
    return
  }
  let isTokenTimeOut = getStore("isTokenTimeOut")
  if (isTokenTimeOut == null) {
    if (getStore("user") != null) {
      setStore("isTokenTimeOut", "false")
      next()
    } else {
      tempMenus = []
      next("/login")
      vm.$message.error("本地存储丢失,请重新登录!")
    }
  } else if (isTokenTimeOut) {
    setStore("isTokenTimeOut", "false")
    next("/login")
    vm.$message.error("认证过期,请重新登录!")
  } else {
    if (to.path === "/" || to.path === "/home") {
      setRoutes()
      next("/home/index")
    } else {
      next()
    }
  }
});


export const setRoutes = () => {
  const handleRouter = function (menus) {
    let menu = {};
    let result = []
    for (let i = 0; i < menus.length; i++) {
      let newMenu = menus[i]
      menu = {
        path: newMenu.path,
        name: newMenu.name,
        component: () => import('@/views/' + newMenu.component + '.vue'),
        children: handleRouter(newMenu.children)
      }
      result.push(menu)
    }
    return result;
  }
  const menus = getStore("menus")
  if (!menus) return
  tempMenus = menus
  constantRoute = handleRouter(menus)
  constantRoute.forEach(v => {
    router.addRoute(v)
  })
}

const myHasRoute = function (str) {
  if (typeof str != "string") {
    return false;
  }

  return hasProp(tempMenus, str);
}
const hasProp = function (routes, str) {
  let flag = false


  routes.forEach(v => {
    if (v.path == str) {
      console.log(v.path)
      flag = true
      return flag
    }
    if (v.children != undefined && v.children.length != 0) {
      flag = hasProp(v.children, str)
      return flag
    }
  })
  return flag;

}

export default router
