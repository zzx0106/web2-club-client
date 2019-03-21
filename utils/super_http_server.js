import axios from 'axios';
import config from '../config/config';
import Api from '../api/api';
import { encryptionDatagram, decryptionDatagram } from './tools';
// import Cookies from 'universal-cookie';
axios.defaults.withCredentials = true;
class SuperHttp extends Api {
    /**
     * @param {Boolean} Interceptor 拦截器是否开启
     * @param {Boolean} loading loding功能是否开启
     * @param {Function} extendConfig 拓展属性，可以添加uploadProgress或downloadProgress回调来监听上传或者下载进度
     */

    constructor(interceptor, loading, extendConfig = {}) {
        super();
        this.med = false; // 报文加密
        const { baseServerURL, timeout, withCredentials } = config.axios_config;
        // this.cookies = new Cookies();
        let axiosInstance = axios.create({
            // baseURL: baseServerURL, // 服务端无需base
            timeout,
            withCredentials, //带cookie
            headers: {
                Accept: 'application/json, text/javascript, */*',
                'Content-Type': 'application/json;charset=utf-8',
            },
            ...extendConfig,
        });
        if (interceptor) {
            // http请求拦截器
            axiosInstance.interceptors.request.use(
                (config) => {
                    // const token = this.cookies.get('ck_token');
                    // if (token) config.headers.Authorization = `Bearer ${token}`;
                    if (this.med) {
                        config = config.data
                            ? {
                                  ...config,
                                  data: { med: encryptionDatagram(JSON.parse(config.data), 'aes-256-cbc', this.key) },
                              }
                            : config;
                        return config;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
            // http响应拦截器
            axiosInstance.interceptors.response.use(
                (data) => {
                    if (this.med) {
                        // decryptionDatagram(data.data)
                    }
                    return data.data;
                },
                (error) => {
                    console.log('响应拦截', error);
                    // if (error && error.response.status) {
                    //     switch (error.response.status) {
                    //         case 401:
                    //             error.message = '未授权，请登录';
                    //             break;
                    //         default:
                    //             error.message = '请求失败';
                    //     }
                    // }
                    return Promise.reject(error);
                }
            );
        }
        this.http = axiosInstance;
        // axiosInstance({
        //   //`onUploadProgress`上传进度事件
        //   onUploadProgress: function(progressEvent) {
        //     if (extendConfig['uploadProgress']) {
        //       extendConfig['uploadProgress'](progressEvent);
        //     }
        //   },
        //   //下载进度的事件
        //   onDownloadProgress: function(progressEvent) {
        //     if (extendConfig['downloadProgress']) {
        //       extendConfig['downloadProgress'](progressEvent);
        //     }
        //   },
        // });
        this.loading = loading;
    }
    /**
     * @param {String} url 请求链接
     */
    get(url, headers) {
        return this.http.get(url, headers);
    }
    /**
     * @param {String} url 请求链接
     * @param {Object} body 请求体
     * @param {Object} med 报文体是否加密Message encryption device
     */
    post(url, body, med = {}) {
        const { is_med = false, key = '' } = med;
        this.med = is_med;
        this.key = key;
        return this.http.post(url, JSON.stringify(body));
    }
    // setCookie(cookie) { // （弃用）前端设置cookie，改为httponly模式
    // options（object）：支持RFC 6265中的所有cookie选项
    //     path（string）：cookie路径，使用 / 如果您希望在所有页面上都可以访问cookie，请将其用作路径
    //     expires （Date）：relative max age of the cookie from when the client receives it in second
    //     maxAge （number）：客户端以秒为单位收到cookie时的相对最大年龄
    //     domain （string）：cookie的域（sub.domain.com或.allsubdomains.com）
    //     secure （boolean）：只能通过HTTPS访问吗？
    //     httpOnly （boolean）：只有服务器才能访问cookie吗？

    // this.cookies.set('ck_token', cookie, {
    //     path: '/',
    //     // expires: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 服务器上jwt缓存时间
    //     maxAge: 60 * 60 * 24 * 7, // 服务器上jwt缓存时间
    //     // secure: true,
    //     // httpOnly: true,
    // });
    // }
    /**
     * 降级处理ajax请求
     * @param {String} url 请求链接
     * @param {Object} body 请求体
     */
    levelDown(url = '', body = {}, type = 'GET') {
        this.http = new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            }
            // } else {
            //   requestObj = new ActiveXObject()
            // }
            let sendData = '';
            if (type === 'POST') {
                sendData = JSON.stringify(body);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState === 4) {
                    if (requestObj.status === 200) {
                        let obj = requestObj.response;
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj);
                    } else {
                        reject(requestObj);
                    }
                }
            };
        });
    }
}
export default SuperHttp;
