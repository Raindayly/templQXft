import variables from '@/styles/element-variables.module.scss'
import defaultSettings from '@/settings'

import { setCssVar , getCssVar} from '@/libs/utils.js'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
}

function chengeTheme(name,value) {
    if(getCssVar(name)){
        setCssVar(name,value)
    }
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    },
    CHANGE_THEME: (state, data) => {
        const {name ,value} = data
        chengeTheme(name,value)
    }
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    },
    changeTheme({ commit }, data) {
        commit('CHANGE_THEME', data)
    }
}
  
export default {
    namespaced: true,
    state,
    mutations,
    actions
}