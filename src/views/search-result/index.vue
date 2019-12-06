<template>
  <div>
      <!-- 导航栏 -->
     <van-nav-bar
        :title="title"
        left-arrow
        @click-left="$router.back()"
     />
     <!-- 左箭头点击返回事件 -->
     <!-- 文章列表 -->
     <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell
            v-for="item in list"
            :key="item.art_id.toString()"
            :title="item.title"
     />
</van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  computed: {
    title () {
      return `${this.$route.params.q}的搜索结果`
    }
  },
  watch: {},
  created () {},
  methods: {
    // 1.请求获取数据
    async onLoad () {
      const res = await getSearch({
        page: this.page,
        per_page: 20,
        q: this.$route.params.q // 搜索关键词 动态获取
      })
      // 2.将数据添加到列表中
      const results = res.data.data.results
      this.list.push(...results)
      // 3.将本次的loading设置为false
      this.loading = false
      // 4.判断是否还有数据 ,没有了将finished设置为false
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped>

</style>
