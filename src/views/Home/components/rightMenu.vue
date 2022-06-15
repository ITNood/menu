<template>
  <div id="collapseList">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="名称" name="1">
        <el-input size="mini" v-model="name"></el-input>
      </el-collapse-item>

      <el-collapse-item title="链接子流程" name="2">
        <el-table :data="data" border id="tableForm" @selection-change="selectionChange" ref="tables">
          <el-table-column type="selection" width="50px"></el-table-column>
          <el-table-column prop="name" label="流程名称">
            <template slot-scope="scope">
              <a @click="openFlow">{{scope.row.name}}</a>
            </template>
          </el-table-column>
        </el-table>
        <el-button size="mini" type="primary" class="confirm" :disabled="disabled">确认</el-button>
      </el-collapse-item>
    </el-collapse>
    <!----查看流程---->
    <el-dialog title="提示" :visible.sync="isshow" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isshow = false">取 消</el-button>
        <el-button type="primary" @click="isshow = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'rightMenu',
  data() {
    return {
      activeNames: ['1'],
      name: '',
      data: [{ name: '111' }, { name: '2222' }, { name: '3333' }],
      selectedRow: [],
      disabled: true,
      isshow: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(val) {
      console.log(val);
    },
    //单选
    selectionChange(row) {
      this.selectedRow = row;
      if (row.length > 1) {
        this.$refs.tables.clearSelection();
        this.$refs.tables.toggleRowSelection(row.pop());
      } else if (row.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    //查看流程
    openFlow() {
      this.isshow = !this.isshow;
    },
  },
};
</script>

<style  scoped lang="less">
</style>