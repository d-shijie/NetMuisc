import originJsonp from "jsonp"
export default function jsonp (url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise((resolve, reject) => {
        originJsonp(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}
/*
  封装url参数的拼接
 */
function param (data) {
    let url = ''
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        // 防止参数为中文时出现乱码，把字符串作为 URI 组件进行编码
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}

