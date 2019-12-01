<template>
  <div>
  <!-- 子路由的出口 -->
  <router-view/>
  <van-tabbar v-model="active">
  <van-tabbar-item icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item icon="search">问答</van-tabbar-item>
  <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
  <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabarPage',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {}
}
</script>

<style scoped>

</style>
