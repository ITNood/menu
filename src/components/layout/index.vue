<template>
  <div>
    <el-container>
      <el-aside width="220px">
        <Menu :routes="route"
          :isCollapse="collapse" />
      </el-aside>
      <el-container>
        <el-header>
          <el-dropdown @command="handleCommand"
            trigger="click">
            <span class="el-dropdown-link">
              <el-avatar :src="avatar"></el-avatar>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <div class="tagtitle">
            <div class="tabs clear">
              <el-tag v-for="tag in getrouterList"
                :key="tag.path"
                :closable="tag.clearclose"
                @close="handleCloseTag(tag)"
                @click="tabs(tag.path)"
                :class="tag.current == true ? 'current' : ''">
                {{ tag.title }}
              </el-tag>
            </div>
          </div>
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
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { Menu },
  data() {
    return {
      route: [],
      collapse: false,
      avatar: require('../../assets/logo.png'),
      tags: [],
    };
  },
  watch: {
    $route(newValue, oldValue) {
      ;
      this.setTags(newValue);
    },
  },
  computed: {
    ...mapGetters(['getrouterList']),
  },

  created() {
    this.route = router.options.routes[0].children;
  },
  mounted() {
    this.setTags(this.$route);
  },
  methods: {
    ...mapActions(['addRouter', 'deleteRouter']),
    tabs(path) {
      this.$router.push(path);
      //tag标签对应当前路由背景色
      this.getrouterList.map((item) => {
        if (item.path === path) {
          item.current = true;
        } else {
          item.current = false;
        }
      });
      ;
    },
    handleCloseTag(tag) {
      //关闭标签
      if (this.getrouterList.length > 0) {
        const index = this.getrouterList.findIndex(
          (item) => item.title === tag.title
        );
        if (index === -1) {
          this.$router.push({ title: '首页' });
        } else if (this.$route.path === tag.path) {
          ;
          if (index === this.getrouterList.length - 1) {
            // 最后一个 往前一个挪
            this.$router.push(this.getrouterList[index - 1].path);
          } else {
            // 往后面挪
            this.$router.push(this.getrouterList[index + 1].path);
          }
        }
      } else {
        this.$router.push({ title: '首页' });
      }
      this.deleteRouter(tag.title);
    },
    setTags(route) {
      const isExsit = this.tags.some((item) => {
        return item.path === route.fullPath;
      });
      if (isExsit == false) {
        this.addRouter({
          title: route.meta.title, //标签名
          path: route.fullPath, //路由
          current: false,
          clearclose: !(route.meta.title == '首页'),
        });
      }
      //tag标签对应当前路由背景色
      this.getrouterList.map((item) => {
        if (item.path === route.fullPath) {
          item.current = true;
        } else {
          item.current = false;
        }
      });
    },
    handleCommand(command) {
      ;
      if (command == 'b') {
        sessionStorage.removeItem('userInfo');
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style  scoped>
</style>
