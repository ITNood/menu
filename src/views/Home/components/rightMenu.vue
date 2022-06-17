<template>
  <div id="collapseList">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="SUB FLOW" name="1">
        <el-form :model="form" ref="form" label-width="55px">
          <el-form-item label="名称：" prop="name">
            <el-input size="mini" v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="data" border id="tableForm" @selection-change="selectionChange" ref="tables" style="margin-top:15px">
          <el-table-column type="selection" width="50px"></el-table-column>
          <el-table-column prop="name" label="流程名称">
            <template slot-scope="scope">
              <a @click="openFlow">{{scope.row.name}}</a>
            </template>
          </el-table-column>
        </el-table>
        <el-button size="mini" type="primary" class="confirm">确认</el-button>
      </el-collapse-item>

      <el-collapse-item title="Decision" name="2">
        <el-form :model="decisionForm" ref="decisionForm" label-width="55px">
          <el-form-item label="名称：" prop="name">
            <el-input size="mini" v-model="decisionForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="decisionForm.dataname">
              <el-option v-for="item in items" :key="item" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="条件：" prop="condition">
            <el-select v-model="decisionForm.condition">
              <el-option value=">"></el-option>
              <el-option value="<"></el-option>
              <el-option value=">="></el-option>
              <el-option value="<="></el-option>
              <el-option value="="></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阈值：" prop="threshold">
            <el-input-number v-model="decisionForm.threshold"></el-input-number>
          </el-form-item>
        </el-form>
        <el-button size="mini" type="primary" class="confirm">确认</el-button>
      </el-collapse-item>

      <el-collapse-item title="OUTPUT" name="3">
        <div v-for="(list,index) in lists" :key="index" class="lists">
          <el-input v-model="list.name" size="mini" style="margin-bottom:15px"></el-input>
          <i class="el-icon-circle-close" @click="del(index)"></i>
        </div>
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="addRules">添加</el-button>
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
      form: {
        name: '',
      },
      data: [{ name: '111' }, { name: '2222' }, { name: '3333' }],
      selectedRow: [],
      disabled: true,
      isshow: false,
      decisionForm: {
        name: '',
        condition: '',
        threshold: '',
      },
      items: [],
      lists: [{ name: '' }],
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
      }
    },
    //查看流程
    openFlow() {
      this.isshow = !this.isshow;
    },

    addRules() {
      this.lists.push({ name: '' });
    },
    del(index) {
      console.log(index);
      const list = [...this.lists];
      list.splice(index, 1);
      this.lists = [...list];
    },
  },
};
</script>

<style  scoped lang="less">
</style>