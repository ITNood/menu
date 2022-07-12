<template>
  <div>
    <el-dialog :title="title"
      :visible.sync="show"
      :close-on-click-modal="false"
      width="40%">
      <el-form :model="dataForm"
        ref="dataForm"
        label-width="100px">
        <el-form-item prop="number"
          label="分类编号:"
          :rules="[{ required: true, message: '请输入分类编号', trigger: 'blur' }]">
          <el-input v-model="dataForm.number"
            placeholder="请输入分类编号"></el-input>
        </el-form-item>

        <el-form-item prop="name"
          label="分类名称:"
          :rules="[{required:true,message:'请输入分类名称',trigger:'blur'}]">
          <el-input v-model="dataForm.name"
            placeholder="请输入分类名称"></el-input>
        </el-form-item>

        <el-form-item prop="code"
          label="分类编码:"
          :rules="[{required:true,message:'请输入分类编码',trigger:'blur'}]">
          <el-input v-model="dataForm.code"
            placeholder="请输入分类编码"></el-input>
        </el-form-item>

        <el-form-item prop="remarks"
          label="备注:">
          <el-input v-model="dataForm.remarks"
            placeholder="请输入备注信息"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary"
          @click="submit('dataForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  props: {
    title: String,
    dataForm: {
      type: Object,
      default: () => {
        return {
          number: '',
          name: '',
          code: '',
          remarks: '',
        };
      },
    },
  },
  data() {
    return {
      show: false,
      showbtn: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    open() {
      this.show = !this.show;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    },
    validate(callback) {
      this.$refs.dataForm.validate((valid) => {
        callback(valid);
      });
    },
    submit(dataForm) {
      this.$emit('submit', dataForm);
    },
  },
};
</script>

<style  scoped>
</style>