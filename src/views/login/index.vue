<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        label="手机号"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"  />
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-box">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onLogin () {
      try {
        const res = await request({
          method: 'post',
          url: '/app/v1_0/authorizations',
          data: this.user
        })
        console.log('登陆成功', res)
      } catch (err) {
        console.log('登录失败', err)
      }
    }
  }

}
</script>

<style scoped lang="less">
  .login{
    .login-box{
      padding: 20px;
      .van-button{
        width: 100%;
      }
    }
  }
</style>
