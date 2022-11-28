import axios from 'axios';

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
    switch (data.code) {
        case 401:
            // debugger
            // 未登录 清除已登录状态
            Cookies.set('userInfo', '');
            setStore('accessToken', '');
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