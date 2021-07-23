import {request} from "./request";
export function getMVUrl(id){
    return request({
        url:"/mv/url",
        params:{
            id
        }
    })
}
export function getMVInfo(id){
    return request({
        url:"/mv/detail",
        params:{
            mvid:id
        }
    })
}
export function getMVCount(id){
    return request({
        url:"/mv/detail/info",
        params:{
            mvid:id,

        }
    })
}
export function getMVComment(id,limit,offset){
    return request({
        url:"/comment/mv",
        params:{
            id,
            limit,
            offset
        }
    })
}
export function getSimiMV(id){
    return request({
        url:"/simi/mv",
        params:{
            mvid:id
        }
    })
}
