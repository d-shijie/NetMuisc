import axios from "axios";
export function request(config) {
    const instance = axios.create({
        baseURL: "/api",
        timeout: 30000,
        withCredentials: true,

    })
    instance.interceptors.request.use(
        config => {
            if (config.method === 'post') {
                config.data = {
                    ...config.data,
                    _t: Date.now() / 1000
                }
            } else if (config.method === 'get') {
                config.params = {
                    _t: Date.now() / 1000,
                    ...config.params
                }
            }
            return config
        }, function (error) {
            return Promise.reject(error)
        }
    )
    return instance(config)
}
