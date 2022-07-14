<template>
  <div>
    <el-button icon="el-icon-plus"
      type="primary"
      size="mini"
      plain
      @click="add">新增</el-button>
    <el-button icon="el-icon-delete"
      type="danger"
      size="mini"
      plain
      @click="del">删除</el-button>
    <el-button icon="el-icon-download"
      type="warning"
      size="mini"
      plain
      @click="exoprt">导出</el-button>

    <el-table :data="tableData"
      id="dataForm"
      @selection-change="handleSelectionChange"
      style="margin-top:15px"
      border>
      <el-table-column type="selection"
        width="55"></el-table-column>
      <el-table-column prop="number"
        label="分类编号"></el-table-column>
      <el-table-column prop="name"
        label="分类名称"></el-table-column>
      <el-table-column prop="code"
        label="分类编码"></el-table-column>
      <el-table-column prop="remarks"
        label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit"
            @click="edit(scope.row)"
            size="mini"
            type="text">修改</el-button>
          <el-button icon="el-icon-delete"
            @click="deldata(scope.row,scope.$index,tableData)"
            size="mini"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
export default {
  name: 'TableForm',
  props: ['tableData', 'multipleSelection'],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    //新增
    add() {
      this.$emit('add');
    },
    //删除
    del() {
      this.$emit('del');
    },
    //导出
    exoprt() {
      var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      var wb = XLSX.utils.table_to_book(
        document.querySelector('#dataForm'),
        xlsxParam
      );
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array',
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream;charset=utf-8' }),
          '数据.xlsx'
        );
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout);
      }
      return wbout;
    },
    //选中
    handleSelectionChange(val) {
      this.$emit('selectChange', val);
    },
    //修改
    edit(row) {
      this.$emit('edit', row);
    },
    deldata(row, index, rows) {
      this.$confirm('确定要删除吗 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const id = row.id;
          rows.splice(index, 1);
          this.$message.success('删除成功');
        })
        .catch(() => {
          this.$message.info('取消了删除');
        });
    },
  },
};
</script>

<style  scoped>
</style>