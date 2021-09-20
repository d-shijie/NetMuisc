import { request } from "./request";
//所有MV
export function getAllMv(area,type, order, limit,offset,) {
    return request({
        url: "/mv/all",
        params: {
            area,
            type,
            order,
            limit,
            offset
        }
    })
}
// mv播放地址
export function getMVUrl(id) {
    return request({
        url: "/mv/url",
        params: {
            id
        }
    })
}
// mv信息
export function getMVInfo(id) {
    return request({
        url: "/mv/detail",
        params: {
            mvid: id
        }
    })
}
// mv评论转发数
export function getMVCount(id) {
    return request({
        url: "/mv/detail/info",
        params: {
            mvid: id,

        }
    })
}
// mv评论
export function getMVComment(id, limit, offset) {
    return request({
        url: "/comment/mv",
        params: {
            id,
            limit,
            offset
        }
    })
}
// 相似MV
export function getSimiMV(id) {
    return request({
        url: "/simi/mv",
        params: {
            mvid: id
        }
    })
}
// mv排行
export function getMVBank(limit, area, offset) {
    return request({
        url: "/top/mv",
        params: {
            limit,
            area,
            offset
        }
    })
}