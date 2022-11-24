import { getStore, setStore } from "@/utils/localstoreage";

export const initRoute = function (vm) {

    const remoteRoutes = [];
    const localRoutes = [];

    // 404路由需要和动态路由一起注入
    const route404 = [{
        path: '/*',
        name: 'error-404',
        meta: {
            title: '404-页面不存在'
        },
        component: 'error-page/404'
    }];

    // 判断用户是否登录
    let userInfo = getStore('userInfo')
    if (userInfo === null || userInfo === "" || userInfo === undefined) {
        // 未登录
        return;
    }


    getMenuList({
        userId: userId,
        tenantId: JSON.parse(Cookies.get("userInfo")).tenantId,
    }).then(res => {
        let menuData = res.result;
        if (menuData === null || menuData === "" || menuData === undefined) {
            return;
        }
        util.initRouterNode(constRoutes, menuData); //生成左侧一级菜单
        util.initRouterNode(otherRoutes, route404);  //生成左侧子菜单
        // 添加主界面路由
        vm.$store.commit('updateAppRouter', constRoutes.filter(item => item.children.length > 0));
        // 添加全局路由
        vm.$store.commit('updateDefaultRouter', otherRoutes);
        // 刷新界面菜单
        vm.$store.commit('updateMenulist', constRoutes.filter(item => item.children.length > 0));

        let tagsList = [];
        vm.$store.state.app.routers.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        vm.$store.commit('setTagsList', tagsList);
    });
}