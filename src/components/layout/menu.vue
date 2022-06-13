<template>
  <div class="fixedMune">
    <div class="logo"><img src="../../assets/logo.png"><span v-if="!isCollapse">智因科技</span></div>
    <el-menu id="mune" :collapse="isCollapse" @select="handleOpen" :default-active="activeIndex" background-color="#000000" active-text-color="#409eff">
      <div v-for="item in routes" :key="item.path">
        <!-- 有子菜单 -->
        <el-submenu :index="item.path" v-if="item.children">
          <template slot="title">
            <i :class="item.meta.icon" style="width:30px;"></i>
            <span slot="title" style="margin-left:10px;">{{ item.meta.title }}</span>
          </template>
          <el-menu-item :index="c.path" v-for="c in item.children" :key="c.path">{{c.meta.title}}</el-menu-item>
        </el-submenu>

        <!-- 无子菜单 -->
        <el-menu-item :index="item.path" v-else>
          <i :class="item.meta.icon" style="width:30px;"></i>
          <span slot="title" style="margin-left:10px;">{{ item.meta.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: { routes: Array, isCollapse: Boolean },
  data() {
    return {
      activeIndex: '',
    };
  },
  created() {
    this.activeIndex = '/home';
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      if (key) {
        this.$router.push({ path: key });
      }
    },
  },
};
</script>

<style  scoped>
</style>