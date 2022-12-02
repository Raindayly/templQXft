import router from "@/router/index.js"
const pageInfo = {
    state: {
        menus:[]
    },
    mutations: {
        vuexSetMenus (state,data) {
            state.menus = data
            router.addRoute(...data)
        }
    }
}
export default pageInfo;