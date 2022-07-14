<template>
  <div>
    <el-form :model="form"
      class="form"
      ref="form"
      label-width="100px">
      <el-form-item prop="name"
        label="分类名称：">
        <el-input v-model="form.name"
          placeholder="请输入分类名称"></el-input>
      </el-form-item>

      <el-form-item prop="code"
        label="分类编码：">
        <el-input v-model="form.code"
          placeholder="请输入分类编码"></el-input>
      </el-form-item>
      <el-button icon="el-icon-search"
        @click="search"
        type="primary"
        size="small">搜索</el-button>
      <el-button icon="el-icon-refresh"
        size="small"
        @click="reset('form')">重置</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          name: '',
          code: '',
        };
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    //搜索
    search() {
      this.$emit('search');
    },
    //重置
    reset(form) {
      console.log(form);
      this.$refs[form].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  display: block;
  .el-form-item {
    display: inline-block;
  }
  .el-button {
    margin-left: 15px;
  }
}
</style>