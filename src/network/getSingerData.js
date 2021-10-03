import {request} from "./request";
import jsonp from "./jsonp";
export function getSingerMVs(id,limit,offset){
    return request({
        url:"/artist/mv",
        params:{
            id,
            limit,
            offset
        }
    })
}
export function getSingerDetail(id) {
    return request({
        url: "/artists/detail",
        params: {
            id
        },
    })
}
export function getSingerDetailJsonp(id){
    let url="https://nicemusic-api.lxhcool.cn/artists/detail"
    let data={
        id
    }
    return jsonp(url,data,{})
}
export function getSimilarSingers(id){
    return request({
        url:"/simi/artist",
        params:{
            id
        }
    })
}
export function getSingerList(limit,offset,type,area,initial){
    return request({
        url:"/artist/list",
        params:{
            limit,
            offset,
            type,
            area,
            initial
        }
    })
}
//收藏的歌手
export function getSublistSingers(){
    return request({
        url:'/artist/sublist'
    })
}