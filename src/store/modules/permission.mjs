import lazyLoading from "../../libs/lazyLoading.mjs"
import { getMenus } from "@/api/userInfo.js";


/**
 * Filter asynchronous routing tables by recursion
 * @param routes async routes
 * @return resultRoutes
 */
export function filterAsyncRoutes(routes){
    let resultRoutes = []
    routes.forEach(route => {
        // 使用解构赋值实现浅拷贝 , 使用深拷贝更安全
        const tmp = { ...route }
        tmp.component = lazyLoading(tmp.component)
        if(tmp.children){
            tmp.children = filterAsyncRoutes(tmp.children)
        }
        resultRoutes.push(tmp)
    });
    return resultRoutes
}

const state = {
    routes: [],
    asyncRoutes: []
}

const action = {
    generateRoutes({commit}){
        return new Promise((resolve, reject) => {
            getMenus().then(res=>{
                const { result } = res
                const routes = filterAsyncRoutes(result)
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
    action,
    mutations
}
