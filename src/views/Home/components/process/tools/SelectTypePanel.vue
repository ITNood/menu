<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-dialog title="选择流程" :visible.sync="dialogVisible" width="90%" :close-on-click-modal="false"
               :close-on-press-escape="false" :show-close="false" append-to-body>        <!-- 面包屑 / 当前所在位置导航 -->
      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index"><a
              v-on:click="choiceTypeByNameClick(item,index)">{{ item }}</a></el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="20">
          <el-row v-if="selectTypes && selectTypes.status && selectTypes.status === 'Active'">
            <el-col :span="4" v-for="(element, index) in selectTypes.childNode" :key="index"
                    :offset="index%4 > 0 ? 2 : 1">
              <el-card :shadow="(planType.id === element.id)?'always':'hover'" style="margin-bottom: 20px"
                       :style="(planType.id === element.id)?{border:'1px solid #0ff'}:{}">
                <el-row :gutter="20" type="flex" justify="space-around">
                  <el-col v-if="element.preview" :span="10">
                    <el-image :src="element.preview" fit="cover" style="max-width: 100px"/>
                  </el-col>
                  <!--                  <el-col :span="1"></el-col>-->
                  <el-col :span="element.preview?14:24">
                    <el-row style="text-align: center;margin-bottom: 10px;">
                      <span>{{ element.moduleName }}</span></el-row>
                    <el-row style="text-align: center">
                      <el-col :span="12" v-if="element.childNode.length">
                        <el-button v-on:click="choiceTypeClick(element)" size="mini">展开</el-button>
                      </el-col>
                      <el-col :span="element.childNode.length?12:24">
                        <el-button size="mini" v-on:click="plannedTypeClick(element)">
                          {{ (planType.id === element.id) ? '已选定' : '选定' }}
                        </el-button>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" v-if="Object.keys(planType).length">
          <el-col>
            <el-form>
              <el-form-item label="已选中：">{{ planType.moduleName ? (planType.moduleName) : '' }}</el-form-item>
              <el-form-item label="描述内容：">{{ planType.description ? (planType.description) : '' }}</el-form-item>
            </el-form>
          </el-col>
          <el-col>
            <el-button type="text" icon="el-icon-plus" @click="onSelect(null,null)">创建一个新的流程</el-button>
          </el-col>
          <el-col>
            <el-button type="text" icon="el-icon-star-on" @click="selectTemplate">选择模板</el-button>
          </el-col>
          <el-col>
            <el-button type="text" icon="el-icon-search" @click="selectHistory">使用历史流程</el-button>
          </el-col>
        </el-col>
      </el-row>
      <!--      <span slot="footer" class="dialog-footer">-->
      <!--        <el-button @click="dialogVisible = false">{{ $t('el.messagebox.cancel') }}</el-button>-->
      <!--        <el-button type="primary" @click="dialogVisible = false">{{ $t('el.messagebox.confirm') }}</el-button>-->
      <!--      </span>-->
    </el-dialog>
    <banner ref="selectProcessBanner" @onSelect="onSelect"/>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/base.css';
import {list} from '@/api/process/menu';
import Banner from '../../banner/index.vue';

// 用于选择流程类型和配置相关属性
export default {
  name: 'SelectTypePanel',
  components: {Banner},
  props: {
    defaultVisible: Boolean
  },
  watch: {
    defaultVisible(newVal) {
      this.dialogVisible = newVal
    }
  },
  data() {
    return {
      dialogVisible: this.defaultVisible,
      types: [],
      selectTypes: {},
      planType: {},
      breadcrumb: [],
    };
  },
  created() {
    const that = this;
    list().then((response) => {
      that.changeCoreTypesAndChoice(response.data);
    })
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    onSelect(xml, id) {
      if (this.planType) {
        this.convertType2BpmnConfig();
        this.dialogVisible = false;
        this.$emit('onSelect', this.planType, xml, id);
      } else {
        this.$message.info("请选择一个流程类型")
      }
    },
    plannedTypeClick(element) {
      this.planType = element || {}
    },
    changeCoreTypesAndChoice(newCoreTypes) {
      this.types = [];
      this.selectTypes = {};
      this.planType = {};
      this.breadcrumb = [];

      this.types = newCoreTypes;
      this.choiceTypeClick(this.types[0]);
    },
    choiceTypeClick(element) {
      if (element.status && element.status === 'Active') {
        this.breadcrumb.push(element.moduleName);
        this.selectTypes = element || {};
      }
    },
    choiceTypeByNameClick: function (name, index) {
      // Default SelectTypes Is All Types;
      let selectTypes = this.types[0];
      if (index != 0) {
        for (let sliceElement of [...this.breadcrumb.slice(1, index + 1)]) {
          let findItem = selectTypes.childNode.find(
              (i) => i.moduleName == sliceElement
          );
          if (findItem) {
            selectTypes = findItem;
          } else {
            break;
          }
        }
        this.breadcrumb = this.breadcrumb.slice(0, index);
      } else {
        this.breadcrumb = [];
      }
      this.choiceTypeClick(selectTypes);
    },
    convertType2BpmnConfig() {
      if (!this.planType.bpmnConf) {
        let config = {
          additionalModules: [],
        };
        let prefabricationPaletteExtendParam = {};
        if (this.planType.childNode.length) {
          prefabricationPaletteExtendParam['ref:separator:top'] = 'ref';
          this.planType.childNode.forEach((item) => {
            prefabricationPaletteExtendParam['create.ref-service_task' + item.id] =
                {
                  type: 'refBpmn:RefServiceTask',
                  group: 'ref' + item.id,
                  title: item.moduleName,
                  className: 'customer-element',
                  icoImageUrl: item.icon,
                  shapeImageUrl: item.preview,
                  index: item.id,
                };
          });
        }
        config.additionalModules.push({
          prefabricationPaletteExtendParam: ['value', Object.assign(prefabricationPaletteExtendParam)],
        });
        this.planType.bpmnConf = config
      }
    },

    selectTemplate() {
      this.convertType2BpmnConfig();
      this.$refs['selectProcessBanner'].open('template', this.planType);
    },
    selectHistory() {
      this.convertType2BpmnConfig();
      this.$refs['selectProcessBanner'].open('', this.planType);
    },
  },
};
</script>
<style scoped>
</style>
