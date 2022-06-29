<template>
  <div id="login">
    <div class="loginForm">
      <el-form :model="loginForm"
        ref="loginForm"
        label-width="80px">
        <el-form-item label="账号"
          prop="username">
          <el-input placeholder="请输入账号"
            v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
          prop="password">
          <el-input placeholder="请输入账号"
            type="password"
            v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-row>
          <el-col :offset="10">
            <el-button :loading="loading"
              type="primary"
              @click="login"
              size="small">登录</el-button>
          </el-col>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
      },
      loading: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    login() {
      this.loading = true;
      const info = '498498484';
      sessionStorage.setItem('userInfo', JSON.stringify(info));
      setTimeout(() => {
        this.loading = false;
        this.$router.push({ path: '/home' }, () => {});
      }, 1000);
    },
  },
};
</script>

<style  scoped>
</style>