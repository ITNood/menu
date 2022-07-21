<template>
  <div>
    <search :form="form"
      @search="search" />
    <Table-form :tableData="data"
      :multipleSelection="multipleSelection"
      @load="(tree, treeNode, resolve)=>{getMenu(tree.id).then((data)=>resolve(data))}"
      @selectChange="selectChange"
      @del="del"
      @add="add"
      @edit="edit" />
    <Pagenation :activePage="page"
      :total="total"
      :pageSize="pageSize"
      @pageSizeChange="pageSizeChange"
      @avtivePageChange="avtivePageChange" />
    <edit-form ref="child"
      :title="title"
      @submit="submit" />
  </div>
</template>

<script>
import Search from './components/search';
import TableForm from './components/table';
import Pagenation from '../../components/page/pagenation';
import EditForm from './components/editForm';
import {
  deleteMenu,
  getMenu as getMenuJs,
  insertMenu,
  updateMenu,
} from '@/api/process/menu';

export default {
  components: { Search, TableForm, Pagenation, EditForm },
  data() {
    return {
      form: {
        name: '',
        code: '',
      },
      data: [],
      page: 1,
      pageSize: 10,
      total: 50,
      multipleSelection: [],
      title: '',
    };
  },
  created() {
    this.getMenu().then((data) => {
      this.data = data;
    });
  },
  mounted() {},
  methods: {
    getMenu: (id) => {
      return getMenuJs(id).then((response) => {
        response.data.map((i) => {
          i.hasChildren = true;
          i.childNode = [];
          return i;
        });
        return response.data;
      });
    },
    search() {},
    //删除
    del() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定要删除选中的数据吗 ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            const ids = [];
            this.multipleSelection.map((e) => {
              ids.push(e.id);
            });
            deleteMenu(ids).then((response) => {
              if (response.code === 200) {
                this.$message.success('删除成功');
              }
            });
          })
          .catch(() => {
            this.$message.info('取消了删除');
          });
      } else {
        this.$message.error('请选择要删除的数据');
      }
    },
    //新增
    add(row) {
      this.$refs.child.open();
      this.title = '新增';
    },
    //修改
    edit(row) {
      this.$refs.child.open(row);
      this.title = '修改';
    },
    //当前数据条数
    pageSizeChange(val) {
      this.pageSize = val;
    },
    //当前页数
    avtivePageChange(val) {
      this.page = val;
    },
    //选中的
    selectChange(val) {
      this.multipleSelection = val;
    },
    submit(data) {
      this.$refs.child.validate((valid) => {
        if (valid) {
          if (!data.id) {
            //验证通过
            insertMenu(data).then((res) => {
              if (res.code == 200) {
                this.$message.success('保存成功');
                this.$refs.child.show = false;
              }
            });
          } else {
            //验证通过
            updateMenu(data).then((res) => {
              if (res.code == 200) {
                this.$message.success('保存成功');
                this.$refs.child.show = false;
              }
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>


