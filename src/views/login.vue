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
                v-model="loginForm.code"
                @keyup.enter.native="login"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"><img :src="codeUrl"
              style="height: 40px;"
              @click="getCode" /></el-col>
        </el-row>

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
import Cookies from 'js-cookie';
import { encrypt, decrypt } from '../utils/jsencrypt';
import { getCodeImg, login } from '../api/login';

export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin123',
        rememberMe: false,
        code: '',
        uuid: '',
      },
      codeUrl: '',
      loading: false,
    };
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  mounted() {},
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaOnOff =
          res.data.captchaOnOff === undefined ? true : res.data.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = 'data:image/gif;base64,' + res.data.img;
          this.loginForm.uuid = res.data.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get('username');
      const password = Cookies.get('password');
      const rememberMe = Cookies.get('rememberMe');
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // if (this.loginForm.rememberMe) {
          //   Cookies.set("username", this.loginForm.username, { expires: 30 });
          //   Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
          //   Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          // } else {
          //   Cookies.remove("username");
          //   Cookies.remove("password");
          //   Cookies.remove('rememberMe');
          // }
          login(this.loginForm)
            .then((res) => {
              sessionStorage.setItem('token', 'Bearer ' + res.data.token);
              // location.href='/home'
              this.$router.push('/home');
              // this.$router.push({ path: this.redirect || "/home" }).catch(()=>{});
            })
            .catch(() => {
              if (this.captchaOnOff) {
                this.getCode();
              }
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
      // this.loading = true;
      // const info = '498498484';
      // sessionStorage.setItem('userInfo', JSON.stringify(info));
      // setTimeout(() => {
      //   this.loading = false;
      //   this.$router.push({ path: '/home' }, () => {});
      // }, 1000);
    },
  },
};
</script>

<style  scoped>
</style>
