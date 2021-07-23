import {request} from "./request";
export function getDjDetail(rid){
  return request({
      url:"/dj/detail",
      params:{
          rid
      }
  })
}
export function getDjPrograms(rid,limit,offset,asc){
    return request({
        url:"/dj/program",
        params:{
            rid,
            limit,
            offset,
            asc
        }
    })
}
export function getDjSubscribers(id,limit,time){
    return request({
        url:"/dj/subscriber",
        params:{
             id,limit,time
        }
    })
}
export function getDjRank(offset){
    return request({
        url:"/dj/program/toplist",
        params:{
            offset
        }
    })
}
export function getHotNewDjs(limit,offset,type){
    return request({
        url:"/dj/toplist",
        params:{
            limit,
            offset,
            type
        }
    })
}
export function getDjProgramDetail(rid){
    return request({
        url:"/dj/detail",
        params:{
            rid
        }
    })
}
