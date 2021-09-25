import { request } from "./request";
// 视频分类标签
export function getVideoTags() {
    return request({
        url: "/video/group/list"
    })
}
// 视频分类列表
export function getVideoCategory() {
    return request({
        url: "/video/category/list"
    })
}
// 获取视频列表
export function getVideos(id, offset) {
    return request({
        url: "/video/group",
        params: {
            id,
            offset
        }
    })
}
// 视屏播放地址
export function getVideoUrl(id) {
    return request({
        url: "/video/url",
        params: {
            id
        }
    })
}
// 视频详情
export function getVideoDetail(id) {
    return request({
        url: "/video/detail",
        params: {
            id
        }
    })
}
// 相关视频
export function getSimilarVideos(id) {
    return request({
        url: "/related/allvideo",
        params: {
            id
        }
    })
}
// 视频评论转发等数据
export function getVideoInfo(vid) {
    return request({
        url: "/video/detail/info",
        params: {
            vid
        }
    })
}
//视频评论
export function getVideoComment(id, limit, offset) {
    return request({
        url: '/comment/video',
        params: {
            id,
            limit,
            offset
        }
    })
}
// 评论点赞
export function like(query) {
    return request({
        url: '/comment/like',
        // method:'post',
        params: query
    })
}
// 收藏视频
export function subVideo(query){
    return request({
        url:'/video/sub',
        params:query
    })
}