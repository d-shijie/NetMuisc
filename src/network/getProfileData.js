import { request } from "./request";
import id from "element-ui/src/locale/lang/id";
// 获取账号详情
export function getProfileDetail(id) {
    return request({
        url: "/user/detail",
        params: {
            uid: id
        }
    })
}
// 获取账号信息
export function getUserAccount() {
    return request({
        url: '/user/account'
    })
}
// 获取用户歌单，收藏等数量
export function getUserSubcount() {
    return request({
        url: '/user/subcount'
    })
}
// 获取用户信息
export function getUserInfo(uid) {
    return request({
        url: '/user/detail',
        params: {
            uid
        }
    })
}
// 签到
export function singIn() {
    return request({
        url: '/yunbei/sign',
        methods: 'post'
    })
}
//获取用户歌单
export function getUserPlayList(uid) {
    return request({
        url: '/user/playlist',
        params: {
            uid
        }
    })
}
// 获取用户动态
export function getUserGender(uid, limit, offset) {
    return request({
        url: '/user/event',
        params: {
            uid,
            limit,
            offset
        }
    })
}
// 获取用户关注列表
export function getUserFollows(uid) {
    return request({
        url: '/user/follows',
        params: {
            uid
        }
    })
}
// 获取用户粉丝列表
export function getUserFolloweds(uid) {
    return request({
        url: '/user/followeds',
        params: {
            uid
        }
    })
}