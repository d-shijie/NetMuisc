import {request} from "./request";
export function getRankList(){
    return request({
        url:"/toplist"
    })
}
