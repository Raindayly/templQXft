import {postRequest,getRequest,postComplexRequest,deleteRequest} from '@/libs/axios.js'

const requestHttp = process.env.NODE_ENV

export const login = function (params) {
    return getRequest(url,params)
}