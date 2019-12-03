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
            v-for="article in channel.articles"
            :key="article.art_id.toString()"
            :title="article.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import { getArticles } from '@/api/article'
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
      loading: false,
      isLoading: false,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  methods: {
    async onLoad () {
      // 获取当前频道
      const activeChannel = this.channels[this.active]
      // 获取当前频道的文章列表
      const articles = activeChannel.articles
      // 1.请求加载数据
      const res = await getArticles({
        channel_id: activeChannel.id, // 频道id
        timestamp: activeChannel.timestamp || Date.now(),
        // 获取下一页时的时间戳 Date.now()表示当前最新数据
        with_top: 1
      })
      // 2.将数据添加到当前文章列表中
      // ...数组,数组的展开操作符,会把数组元素一个个拿出来,传给使用的位置
      articles.push(...res.data.data.results)
      // 3.加载状态结束 将loading设置为false
      // 关闭本次的loading状态 ,会判定当前数据是否满1屏,没有自动onLoad
      this.loading = false
      // 4.数据全部加载完成
      // 判断还有下一页数据,更新下一页的时间戳
      // 判断如果没有数据了,当前频道结束状态finished 为 true 之后不再触发onLoad
      const preTimestamp = res.data.data.pre_timestamp
      if (preTimestamp) {
        // 更新获取下一页的时间戳
        activeChannel.timestamp = preTimestamp
      } else {
        activeChannel.finished = true
      }
    },
    async onRefresh () {
      const activeChannel = this.channels[this.active]
      // 1.请求获取最新数据
      const res = await getArticles({
        channel_id: activeChannel.id,
        timestamp: Date.now(), // 获取最新数据的时间戳
        with_top: 1
      })
      // 2.把数据放到列表的顶部
      const articles = res.data.data.results
      activeChannel.articles.unshift(...articles)
      // 3.停止下拉刷新的转圈圈
      this.isLoading = false
      // 4.提示用户刷新成功
      const message = articles.length
        ? `更新了${articles.length}条数据`
        : '暂无数据更新'
      this.$toast(message)
    },
    async loadUserChannels () {
      const res = await getUserChannels()
      const channels = res.data.data.channels
      // 给每个频道添加自定义数据:文章列表,finished结束状态
      channels.forEach(channel => {
        channel.articles = [] // 频道文章列表
        channel.finished = false // 频道加载结束状态
        channel.timestamp = null // 用于获取下一页数据的时间戳
      })
      this.channels = channels
    }
  }
}
</script>

<style scoped>
</style>
