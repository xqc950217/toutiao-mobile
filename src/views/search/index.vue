<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
      @input="onSearchInput"
    >
      <div slot="action" @click="onSearch(searchText)">搜索</div>
    </van-search>
    <!-- /搜索框 -->

    <!-- 联想建议 -->
    <van-cell-group v-show="searchText">
      <van-cell
        icon="search"
        :key="item"
        v-for="item in suggestions"
        @click="onSearch(item)"
      >
      <!-- 把item 处理成带有高亮的字符串 -->
      <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

     <!-- 搜索历史记录 -->
     <van-cell-group v-show="!searchText">
       <van-cell title="历史记录">
         <div v-show="isDeleteShow">
            <span @click="searchHistories=[]">全部删除</span>&nbsp;&nbsp;
            <span @click="isDeleteShow=false">完成</span>
         </div>
         <van-icon
           name="delete"
           @click="isDeleteShow=true"
           v-show="!isDeleteShow"
         />
       </van-cell>
       <van-cell
         :title="item"
         :key="item"
         v-for="(item, index) in searchHistories"
         @click="onSearch(item)"
       >
         <van-icon
           name="close"
           v-show="!isDeleteShow"
           @click.stop="searchHistories.splice(index, 1)"
         />
       </van-cell>
     </van-cell-group>
     <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { setItem, getItem } from '@/utils/storage'
import { debounce } from 'lodash'
export default {
  name: 'SearchPage',
  components: {},
  props: {},
  data () {
    return {
      searchText: '', // 用户输入的搜索文本
      suggestions: [], // 搜索联想建议列表
      searchHistories: getItem('search-histories') || [],
      isDeleteShow: false // 控制删除历史显示状态
    }
  },
  computed: {},
  watch: {
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  created () {},
  methods: {
    // 搜索处理函数
    // 点击搜索按钮并且给搜索结果注册点击事件 点击两个都可以跳转
    onSearch (q) {
      if (!q.trim()) {
        return
      }
      // 跳转前将搜索的关键字记录到搜索历史中
      // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
      // 如果要检索的字符串值没有出现，则该方法返回 -1。
      const index = this.searchHistories.indexOf(q)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      // 最新的排在最前面
      this.searchHistories.unshift(q)
      // 将搜索历史记录到本地存储
      setItem('search-histories', this.searchHistories)
      this.$router.push(`/search/${q}`)
    },
    onSearchInput: debounce(async function () {
      const searchText = this.searchText.trim()
      if (!searchText) {
        // 非空校验
        return
      }
      const res = await getSuggestions(this.searchText)
      this.suggestions = res.data.data.options
    }, 300),
    // 高亮处理
    highlight (str) {
      // 动态创建正则表达式 使用new RegExp手动构造
      // g 全局，i 忽略大小写
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped></style>
