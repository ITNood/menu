<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="show"
               :close-on-click-modal="false"
               width="60%">
      <el-form :model="dataForm"
               ref="dataForm"
               label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="moduleName"
                          label="模块名称:"
                          :rules="[{ required: true, message: '请输入模块名称', trigger: 'blur' }]">
              <el-input v-model="dataForm.moduleName" :disabled="canSelectType.indexOf(dataForm.status) < 0"
                        placeholder="请输入模块名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="status"
                          label="分类名称:"
                          :rules="[{required:true,message:'请调整状态',trigger:'blur'}]">
              <el-select v-model="dataForm.status" :disabled="canSelectType.indexOf(dataForm.status) < 0"
                         placeholder="请调整状态">
                <el-option :value="item" :key="item" :label="item" v-for="(item) in canSelectType"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
                label="图标:"
                :rules="[{required:true,message:'请调整状态',trigger:'blur'}]">
              <el-upload :imit="1" action="#" list-type="picture-card" :auto-upload="false"
                         accept=".svg" :before-upload="beforeAvatarUpload"
                         :on-remove="handleRemove"
                         :on-change="changeFile"
                         :file-list="dataForm.icon? [{url:dataForm.icon}]:[]"
                         :limit="1"
                         :on-preview="handlePictureCardPreview">
                <i class="el-icon-plus"/>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="description"
                          label="描述:">
              <el-input type="textarea" v-model="dataForm.description"
                        style="min-height: 148px"
                        :autosize="{ minRows: 6}"
                        :disabled="canSelectType.indexOf(dataForm.status) < 0"
                        placeholder="请输入描述信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'EditForm',
  props: {
    title: String,
  },
  data() {
    return {
      show: false,
      showbtn: false,
      canSelectType: ['Active', 'Disabled'],
      dialogVisible: false,
      dialogImageUrl: '',
      dataForm:{
        parentId: null,
        moduleName: '',
        status: 'Disabled',
        icon: null,
        previewDiagram: '',
        description: '',
        config: {},
        childNode: null,
      }
    };
  },
  watch:{
  },
  created() {
  },
  mounted() {
  },
  methods: {
    open(data) {
      this.dataForm = {...this.dataForm,...data};
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
    submit() {
      this.$emit('submit', this.dataForm);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/svg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 SVG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      this.fileList = [];
      return isJPG && isLt2M;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      this.dataForm.icon = '';
    },
    changeFile(file, fileList) {
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        file.url = reader.result
        this.dataForm.icon = reader.result
      }
    },
  },
};
</script>

<style scoped>
</style>
