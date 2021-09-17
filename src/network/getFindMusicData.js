import {request} from "./request";
export function getFindMusicBanner(type){
    return request({
        url:"/banner",
        params:{
            type
        }
    })
}
export function getNotLoginFindMusicPersonalizeMusicList(limit){
    return request({
        url:"/personalized",
        params:{
            limit
        }
    })
}
export function getFindMusicPersonalizeMusicList(){
    return request({
        url:"/recommend/resource",
    })
}
export function getFindMusicUnique(limit){
    return request({
        url:"/personalized/privatecontent/list",
        params:{
            limit
        }
    })
}
export function getFindMusicNewMusic(limit){
    return request({
        url:"/personalized/newsong",
        params:{
            limit
        }
    })
}
export function getRecommendMV(){
    return request({
        url:"/personalized/mv",

    })
}
export function getRecommendDjs(){
    return request({
        url:"/personalized/djprogram"
    })
}
export function getPlaylistCategory(){
    return request({
        url:"/playlist/hot"
    })
}
export function getMusicList(order,cat,limit,offset){
    return request({
        url:"/top/playlist",
        params:{
            order,
            cat,
            limit,
            offset
        }
    })
}
export function getDjBanner(){
    return request({
        url:"/dj/banner"
    })
}
export function getPayGoods(limit){
    return request({
        url:"/dj/toplist/pay",
        params:{
            limit
        }
    })
}
export function getDjPersonalize(limit){
    return request({
        url:"/dj/personalize/recommend",
        params:{
            limit
        }
    })
}
export function getDjCategory(){
    return request( {
        url:"/dj/catelist"
    })
}
export function getDjCategoryRecommend(type){
    return request({
        url:"/dj/recommend/type",
        params:{
            type
        }
    })
}
export function getDailyRecommend(){
    return request({
        url:'/recommend/songs'
    })
}