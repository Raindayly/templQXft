const utils = {}
import { hexMd5 } from "./md5.js";
import { getStore, rmStore } from "@/utils/localstoreage.js"
import { getMenus } from "@/api/userInfo.js";
import lazyLoading from "./lazyLoading.mjs"

utils.initRouter = async function (vm) {
    const menusRoute = []
    const linkRoute = []
    linkRoute.push({
            path: '/*',
            name: 'error-404',
            meta: {
                title: '404-页面不存在'
            },
            component: 'error-page/404'
        }
    )
    //判断用户是否登录
    const hasUserInfo = !!getStore("userInfo")
    const hasToken = !!getStore("token")
    const isLogin = hasUserInfo && hasToken
    if(!isLogin) {
        vm.$router.push("/login")
        utils.initStore(vm)
        return
    }
    //过滤路由格式
    try {
        const menus =  await getMenus()
        initRoutesNode(menus.result,menusRoute)
        vm.$store.commit("vuexSetMenus",menusRoute)
    } catch (error) {
        utils.initStore(vm)
        vm.$message.error("初始化菜单失败,请重新登录")
        vm.$router.push("/login")
    }
    
}
function initRoutesNode(source,target){
    for (const el of source) {
        el.component = lazyLoading(el.component)
        target.push(el)
        if(el.children.length === 0) continue

        const childTarget = []
        initRoutesNode(el.children,childTarget)
        el.children = childTarget
    }
}

utils.initStore = function(vm){
    rmStore("userInfo")
    rmStore("token")
    if(vm) vm.$store.commit("vuexRmMenus")
}


utils.md5 = function (s){
    return hexMd5(s)
}


export default utils