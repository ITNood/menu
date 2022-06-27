<template>
  <div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" id="stepChild">
      <!--查询-->
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="queryParams.name" placeholder="请输入名称" clearable size="small" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="开始时间" prop="deployTime">
          <el-date-picker clearable size="small" v-model="queryParams.deployTime" type="date" value-format="yyyy-MM-dd" placeholder="选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-carousel height="600px" :initial-index="number" :autoplay="false" indicator-position="none" @change="change" v-if="show">
        <el-carousel-item v-for="(item,index) in items" :key="index">
          <!-- <process-viewer :xml="item.readXml" :style="{height: '600px',width:'90%'}" /> -->
        </el-carousel-item>
      </el-carousel>

      <div class="news">
        <el-form :model="newForm" ref="newForm">
          <el-form-item label="名称：" prop="idName">
            <el-input disabled v-model="newForm.idName" width="200px"></el-input>
          </el-form-item>
          <el-form-item label="版本号：" prop="version">
            <el-select v-model="newForm.version" @change="chengeVersion">
              <el-option v-for="(list,index) in lists" :key="index" :value="list.version"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// import ProcessViewer from '../ProcessViewer';
// import { listDefinition } from '@/api/workflow/definition';
export default {
  name: 'Banner',
  // components: {
  //   ProcessViewer,
  // },
  props: {},
  data() {
    return {
      dialogVisible: false,
      items: [],

      queryParams: {
        name: '',
        deployTime: '',
      },
      lists: [],
      newForm: {
        idName: '',
        version: '',
      },
      number: 0,
      show: false,
    };
  },
  created() {
    this.getList();
  },
  mounted() {},

  methods: {
    //选择版本号
    chengeVersion(val) {
      this.show = false;
      const data = this.items[this.number].vesrionsList.rows.filter((item) => {
        if (item.version == val) {
          return item;
        }
      });
      this.$nextTick(() => {
        this.show = true;
        this.$set(this.items[this.number], 'readXml', data[0].readXml);
      });
    },
    //选择轮播图
    change(index) {
      this.number = index;
      this.newForm.idName = this.items[index].processName;
      this.newForm.version = this.items[index].version;
      this.lists = this.items[index].vesrionsList.rows.map((item) => {
        return { version: item.version };
      });
    },
    getList() {
      const data = {
        pageNum: 1,
        pageSize: 10,
        type: 'select',
      };
      // listDefinition(data).then((response) => {
      //   this.show = true;
      //   console.log(response);
      //   this.items = response.rows;
      //   //默认第一个
      //   this.newForm.idName = response.rows[0].processName;
      //   this.newForm.version = response.rows[0].version;
      //   this.lists = response.rows[0].vesrionsList.rows.map((item) => {
      //     return { version: item.version };
      //   });
      // });
    },
    //搜索
    handleQuery() {
      this.getList();
    },
    //重置
    resetQuery() {
      this.resetForm('queryForm');
      this.handleQuery();
    },
    open() {
      this.dialogVisible = !this.dialogVisible;
    },
  },
};
</script>

<style  scoped lang="scss">
</style>