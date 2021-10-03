import { request } from './request'
// 获取云盘数据
export function getUserCloud(limit, offset) {
    return request({
        url: '/user/cloud',
        params: {
            limit,
            offset
        }
    })
}
// 云盘歌曲删除
export function deleteCloudMusic(query) {
    return request({
        url: '/user/cloud/del',
        method: 'delete',
        data: query
    })
}