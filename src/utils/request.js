// 封装axios请求模块
import axios from 'axios'
import jsonBig from 'json-bigint'
// 在非组件模块中访问容器,直接import加载
import store from '@/store'
// axios.create 方法：复制一个 axios  request随便写
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 配置处理后端返回数据中心超出就是安全整数范围问题
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default request
