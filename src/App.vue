<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    const info = sessionStorage.getItem('userInfo');
    console.log(info);
    if (!info) {
      this.$router.push('/login');
    }
  },
  mounted() {},
  methods: {},
};
</script>


<style lang="less">
</style>
