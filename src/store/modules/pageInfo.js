import router from "@/router/index.js"
const pageInfo = {
    state: {
        menus:[]
    },
    mutations: {
        vuexSetMenus (state,data) {
            state.menus = data
            console.log(data);
            router.addRoute(...data)
        },
        vuexRmMenus(state){
            state.menus = []
            // router.removeRoutes()
        }
    }       
}

export default pageInfo;