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

        <el-row :gutter="15">
          <el-col :span="16">
            <el-form-item label="验证码"
              prop="code">
              <el-input placeholder="请输入验证码"
                type="code"
                v-model="loginForm.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"><img :src="src" /></el-col>
        </el-row>

        <el-row>
          <el-col :offset="
              10">
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
        code: '',
      },
      src: '',
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