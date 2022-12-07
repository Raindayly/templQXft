import router from "@/router/index.js"

const state = {
    menus: []
}

const actions = {

}

const mutations = {
    SET_MENUS (state,data) {
        state.menus = data
    },
    DEL_MENUS(state){
        state.menus = []
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
};