import {postRequest,getRequest,postComplexRequest,deleteRequest} from '@/libs/axios.js'

const baseUrl = 'http://127.0.0.1:9099'

export const login = function (params) {
    return postComplexRequest(baseUrl+'/login',params)
}

export const getMenus = function (params) {
    return getRequest(baseUrl+'/menu/allmenus',params)
}

export const getUser = function (params) {
    return getRequest(baseUrl+'/user',params)
}

