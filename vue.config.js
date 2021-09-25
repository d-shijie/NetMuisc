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
                target: 'http://localhost:3000',
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
