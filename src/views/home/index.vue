<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <van-pull-refresh
        v-model="isLoading"
         @refresh="onRefresh">
          <van-list
           v-model="loading"
          :finished="channel.finished"
          finished-text="没有更多了"
           @load="onLoad">
            <van-cell
            v-for="item in channel.articles"
            :key="item"
            :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  methods: {
    onLoad () {
      // 获取当前频道
      const activeChannel = this.channels[this.active]
      // 获取当前频道的文章列表
      const articles = activeChannel.articles
      // 1.请求加载数据
      setTimeout(() => {
        // 2.将数据添加到当前文章列表中
        for (let i = 0; i < 10; i++) {
          articles.push(articles.length + 1)
        }
        // 3.加载状态结束 将loading设置为false
        // 关闭本次的loading状态 ,会判定当前数据是否满1屏,没有自动onLoad
        this.loading = false

        // 4.数据全部加载完成
        // 判断如果没有数据了,当前频道结束状态finished 为 true 之后不再触发onLoad
        if (articles.length >= 40) {
          activeChannel.finished = true
        }
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    },
    async loadUserChannels () {
      const res = await getUserChannels()
      const channels = res.data.data.channels
      // 给每个频道添加自定义数据:文章列表,finished结束状态
      channels.forEach(channel => {
        channel.articles = [] // 频道文章列表
        channel.finished = false // 频道加载结束状态
      })
      this.channels = channels
    }
  }
}
</script>

<style scoped>
</style>
