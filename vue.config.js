const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    devServer: {
        https: false,
        open: true,
        proxy: {
            '/api': {

                target: 'https://nicemusic-api.lxhcool.cn/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    },
}
