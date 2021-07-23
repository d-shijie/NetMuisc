import {request} from "./request";
export function getVideoTags(){
    return request({
        url:"/video/group/list"
    })
}
export function getVideoCategory(){
    return request({
        url:"/video/category/list"
    })
}
export function getVideos(id,offset){
    return request({
        url:"/video/group",
        params:{
            id,
            offset
        }
    })
}
