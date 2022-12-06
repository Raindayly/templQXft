import { getStore, setStore } from "@/utils/localstoreage";
import { login , getUserInfo } from "@/api/userInfo";
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
    token: getStore("Token"),
    avatar: '',
    roles: []
}

const mutations = {
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
      },
    RM_TOKEN: (state) => {
        state.token = ''
    },
    RM_ROLES: (state) => {
        state.roles = []
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { userName, password } = userInfo 
        return new Promise((resolve, reject) => {
            login({ username: userName, password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    

    // get user info
    getUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo({token: state.token}).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { roles, name, avatar } = data.userInfo
                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', roles)
                // commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                // commit('SET_INTRODUCTION', introduction)
                resolve(data.userInfo)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()

                // // reset visited views and cached views
                // // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                // dispatch('tagsView/delAllViews', null, { root: true })

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    //reset token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};