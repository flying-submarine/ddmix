const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/talk', {
        target : 'https://www.ddmix.info/', 
        changeOrigin : true,
        ws: true, 
        logLevel:"debug",
    }));
};