import crypto from 'crypto';

// 修改log的实现方式
// console.j_log = function(...params) {
//     let result = {};
//     params.forEach((item, index) => {
//         if (item.constructor.prototype.toString() === '[object Object]') {
//             result[index] = JSON.parse(JSON.stringify(item));
//         } else {
//             result[index] = item;
//         }
//     });
//     return result;
// };
// const _log = console.log;
// try {
// console.log = function() {
// return  arguments;}
//     var param = '';
//     // if (arguments.length > 0) param = arguments[0];
//     // if (param.constructor.prototype.toString() === '[object Object]') {
//     //     if (Object.keys(param).length > 0) return _log(JSON.parse(JSON.stringify(param)));
//     //     return _log(param);
//     // }
//     let params = '';
//     let params_arr = [];
//     if (arguments.length > 0) {
//         // 重建数组
//         for (let i = 0; i < arguments.length; i++) {
//             let item = arguments[i];
//             console.debug(item)
//             if (item.constructor.prototype.toString() === '[object Object]') {
//                 if (Object.keys(item).length > 0) {
//                     params_arr.push(JSON.parse(JSON.stringify(item)));
//                     continue;
//                 }
//             }
//             params_arr.push(item);
//             if (i === arguments.length - 1) {
//                 _log(params_arr);
//             }
//         }
//     } else {
//         _log('');
//     }
// };
// } catch (error) {
//     console.error(error);
// }
/**
 * 得到storage
 * @param {String|Array}
 */
const getStorage = (key = '') => {
    if (!!!key) return '';
    if (Object.prototype.toString.call(key) === '[object Array]') {
        return key.map((item) => {
            return JSON.parse(window.localStorage.getItem(key)).data;
        });
    } else if (Object.prototype.toString.call(key) === '[object String]') {
        return JSON.parse(window.localStorage.getItem(key)).data;
    } else {
        return '';
    }
};
/**
 * 设置storage
 * @param {String} key
 * @param {any} value
 */
const setStorage = (key = '', value = '') => {
    if (!!!key || !!!value) new Error('key or value is error');
    window.localStorage.setItem(key, JSON.stringify({ data: value }));
};
const createDate = function(Time) {
    'use static';
    const time = new Date(Time);
    const nowtime = new Date();
    let diff = nowtime.getTime() - time.getTime();
    if (diff / 1000 / 3600 / 24 / 30 / 12 > 1) {
        return `${Math.floor(diff / 1000 / 3600 / 24 / 30 / 12)}年前`;
    } else if (diff / 1000 / 3600 / 24 / 30 > 1) {
        return `${Math.floor(diff / 1000 / 3600 / 24 / 30)}个月前`;
    } else if (diff / 1000 / 3600 / 24 > 1) {
        return `${Math.floor(diff / 1000 / 3600 / 24)}天前`;
    } else if (diff / 1000 / 3600 > 1) {
        return `${Math.floor(diff / 1000 / 3600)}小时前`;
    } else {
        return '刚刚';
    }
};
const lastUpdate = function(Time) {
    'use static';
    const time = new Date(Time);
    const nowtime = new Date();
    let diff = nowtime.getTime() - time.getTime();
    if (diff / 1000 / 3600 / 24 / 30 / 12 > 1) {
        return `${Math.floor(diff / 1000 / 3600 / 24 / 30 / 12)}年前`;
    } else if (diff / 1000 / 3600 / 24 / 30 > 1) {
        return `${Math.floor(diff / 1000 / 3600 / 24 / 30)}个月前`;
    } else if (diff / 1000 / 3600 / 24 > 1) {
        return `${Math.floor(diff / 1000 / 3600 / 24)}天前`;
    } else if (diff / 1000 / 3600 > 1) {
        return `${Math.floor(diff / 1000 / 3600)}小时前`;
    } else {
        return '刚刚';
    }
};
/**
 * @param {String} password
 * @return {String} newPassword
 */
const epassword = (password) => {
    const newpassword = Md5(Md5(password).substr(2, 7) + Md5(password));
    return newpassword;
};
const Md5 = (password) => {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
};

/**
 * 报文加密
 * @param {Object} params 报文
 * @param {String} algorithm 算法规则 默认aes-256-cbc
 * @param {String} key 秘钥
 * @return {String} encrypted
 */
const encryptionDatagram = (params, algorithm = 'aes-256-cbc', key = '') => {
    var encrypted = '';
    var cip = crypto.createCipher(algorithm, key);
    // 将数据 以 utf8 的格式输入 以 hex格式输出
    encrypted += cip.update(JSON.stringify(params), 'utf8', 'hex');
    encrypted += cip.final('hex');
    return encrypted;
};
/**
 * 报文解密
 * @param {Object} encrypted 加密报文
 * @param {String} algorithm 算法规则 默认aes-256-cbc
 * @param {String} key 秘钥
 * @return {String} decrypted 解密报文
 */
const decryptionDatagram = (encrypted, algorithm = 'aes-256-cbc', key = '') => {
    var decrypted = '';
    var decipher = crypto.createDecipher(algorithm, key);
    // 将数据 以 hex 的格式输入 以 utf8格式输出
    decrypted += decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
};

const getCookie = (tk) => {
    if (document.cookie.length > 0) {
        tk_index_start = document.cookie.indexOf(`${tk}=`);
        if (tk_index_start !== -1) {
            tk_index_start = tk_index_start + tk.length + 1;
            tk_index_end = document.cookie.indexOf(':', tk_index_start);
            if (tk_index_end === -1) {
                tk_index_end = document.cookie.length;
            }
            console.log('cookie', unescape(document.cookie.substring(tk_index_start, tk_index_end)));
            return unescape(document.cookie.substring(tk_index_start, tk_index_end));
        }
    }
};
const clearCookie = (name) => {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--; ) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString(); //清除当前域名下的,例如：m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString(); //清除当前域名下的，例如 .m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com
        }
    }
};
// 将用户信息通过aes加密存储全局
const setUserDataInGlobal = (data) => {
    let _data = {};
    Object.keys(data.data).filter((item) => {
        if (item === 'history_login_ip' || item === 'token') {
        } else {
            _data[item] = data.data[item];
        }
    });
    const eData = encryptionDatagram(_data, 'aes-256-cbc', 'xiange666');
    setStorage('uz2', eData);
};
const getUserDataInGlobal = () => {
    const data = getStorage('uz2');

    return decryptionDatagram(data, 'aes-256-cbc', 'xiange666');
};

// scrollTop animation
const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil((difference / duration) * 50);

    function scroll(start, end, step) {
        if (start === end) {
            endCallback && endCallback();
            return;
        }

        let d = start + step > end ? end : start + step;
        if (start > end) {
            d = start - step < end ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
};

// const isLogin = (headers,) => {

// };
const globalMethod = () => {
    // 移除数组中某个元素
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
};
export {
    createDate,
    lastUpdate,
    epassword,
    encryptionDatagram,
    decryptionDatagram,
    getCookie,
    delCookie,
    setUserData,
    getUserData,
    getUserDataInGlobal,
    setUserDataInGlobal,
    scrollTop,
    isLogin,
    globalMethod,
};
