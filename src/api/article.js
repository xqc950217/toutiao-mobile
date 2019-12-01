// 文章相关的数据接口
import request from '@/utils/request'
// 获取文章列表
export function getArticles (params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
