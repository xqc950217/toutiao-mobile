import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Tabbar from '@/views/tabbar'
Vue.use(VueRouter)
// 配置路由表
const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Tabbar
  }
]

const router = new VueRouter({
  routes
})

export default router
