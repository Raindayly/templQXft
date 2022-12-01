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
    console.log(response);
    const data = response.data
    console.log(data);  
    switch (data.code) {
        case 200:
            if (data.message !== null) {
                Message.success(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        case 401:
            // debugger
            // 未登录 清除已登录状态
            Cookies.set('userInfo', '');
            setStore('token', '');
            router.push('/login');
            break;
        case 403:
            // 没有权限
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        case 500:
            // 错误
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        case 600:
            // 导入异常
            if (data.message !== null) {
                Message.error(data.message, 10);
            } else {
                Message.error("未知错误");
            }
            break;
        case 101:
            // token过期
            if (data.message !== null) {
                Modal.info({
                    title: '提示',
                    content: data.message,
                    onOk: function () {
                        // 退出登录
                        Cookies.remove('userInfo');
                        Cookies.remove('access');
                        localStorage.clear();
                        // // 强制刷新页面 重新加载router
                        location.reload();
                    }
                });
            } else {
                Message.error("未知错误");
            }
            break;
        default:
            return data;
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