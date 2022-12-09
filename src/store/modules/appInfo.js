const state = {
    sidebar: {
        opened: true,
        withoutAnimation: false
    },
    device: 'desktop',
    size: 'medium'
}

const actions = {
    toggleSideBar({ commit }) {}
}

const mutations = {
    TOGGLE_SIDEBAR(state) {}
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}