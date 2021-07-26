import {request} from "./request";
export function getPersonalFMs(){
    return request({
        url:"/personal_fm"
    })
}
export function getLyric(id){
    return request({
        url:"/lyric",
        params:{
            id
        }
    })
}
