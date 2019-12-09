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
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Tabbar,
    children: [
      {
        name: 'home',
        path: '',
        component: Home
      }
    ]
  },
  {
    name: 'search',
    path: '/search',
    component: Search
  },
  {
    name: 'search-result',
    path: '/search/:q',
    component: SearchResult
  },
  {
    name: 'article',
    path: '/article/:articleId',
    component: Article
  }

]

const router = new VueRouter({
  routes
})

export default router
