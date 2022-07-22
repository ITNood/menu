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
              <el-input v-model="dataForm.moduleName"
                        :disabled="canSelectType.indexOf(dataForm.status) < 0"
                        placeholder="请输入模块名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="status"
                          label="分类名称:"
                          :rules="[{required:true,message:'请调整状态',trigger:'blur'}]">
              <el-select v-model="dataForm.status"
                         :disabled="canSelectType.indexOf(dataForm.status) < 0"
                         placeholder="请调整状态">
                <el-option :value="item"
                           :key="item"
                           :label="item"
                           v-for="(item) in canSelectType"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图标:"
                          :rules="[{required:true,message:'请调整状态',trigger:'blur'}]">
              <el-upload :imit="1"
                         action="#"
                         list-type="picture-card"
                         :auto-upload="false"
                         accept=".svg"
                         :before-upload="beforeAvatarUpload"
                         :on-remove="handleRemove"
                         :on-change="changeFile"
                         :file-list="iconList"
                         :limit="1"
                         :on-preview="handlePictureCardPreview">
                <i class="el-icon-plus"/>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible"
                         append-to-body>
                <img width="100%"
                     :src="dialogImageUrl"
                     alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="description"
                          label="描述:">
              <el-input type="textarea"
                        v-model="dataForm.description"
                        style="min-height: 148px"
                        :autosize="{ minRows: 6}"
                        :disabled="canSelectType.indexOf(dataForm.status) < 0"
                        placeholder="请输入描述信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider>数据配置</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="参数定义:">
              <div class="listPanel">
                <div class="listHeader">
                  <el-row type="flex" justify="space-between">
                    <div class="searchDiv">
                      <input type="text" v-model="searchProps" autocomplete="off" placeholder="请输入字段名"
                             class="searchInput"/>
                      <span class="el-input__prefix">
                        <i class="el-input__icon el-icon-search"></i>
                      </span>
                      <div class="countViewer">
                        <el-tooltip class="item" effect="dark" :content="searchPropsByRegex?'已启用正则':'已停用正则'"
                                    placement="top-start">
                          <i :class="searchPropsByRegex?'el-icon-open':'el-icon-turn-off'"
                             @click="searchPropsByRegex= !searchPropsByRegex"></i>
                        </el-tooltip>
                        <span>
                          {{
                            dataForm.config.PROPS.filter(i =>
                                (searchPropsByRegex ? i.search(searchProps) : i.indexOf(searchProps)) >= 0
                            ).length + '/' + dataForm.config.PROPS.length
                          }}
                        </span>
                      </div>
                    </div>
                    <div>
                      <a class="el-icon-circle-plus-outline" @click="dataForm.config.PROPS.push('')"></a>
                    </div>
                  </el-row>
                </div>
                <div style="overflow: auto;margin-left: 30px;max-height: 250px">
                  <div :key="index" v-for="(item,index) in dataForm.config.PROPS">
                    <el-row type="flex" justify="space-between" v-if="(searchPropsByRegex ? item.search(searchProps) : item.indexOf(searchProps)) >= 0">
                      <div>
                        <el-input v-model="dataForm.config.PROPS[index]" size="mini"></el-input>
                      </div>
                      <div style="margin-right: 15px;margin-left: 10px"><i class="el-icon-circle-close" @click="dataForm.config.PROPS.splice(index,1)"/>
                      </div>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="过程定义:">
              <div class="listPanel">
                <div class="listHeader">
                  <el-row type="flex" justify="space-between">
                    <div class="searchDiv">
                      <input type="text" v-model="searchProcess" autocomplete="off" placeholder="请输入过程名"
                             class="searchInput"/>
                      <span class="el-input__prefix">
                        <i class="el-input__icon el-icon-search"></i>
                      </span>
                      <div class="countViewer">
                        <el-tooltip class="item" effect="dark" :content="searchProcessByRegex?'已启用正则':'已停用正则'"
                                    placement="top-start">
                          <i :class="searchProcessByRegex?'el-icon-open':'el-icon-turn-off'"
                             @click="searchProcessByRegex= !searchProcessByRegex"></i>
                        </el-tooltip>
                        <span>
                          {{
                            dataForm.config.PROCESS.filter(i =>
                                (searchProcessByRegex ? i.search(searchProcess) : i.indexOf(searchProcess)) >= 0
                            ).length + '/' + dataForm.config.PROCESS.length
                          }}
                        </span>
                      </div>
                    </div>
                    <div>
                      <a class="el-icon-circle-plus-outline" @click="dataForm.config.PROCESS.push('')"></a>
                    </div>
                  </el-row>
                </div>
                <div style="overflow: auto;margin-left: 30px;max-height: 250px">
                  <div :key="index" v-for="(item,index) in dataForm.config.PROCESS">
                    <el-row type="flex" justify="space-between" v-if="(searchProcessByRegex ? item.search(searchProcess) : item.indexOf(searchProcess)) >= 0">
                      <div>
                        <el-input v-model="dataForm.config.PROCESS[index]" size="mini"></el-input>
                      </div>
                      <div style="margin-right: 15px;margin-left: 10px"><i class="el-icon-circle-close" @click="dataForm.config.PROCESS.splice(index,1)"/>
                      </div>
                    </el-row>
                  </div>
                </div>
              </div>
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
      dataForm: {
        parentId: null,
        moduleName: '',
        status: 'Disabled',
        icon: null,
        previewDiagram: '',
        description: '',
        config: {
          PROPS: [],
          PROCESS: [],
        },
        childNode: null,
      },
      searchProps: "",
      searchPropsByRegex: false,
      searchProcess: "",
      searchProcessByRegex: false,
      iconList: [],
      lists: [],
    };
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    open(data) {
      if (data) {
        let dataForm = {...data, config: {...data.config}}
        if (!dataForm.config.PROPS) {
          dataForm.config.PROPS = [];
        }
        if (!dataForm.config.PROCESS) {
          dataForm.config.PROCESS = [];
        }
        this.iconList = dataForm.icon ? [{url: dataForm.icon}] : []
        this.dataForm = dataForm;
      }
      this.show = true;
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
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        file.url = reader.result;
        this.dataForm.icon = reader.result;
      };
    },
  },
};
</script>

<style scoped>
.listPanel {
  border: 1px solid #EBEEF5;
  border-radius: 4px;
  overflow: hidden;
  background: #FFF;
  display: inline-block;
  vertical-align: middle;
  width: 50%;
  max-height: 300px;
  box-sizing: border-box;
  position: relative;
}

.listPanel .listHeader {
  height: 50px;
  line-height: 50px;
  background: #F5F7FA;
  margin: 0;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px solid #EBEEF5;
  box-sizing: border-box;
  color: #000;
}

.listPanel .listHeader .countViewer {
  display: inline-block;
  position: absolute;
  right: 15px;
  color: #909399;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
}

/*.listPanel .listHeader */
.searchDiv {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  font-size: 14px;
}

.searchInput {
  height: 30px;
  width: 100%;
  font-size: 14px;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 16px;
  border-width: 1px;
  padding-right: 40px;
  padding-left: 30px;
}
</style>
