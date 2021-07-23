import {request} from "./request";
export function getPhoneLogin(phone,password){
    return request({
        url:"/login/cellphone",
        params:{
            phone,
            password,
            random:Math.random()
        }

    })
}
