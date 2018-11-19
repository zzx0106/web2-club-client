const config = {
    axios_config: {
        baseClientURL: 'http://localhost:7001', // 客户端请求
        baseServerURL: 'http://localhost:3000', // 服务端请求
        timeout: '5000',
        withCredentials: true, //是否携带cookie
    },
};
export default config;
// module.exports = config;
