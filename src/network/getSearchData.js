import {request} from "./request";
export function getSearchData(keywords,limit,offset,type){
    return request({
        url:"/search",
        params:{
            keywords,limit,offset,type
        }
    })
}
