import { request } from "./request";
// 获取歌单详情
export function getMusicListDetail(id) {
    return request({
        url: "/playlist/detail",
        params: {
            id
        }
    })
}
// 获取歌单评论
export function getMusicListComments(id, limit, offset) {
    return request({
        url: "/comment/playlist",
        params: {
            id,
            limit,
            offset
        }
    })
}
// 获取歌单收藏者
export function getMusicListSubs(id, limit, offset) {
    return request({
        url: "/playlist/subscribers",
        params: {
            id,
            limit,
            offset
        }
    })
}
// 获取新音乐
export function getNewMusic(type) {
    return request({
        url: "/top/song",
        params: {
            type
        }
    })
}
// 获取新碟
export function getNewDish(limit, offset, area, type, month) {
    return request({
        url: "/top/album",
        params: {
            limit,
            offset,
            area,
            type,
            month
        }
    })
}
// 获取音乐url
export function getMusicUrl(id) {
    return request({
        url: '/song/url',
        params: {
            id
        }
    })
}