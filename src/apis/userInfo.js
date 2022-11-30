import {postRequest,getRequest,postComplexRequest,deleteRequest} from '@/libs/axios.js'

const baseUrl = 'http://127.0.0.1:9099'

export const login = function (params) {
    return postComplexRequest(baseUrl+'/login',params)
}