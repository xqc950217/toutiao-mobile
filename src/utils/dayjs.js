import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn' // 按需加载
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 全局使用汉语
dayjs.extend(relativeTime)
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})
