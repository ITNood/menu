 <template>
  <div>
    <search :form="form"
      @search="search" />
    <Table-form :tableData="data"
      :multipleSelection="multipleSelection"
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
      :dataForm="dataForm"
      @submit="submit" />
  </div>
</template>
 
 <script>
import Search from './components/search';
import TableForm from './components/table';
import Pagenation from '../../components/page/pagenation';
import EditForm from './components/editForm';
export default {
  components: { Search, TableForm, Pagenation, EditForm },
  data() {
    return {
      form: {
        name: '',
        code: '',
      },
      data: [
        { number: 5555, name: 'dadaf', code: 'ddd', remarks: '4dadfa1' },
        { number: 33, name: 'tt', code: 'ss', remarks: '3233' },
        { number: 44, name: 'uu', code: 'dd', remarks: '545' },
        { number: 5588, name: 'ee', code: '454fff847', remarks: '777' },
      ],
      page: 1,
      pageSize: 10,
      total: 0,
      multipleSelection: [],
      title: '',
      dataForm: {
        number: '',
        name: '',
        code: '',
        remarks: '',
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    search() {
      console.log(this.form);
    },
    //删除
    del() {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定要删除选中的数据吗 ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$message.success('删除成功');
          })
          .catch(() => {
            this.$message.info('取消了删除');
          });
      } else {
        this.$message.error('请选择要删除的数据');
      }
    },
    //新增
    add() {
      this.dataForm.name = '';
      this.dataForm.code = '';
      this.dataForm.number = '';
      this.dataForm.remarks = '';
      this.$refs.child.open();
      this.title = '新增';
    },
    //修改
    edit(row) {
      console.log(row);
      this.$refs.child.open();
      this.title = '修改';
      this.dataForm.number = row.number;
      this.dataForm.name = row.name;
      this.dataForm.code = row.code;
      this.dataForm.remarks = row.remarks;
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
    submit() {
      this.$refs.child.validate((valid) => {
        if (valid) {
          //验证通过
          console.log('submit');
          this.$refs.child.open();
        } else {
          return false;
        }
      });
    },
  },
};
</script>
 
 <style  scoped>
</style>