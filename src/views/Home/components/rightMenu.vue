<template>
  <div id="collapseList">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基础信息" name="0">
        <el-form :model="basicsForm" ref="basicsForm" label-width="100px">
          <el-form-item label="ID：" prop="id">
            <el-input v-model="basicsForm.id" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="名称：" prop="name">
            <el-input v-model="basicsForm.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="组件类型：" prop="type">
            <el-input v-model="basicsForm.type" size="mini"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
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
            <el-select v-model="decisionForm.dataname" size="mini">
              <el-option v-for="item in items" :key="item" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="条件：" prop="condition">
            <el-select v-model="decisionForm.condition" size="mini">
              <el-option value=">" label="大于"></el-option>
              <el-option value="<" label="小于"></el-option>
              <el-option value=">=" label="大于等于"></el-option>
              <el-option value="<=" label="小于等于"></el-option>
              <el-option value="=" label="等于"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阈值：" prop="threshold">
            <el-input-number v-model="decisionForm.threshold" size="mini"></el-input-number>
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

      <el-collapse-item title="引用信息" name="4">
        <el-form :model="quoteForm" ref="quoteForm" label-width="100px">
          <el-form-item label="引用类型：" prop="type">
            <el-select v-model="quoteForm.type" size="mini">
              <el-option value="流程1"></el-option>
              <el-option value="流程2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="引用ID：" prop="ID">
            <el-input v-model="quoteForm.ID" disabled size="mini"></el-input>
          </el-form-item>
          <el-form-item label="引用名称：" prop="ID">
            <el-input v-model="quoteForm.name" disabled size="mini"></el-input>
          </el-form-item>
        </el-form>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button icon="el-icon-refresh-right" type="success" round size="mini" @click="toggleFlow">切换流程</el-button>
          </el-col>
          <el-col :span="12">
            <el-button icon="el-icon-delete" type="danger" round size="mini">清除引用</el-button>
          </el-col>
        </el-row>
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
      activeNames: ['0'],
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
      quoteForm: {
        type: '',
        ID: '55555d5s',
        name: 'dadfafds',
      },
      basicsForm: {
        id: '',
        name: '',
        type: '',
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    //折叠
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
    //添加
    addRules() {
      this.lists.push({ name: '' });
    },
    //删除
    del(index) {
      if (this.lists.length > 1) {
        const list = [...this.lists];
        list.splice(index, 1);
        this.lists = [...list];
      } else {
        this.$message.warning('给我留点，不能再删了！');
      }
    },
    //切换
    toggleFlow() {
      this.$emit('toggleFlow');
    },
  },
};
</script>

<style  scoped lang="less">
</style>