const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api/posts', {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api/posts': '/posts'}
    }));
}