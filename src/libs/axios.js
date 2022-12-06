import axios from 'axios';
import { getStore, setStore } from "@/utils/localstoreage.js"
import { Message ,Modal} from "element-ui"
import { getToken } from '@/utils/auth';


// 超时设定
axios.defaults.timeout = 300000;

// http request 拦截器
axios.interceptors.request.use(config => {
        config.headers['Authorization'] = 'Bearer ' + getToken()
        return config;
}, err => {
    Message.error('请求超时');
    return Promise.resolve(err);
});

axios.interceptors.response.use(response => {
    return response.data
})

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${url}`,
        params: params,
    });
};

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
    });
};

// json提交复杂参数
export const postComplexRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
    });
};

export const importRequest = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': token,
        }
    });
};

export const putRequest = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'put',
        url: `${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': token,
        }
    });
};
export const putComplexRequest = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'put',
        url: `${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        }
    });
};
export const deleteRequest = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'delete',
        url: `${url}`,
        params: params,
        headers: {
            'token': token,
        }
    });
};
export const deleteComplexRequest = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'delete',
        url: `${url}`,
        params: params,
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        }
    });
};

export const uploadFileRequest = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'post',
        url: `${url}`,
        params: params,
        headers: {
            'token': token,
        }
    });

};
// 下载 post
export const fileUpload = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        },
        responseType: 'blob'
    });
};
//导出excel
export const excelExport = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'get',
        url: `${url}`,
        params: params,
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        },
        responseType: 'blob'
    });
};

//post header自定义参数
export const postHeaderRequest = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': token,
            'userId': JSON.parse(getStore("userInfo")).username
        },
    });
};

//get header自定义参数
export const getHeaderRequest = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'get',
        url: `${url}`,
        params: params,
        headers: {
            'token': token,
            'userId': JSON.parse(getStore("userInfo")).username
        }
    });
};