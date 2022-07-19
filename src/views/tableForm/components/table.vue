<template>
  <div>
    <!--    <el-button icon="el-icon-plus"-->
    <!--               type="primary"-->
    <!--               size="mini"-->
    <!--               plain-->
    <!--               @click="add">新增-->
    <!--    </el-button>-->
    <el-button icon="el-icon-delete"
               type="danger"
               size="mini"
               plain
               @click="del">删除
    </el-button>
    <el-button icon="el-icon-download"
               type="warning"
               size="mini"
               plain
               @click="exoprt">导出
    </el-button>

    <el-table :data="tableData"
              :row-class-name="({row})=>row.status == 'Deleted'?'warning-row':''"
              id="dataForm" row-key="id"
              @selection-change="handleSelectionChange"
              style="margin-top:15px"
              lazy :load="(tree, treeNode, resolve)=>$emit('load',tree,treeNode,resolve)"
              :tree-props="{children: 'childNode'}"
              border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="展开"></el-table-column>
      <el-table-column prop="moduleName" label="分类名称"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <el-image :src="scope.row.icon" style="width: 40px;height: 40px"></el-image>
        </template>
      </el-table-column>
      <!--      <el-table-column prop="previewDiagram" label="预览图">-->
      <!--        <template scope="scope">-->
      <!--          <el-image :src="scope.row.previewDiagram" style="width: 60px;height: 60px"></el-image>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-plus"
                     type="text"
                     size="mini"
                     @click="add(scope.row)">新增
          </el-button>
          <el-button icon="el-icon-edit"
                     @click="edit(scope.row)"
                     size="mini"
                     type="text">修改
          </el-button>
          <el-button icon="el-icon-delete"
                     @click="deldata(scope.row,scope.$index,tableData)"
                     size="mini"
                     type="text">删除
          </el-button>
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
  created() {
  },
  mounted() {
  },
  methods: {
    //新增
    add(row) {
      this.$emit('add',row);
    },
    //删除
    del() {
      this.$emit('del');
    },
    //导出
    exoprt() {
      var xlsxParam = {raw: true}; //转换成excel时，使用原始的格式
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
            new Blob([wbout], {type: 'application/octet-stream;charset=utf-8'}),
            '数据.xlsx'
        );
      } catch (e) {
        if (typeof console !== 'undefined') console.error(e, wbout);
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
      this.$emit('selectChange', [row]);
      this.$emit('del');
    },
  },
};
</script>

<style scoped>
</style>
