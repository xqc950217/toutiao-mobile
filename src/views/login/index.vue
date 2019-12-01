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
// 按需加载 `export` 成员  用{}括起来
// import { 成员1 as 别名, 成员2... } from '模块路径'
import { login } from '@/api/user'
// import request from '@/utils/request'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0 // 持续展示
      })
      try {
        const res = await login(this.user)
        // method: 'post',
        // url: '/app/v1_0/authorizations',
        // data: this.user
        // res.data.data=>{token:"xxx",refresh_token:"xxx"}
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登陆失败,手机号或验证码输入不正确')
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
