import VueRouter from "vue-router";
import {getstore, setstore} from "@/utils/localstoreage";
import {vm} from "@/main"


// path以/开头会被解析为根路径,不管是否在嵌套路由里
let constantRoute = {}
let tempMenus = []
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/LoginPage')
  }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
};
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
};

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
    return
  }
  let isTokenTimeOut = getstore("isTokenTimeOut")
  if (isTokenTimeOut == null) {
    if(getstore("user")!=null){
      setstore("isTokenTimeOut", "false")
      next()
    }else {
      tempMenus=[]
      next("/login")
      vm.$message.error("本地存储丢失,请重新登录!")
    }
  } else if (isTokenTimeOut) {
    setstore("isTokenTimeOut", "false")
    next("/login")
    vm.$message.error("认证过期,请重新登录!")
  } else {
    if (to.path === "/"||to.path==="/home") {
      next("/home/index")
    } else {

      next()
    }
  }
});

/**
 *
 * @param menus children对象
 * @returns [] , 递归返回children
 */
export const  handleRouter = function (menus) {
  let menu = {};
  let result = []
  for (let i = 0; i < menus.length ; i++) {
    let newMenu = menus[i]
    menu = {
      path: newMenu.path,
      name: newMenu.name,
      component: () => import('@/views/' + newMenu.component + '.vue'),
      children : handleRouter(newMenu.children)
    }
    result.push(menu)
  }
  return result;
}

export const setRoutes = () => {
  const menus = getstore("menus")
  console.log(menus)
  if(!menus)return
  tempMenus = menus
  constantRoute = handleRouter(menus)
  constantRoute.forEach(v=>{
    router.addRoute(v)
  })
}

// constantRoute = {
  //   path: '/',
  //   name: "index",
  //   component: () => import("@/views/pages/Home"),
  //   children: [
  //     {
  //       path:"/person",
  //       name:"person",
  //       component: () => import("@/views/pages/Person"),
  //     }
  //   ]
  // }
  // if (menus.length != 0) {
  //   menus.forEach(menu => {
  //     if (!router.getRoutes().map(v => v.name).includes(menu.name)) {
  //       let readyMenu = {
  //         path: menu.path,
  //         name: menu.name,
  //         component: () => import('@/views/' + menu.component + '.vue')
  //       }
  //       constantRoute.children.push(readyMenu)
  //     }
  //     if (menu.children != null) {
  //       if (!router.getRoutes().map(v => v.name).includes(menu.name)) {
  //         menu.children.forEach(menu => {
  //           let readyMenu = {
  //             path: menu.path ? menu.path.slice(1) : menu.path,
  //             name: menu.name,
  //             component: () => import('@/views/' + menu.component + '.vue')
  //           }
  //           constantRoute.children.push(readyMenu)
  //         })
  //       }
  //     }
  //   })
  // }
  // !router.getRoutes().map(v => v.name).includes("index")
  // if () {

  //
  // }

//刷新之后让路由重新设置一下

// let routeList = router.getRoutes().map(v => {
//   v.name
// })
// if (!routeList.includes("index")&&getstore("user")!=null) {
//   setRoutes()
// }
const myHasRoute = function (str) {
  if(typeof str != "string" ){
    return false;
  }

  return hasProp(tempMenus,str);
}
const hasProp = function (routes,str) {
  let flag = false


  routes.forEach(v => {
    if(v.path==str){
      console.log(v.path)
      flag = true
      return flag
    }
    if(v.children!=undefined && v.children.length!=0){
      flag = hasProp(v.children,str)
      return flag
    }
  })
  return flag;

}
setRoutes()

export default router
