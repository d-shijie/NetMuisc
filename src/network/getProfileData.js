import {request} from "./request";
import id from "element-ui/src/locale/lang/id";
export function getProfileDetail(id){
    return request({
        url:"/user/detail",
        params:{
            uid:id
        }
    })
}
