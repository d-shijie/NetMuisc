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
        url: '/daily_signin',
        methods: 'post',
        data: {
            type: 1
        }
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
// 发送/回复评论
export function sendComment(t, type, id, content, commentId) {
    return request({
        url: '/comment',
        params: {
            t, type, id, content, commentId
        }
    })
}
// 喜欢音乐
export function likeMusic(query) {
    return request({
        url: '/like',
        // methods: 'post',
        params: query
    })
}
// 登录状态
export function loginStatus() {
    return request({
        url: '/login/status'
    })
}
// 喜欢音乐列表
export function getLikedList(uid) {
    return request({
        url: '/likelist',
        params: {
            uid
        }
    })
}
// 关注用户
export function follow(id, t) {
    return request({
        url: "/follow",
        params: {
            id, t
        }
    })
}
// 发送私信
export function sendMessage(user_ids, msg) {
    return request({
        url: '/send/text',
        params: {
            user_ids,
            msg
        }
    })
}
// 获取通知私信
export function getNoticePrivate(limit, offset) {
    return request({
        url: '/msg/private',
        params: {
            limit,
            offset
        }
    })
}
// 获取通知评论
export function getNoticeComments(uid, limit, offset) {
    return request({
        url: '/msg/comments',
        params: {
            uid,
            limit,
            offset
        }
    })
}
// 获取通知@我
export function getNoticeForwards(limit, offset) {
    return request({
        url: '/msg/forwards',
        params: {
            limit,
            offset
        }
    })
}
// 获取通知
export function getNotice(limit, offset) {
    return request({
        url: '/msg/notices',
        params: {
            limit,
            offset
        }
    })
}
// 生成二维码key
export function getLoginKey() {
    return request({
        url: "/login/qr/key"
    })
}
// 生成二维码
export function getQrImg(key,qrimg) {
    return request({
        url: '/login/qr/create',
        params: {
            key,
            qrimg
        }
    })
}
// 验证二维码登录
export function qrCheck(key){
    return request({
        url:'/login/qr/check',
        params:{
            key
        }
    })
}
// 获取用户播放记录
export function getUserRecord(uid,type){
    return request({
        url:'/user/record',
        params:{
            uid,
            type
        }
    })
}
// 获取国家编码
export function getCountryCode(){
    return request({
        url:'/countries/code/list'
    })
}
// 修改用户信息
export function changeUserInfo(query){
    return request({
        url:'/user/update',
        method:'post',
        data:query
    })
}