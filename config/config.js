const config = {
    axios_config: {
        // baseClientURL: '//localhost:7001', // 客户端请求
        baseClientURL: '//web2.web2club.club/api', // 客户端请求
        baseServerURL: '//web2.web2club.club/api', // 服务端请求
        // baseServerURL: '//localhost:3000', // 服务端请求
        timeout: '5000',
        withCredentials: true, //是否携带cookie
    },
};
export default config;
// module.exports = config;
