const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/talk', {
        target : 'https://pre-llm-clouddoc.alibaba-inc.com', 
        changeOrigin : true,
        ws: true, 
        logLevel:"debug",
    }));
};