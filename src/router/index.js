import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Tabbar from '@/views/tabbar'
import Home from '@/views/home'
import Search from '@/views/search'
import SearchResult from '@/views/search-result'
import Article from '@/views/article'
Vue.use(VueRouter)
// 配置路由表
const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Tabbar,
    children: [
      {
        path: '',
        component: Home
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/:q',
    component: SearchResult
  },
  {
    path: '/article/:articleId',
    component: Article
  }

]

const router = new VueRouter({
  routes
})

export default router
