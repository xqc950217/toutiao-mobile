import request from '@/utils/request'
// 搜索相关接口
export function getSuggestions (q) {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export function getSearch (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
