import axios from 'axios';
import { getStore, setStore } from "@/utils/localstoreage.js"
import { Message ,Modal} from "element-ui"


// 超时设定
axios.defaults.timeout = 300000;

// http request 拦截器
axios.interceptors.request.use(config => {
    return config;
}, err => {
    Message.error('请求超时');
    return Promise.resolve(err);
});

axios.interceptors.response.use(response => {
    const data = response.data
    if(!data.success){
        if(data.message !== null){
            Message.error(data.message)
        }else{
            Message.error("未知错误")
        }
    }
    return data;
}, (err) => {
    // 返回状态码不为200时候的错误处理
    Message.error(err.toString());
    return Promise.resolve(err);
})

export const getRequest = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'get',
        url: `${url}`,
        params: params,
        headers: {
            'token': token,
        }
    });
};

export const postRequest = (url, params) => {
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
        },
    });
};

// json提交复杂参数
export const postComplexRequest = (url, params) => {
    let token = getStore('token')
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        }
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