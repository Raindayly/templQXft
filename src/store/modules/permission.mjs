import lazyLoading from "../../libs/lazyLoading.mjs"
import { getMenus } from "@/api/userInfo.js";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
 function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}



/**
 * Filter asynchronous routing tables by recursion
 * @param routes async routes
 * @return resultRoutes
 */
export function filterAsyncRoutes(routes,roles){
    let resultRoutes = []
    routes.forEach(route => {
        // 使用解构赋值实现浅拷贝 , 使用深拷贝更安全
        const tmp = { ...route }
        tmp.component = lazyLoading(tmp.component)
        if(hasPermission(roles, tmp)){
            if(tmp.children){
                tmp.children = filterAsyncRoutes(tmp.children,tmp.roles)
            }
            resultRoutes.push(tmp)
        }

    });
    return resultRoutes
}

const state = {
    routes: [],
    asyncRoutes: []
}

const actions = {
    generateRoutes({commit},roles){
        return new Promise((resolve, reject) => {
            getMenus().then(res=>{
                const { menuTree } = res.data
                const routes = filterAsyncRoutes(menuTree,roles)
                console.log(routes);
                commit("SET_ROUTES", routes)
                resolve(routes)
            })
        })
    }
}

const mutations = {
    SET_ROUTES(state, routes){
        state.routes = routes
        state.asyncRoutes = filterAsyncRoutes(routes)
    }
}

export default {
    /**
     * namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个模块名拼接。
     * this.$store.commit(“userInfo/setUserInfo”,userInfo)
     * $store.state.userInfo.userName
     */
    namespaced: true,
    state,
    mutations,
    actions,
}
