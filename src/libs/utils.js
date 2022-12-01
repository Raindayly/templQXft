const utils = {}
import { hexMd5 } from "./md5.js";
import { getStore } from "@/utils/localstoreage.js"
import { getMenus } from "@/apis/userInfo.js";

utils.initRouter = async function (vm) {
    const menuRoute = []
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
    if(!isLogin) return
    //过滤路由格式
    const menus =  await getMenus()

    initRoutesNode()
    //添加路由
}
function initRoutesNode(source,target){

}

utils.md5 = function (s){
    return hexMd5(s)
}


export default utils