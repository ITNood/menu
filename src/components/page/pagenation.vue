<template>
  <div>
    <el-pagination @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
      :current-page="activePage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagenation',
  props: ['activePage', 'pageSize', 'total'],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.$emit('pageSizeChange', val);
    },
    handleCurrentChange(val) {
      this.$emit('avtivePageChange', val);
    },
  },
};
</script>

<style  scoped lang="less">
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
</style>