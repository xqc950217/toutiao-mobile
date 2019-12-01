// 用户相关的请求
import request from '@/utils/request'
// 用户登录
export function login (user) {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: user
  })
}
// 获取用户频道列表
export function getUserChannels () {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
