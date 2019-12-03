<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>
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
            :title="article.title" >
            <div slot="label">
              <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="(img,index) in article.cover.images" :key="index">
                  <van-image :src="img" height="80" lazy-load/>
                  <!-- 图片懒加载 -->
                </van-grid-item>
              </van-grid>
              <div class="article-info">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}评论</span>
                <span>{{article.pubdate | relativeTime }}</span>
              </div>
            </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 面包按钮 -->
      <div slot="nav-right" class="wap-nav" @click="isChannelShow=true">
        <van-icon name="wap-nav" size="24"/>
      </div>
    </van-tabs>
    <!-- 频道管理弹窗 -->
    <!-- open 事件 打开弹出层时触发-->
    <van-popup
      v-model="isChannelShow"
      position="bottom"
      round
      closeable
      close-icon-position="top-left"
      :style="{ height: '95%' }"
      @open="onChannelOpen"
    >
    <div class="channel-container">
      <van-cell-group>
        <van-cell title="我的频道" :border="false" >
        <van-button type="danger" size="mini">编辑</van-button>
        </van-cell>
        <van-grid :gutter="10">
          <van-grid-item
            v-for="channel in channels"
            :key="channel.id"
            :text="channel.name"
          />
        </van-grid>
        <van-cell title="推荐频道" :border="false" />
        <van-grid :gutter="10">
          <van-grid-item
            v-for="value in 8"
            :key="value"
            text="文字"
          />
        </van-grid>
      </van-cell-group>
    </div>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import { getArticles } from '@/api/article'
import { getAllChannels } from '@/api/channel'
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
      loading: false,
      isLoading: false,
      channels: [],
      isChannelShow: false,
      allChannels: [] // 所有频道列表
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
    },
    async onChannelOpen () {
      const res = await getAllChannels()
      this.allChannels = res.data.data.channels
      // console.log(this.allChannels)
    }
  }
}
</script>

<style scoped lang="less">
  .home{
    .article-info span{
      margin-right: 10px;
    }
    .van-tabs{
      /deep/.van-tabs__wrap{
        position: fixed;
        top: 46px;
        z-index: 2;
        right: 0;
        left: 0;
      }
      /deep/.van-tabs__content {
        margin-top: 90px;
      }
    }
    .wap-nav{
      position: sticky;
      right: 0;
      display: flex;
      align-items: center;
      background-color: #fff;
    }
    .channel-container{
      padding-top: 30px;
    }
  }
</style>
