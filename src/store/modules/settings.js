import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
}

function chengeTheme(name,value) {
    console.log(getCssVar(name));
    if(getCssVar(name)){
        setCssVar(name,value)
    }
}
function setCssVar(cssvar,color){
    cssvar = '--' + cssvar 
    document.getElementsByTagName('body')[0].style.setProperty(cssvar,color)
}

function getCssVar(cssvar){
    cssvar = '--' + cssvar
    return document.getElementsByTagName('body')[0].style.getPropertyValue(cssvar)
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