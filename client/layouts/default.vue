<template>
  <el-container>
    <div>
      {{userinfo}}
    </div>
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index='0'>
          <img class="logo" src="/logo.png" alt=''>
        </el-menu-item>
        <el-menu-item index='1'>
          <nuxt-link to='/'>首页</nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="userinfo.id" index='3' class="pull-right">
          <nuxt-link to='/user'>退出</nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="userinfo.id" index="4" class="pull-right">
          <nuxt-link to="/user">{{userinfo.nickname}}</nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="userinfo.id" index="3" class="pull-right">
          <nuxt-link to="/editor/new">
            <el-button type='primary'>写文章</el-button>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="!userinfo.id" index="2" class="pull-right">
          <nuxt-link to="/register">注册</nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="!userinfo.id" index="3" class="pull-right">
          <nuxt-link to="/login">登录</nuxt-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      底部信息
    </el-footer>
  </el-container>
</template>
<script>
export default {
  mounted(){
    this.getUserinfo()
  },
  computed:{
    userinfo(){
      return this.$store.state.user
    }
  },
  methods:{
    getUserinfo(){
      // 获取个人信息，如果有登陆状态
      let token=localStorage.getItem('KKB_USER_TOKEN')
      if(token){
        this.$store.dispatch('user/detail')
      }
    }
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.pull-rigth{
  float: right !important;
}
.logo{
  height: 37px;
}
a{
  text-decoration: none;
}
</style>
