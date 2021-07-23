import {request} from "./request";
export function getAlbumData(id){
    return request({
        url:"/album",
        params:{
            id
        }
    })
}
export function getTopFiftySongs(id,order,limit){
    return request({
        url:"/artists/songs",
        params:{
            id,
            order,
            limit
        }
    })
}
export function getTopFiftyAlbums(id,limit){
    return request({
        url:"/artist/album",
        params:{
            id,
            limit
        }
    })
}
export function getAlbumComments(id,limit,offset){
    return request({
        url:"/comment/album",
         params:{
            id,limit,offset
         }
    })
}
