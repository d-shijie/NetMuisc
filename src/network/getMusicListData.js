import {request} from "./request";
export function getMusicListDetail(id){
    return request({
        url:"/playlist/detail",
        params:{
            id
        }
    })
}
export function getMusicListComments(id,limit,offset){
    return request({
        url:"/comment/playlist",
        params:{
            id,
            limit,
            offset
        }
    })
}
export function getMusicListSubs(id,limit,offset){
    return request({
        url:"/playlist/subscribers",
        params:{
            id,
            limit,
            offset
        }
    })
}
export function getNewMusic(type){
    return request({
        url:"/top/song",
        params:{
            type
        }
    })
}
export function getNewDish(limit,offset,area,type,month){
    return request({
        url:"/top/album",
        params:{
            limit,
            offset,
            area,
            type,
            month
        }
    })
}
