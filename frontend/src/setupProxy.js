const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api', // 这里`/api`是你在前端代码中用于请求的路径前缀
        createProxyMiddleware({
            target: 'http://localhost:11451', // 这里填写你的后端服务地址
            changeOrigin: true, // 用于修改请求的源
            pathRewrite: {
                '^/api': '' // 这里将请求中的`/api`前缀替换为空，即去掉`/api`
            }
        })
    );
};