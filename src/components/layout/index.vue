<template>
  <div>
    <el-container>
      <el-aside width="220px">
        <Menu :routes="route" :isCollapse="collapse" />
      </el-aside>
      <el-container>
        <el-header>
          <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              <el-avatar :src="avatar"></el-avatar>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>版权所有 © Copyright Reserved | 2019 - 2022 | 粤 ICP 备 19014447 号</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from './menu.vue';
import router from '../../router';
export default {
  components: { Menu },
  data() {
    return {
      route: [],
      collapse: false,
      avatar: require('../../assets/logo.png'),
    };
  },
  created() {
    this.route = router.options.routes[0].children;
    console.log('11111', this.$router);
  },
  mounted() {},
  methods: {
    handleCommand(command) {
      console.log(command);
      if (command == 'b') {
        localStorage.removeItem('userInfo');
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style  scoped>
</style>