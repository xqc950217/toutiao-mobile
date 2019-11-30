<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-cell-group>
      <van-field
        label="手机号"
        placeholder="请输入用户名"
      />
      <van-field
        label="验证码"
        placeholder="请输入验证码"  />
    </van-cell-group>
    <!-- 登录按钮 -->
    <van-button type="info">登录</van-button>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {}
  }
}
</script>

<style>
</style>
