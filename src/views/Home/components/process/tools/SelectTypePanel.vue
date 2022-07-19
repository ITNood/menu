<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-dialog title="选择流程"
               :visible.sync="dialogVisible"
               width="90%"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               append-to-body>
      <!-- 面包屑 / 当前所在位置导航 -->
      <el-row type="flex" align="middle">
        <el-select v-model="selectRootIndex" size="mini" style="width: 100px"
                   @change="changeCoreTypesAndChoice(rootData)">
          <el-option :value="index" :key="index" :label="item.moduleName" v-for="(item,index) in rootData"/>
        </el-select>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px">
          <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">
            <a v-on:click="choiceTypeByNameClick(item,index)">{{ index == 0 ? '开始' : item }}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="20">
          <el-row v-if="selectTypes && selectTypes.status && selectTypes.status === 'Active'">
            <div v-for="(element, index) in selectTypes.childNode"
                 :key="element.id">
              <el-col :span="6"
                      v-if="element.status === 'Active'"
                      :offset="index%4 > 0 ? 2 : 1">
                <el-card :shadow="(planType.id === element.id)?'always':'hover'"
                         style="margin-bottom: 20px"
                         :style="(planType.id === element.id)?{border:'1px solid #0ff'}:{}">
                  <el-row :gutter="1"
                          type="flex"
                          justify="space-around">
                    <el-col v-if="element.previewDiagram"
                            :span="9">
                      <el-image :src="element.previewDiagram"
                                fit="cover"
                                style="max-width: 100px"/>
                    </el-col>
                    <el-col :span="element.previewDiagram?14:24">
                      <el-row style="text-align: center;margin-bottom: 20px;">
                        <span>{{ element.moduleName }}</span>
                      </el-row>
                      <el-row type="flex" justify="center" align="middle" :gutter="2">
                        <el-col :span="11" v-if="get(element,'loading') || get(element,'childNode').length >0">
                          <el-button v-on:click="choiceTypeClick(element)"
                                     :loading="get(element,'loading')"
                                     size="mini">{{ get(element, 'loading') ? '' : '展开' }}
                          </el-button>
                        </el-col>
                          <el-col :span="11">
                          <el-button size="mini"
                                     v-on:click="plannedTypeClick(element)">
                            {{ (planType.id === element.id) ? '已选定' : '选定' }}
                          </el-button></el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </div>
          </el-row>
        </el-col>
        <el-col :span="4" style="border-left: rgba(222,222,222,0.8) 1px solid; padding-left: 20px"
                v-if="Object.keys(planType).length">
          <div style="width: 100%;padding: 10px 10px 10px 0px; border-bottom: rgba(222,222,222,0.8) 1px solid;">
            <el-row style="padding-bottom: 10px" :gutter="3">
              <el-col :span="6" style="text-align: center">
                <el-row :gutter="1" type="flex" justify="space-around">
                  <el-col :span="4">模</el-col>
                  <el-col :span="4">块</el-col>
                  <el-col :span="4">名</el-col>
                  <el-col :span="4">称</el-col>
                  <el-col :span="4">:</el-col>
                </el-row>
              </el-col>
              <el-col :span="15">{{ planType.moduleName ? (planType.moduleName) : '' }}</el-col>
            </el-row>
            <el-row :gutter="3">
              <el-col :span="6" style="text-align: center">
                <el-row :gutter="1" type="flex" justify="space-around">
                  <el-col :span="4">描</el-col>
                  <el-col :span="4">述</el-col>
                  <el-col :span="4">内</el-col>
                  <el-col :span="4">容</el-col>
                  <el-col :span="4">:</el-col>
                </el-row>
              </el-col>
              <el-col :span="15">{{ planType.description ? (planType.description) : '' }}</el-col>
            </el-row>
          </div>
          <div>
            <el-col>
              <el-button type="text"
                         icon="el-icon-plus"
                         @click="onSelect(null,null)">创建一个新的流程 (新创建)
              </el-button>
            </el-col>
            <el-col>
              <el-button type="text"
                         icon="el-icon-star-on"
                         @click="()=>{this.selectionCanSaveId=false;selectTemplate()}">依据模板创建新流程 (新创建)
              </el-button>
            </el-col>
            <el-col>
              <el-button type="text"
                         icon="el-icon-search"
                         @click="()=>{this.selectionCanSaveId=false;selectHistory()}">依据历史流程创建新流程 (新创建)
              </el-button>
            </el-col>
            <el-col v-if="canRef">
              <el-button type="text"
                         icon="el-icon-link"
                         @click="()=>{this.selectionCanSaveId=true;selectTemplate()}">引用模板 (引用)
              </el-button>
            </el-col>
            <el-col v-if="canRef">
              <el-button type="text"
                         icon="el-icon-link"
                         @click="()=>{this.selectionCanSaveId=true;selectHistory()}">引用历史记录 (引用)
              </el-button>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;$emit('cleanCreate')">{{ $t('el.messagebox.cancel') }}</el-button>
      </span>
    </el-dialog>
    <banner ref="selectProcessBanner"
            @onSelect="onSelect"/>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/base.css';
import {getMenu} from '@/api/process/menu';
import Banner from '../../banner/index.vue';

// 用于选择流程类型和配置相关属性
export default {
  name: 'SelectTypePanel',
  components: {Banner},
  props: {
    defaultVisible: Boolean,
    canRef: Boolean,
  },
  watch: {
    defaultVisible(newVal) {
      this.dialogVisible = newVal;
    },
  },
  data() {
    return {
      selectionCanSaveId: false,
      dialogVisible: this.defaultVisible,
      types: [],
      selectTypes: {},
      planType: {},
      breadcrumb: [],
      selectRootIndex: 0,
      rootData: []
    };
  },
  created() {
    const that = this;
    getMenu().then((response) => {
      this.rootData = response.data
      that.changeCoreTypesAndChoice(response.data);
    });
  },
  methods: {
    get(obj, prop) {
      return obj[prop]
    },
    open() {
      this.dialogVisible = true;
    },
    onSelect(xml, id) {
      if (this.planType) {
        if (!this.selectionCanSaveId) {
          id = null;
        }
        this.convertType2BpmnConfig();
        this.dialogVisible = false;
        this.$emit('onSelect', this.planType, xml, id);
      } else {
        this.$message.info('请选择一个流程类型');
      }
    },
    plannedTypeClick(element) {
      this.planType = element || {};
    },
    getChild(element) {
      // 判断时使用该条件可以将没有子集的类型进行重新加载
      // !(element.childNode && element.childNode.length !== 0)
      if (!(element.childNode)) {
        return getMenu(element.id).then((response) => {
          element.childNode = response.data;
          return new Promise(function (resolve, reject) {
            resolve(element)
          })
        })
      }
      return new Promise(function (resolve, reject) {
        resolve(element)
      })
    },
    changeCoreTypesAndChoice(newCoreTypes) {
      this.types = [];
      this.selectTypes = {};
      this.planType = {};
      this.breadcrumb = [];

      this.types = newCoreTypes;
      this.getChild(newCoreTypes[this.selectRootIndex]).then((selectType) => this.choiceTypeClick(selectType));
    },
    choiceTypeClick(element) {
      if (element && element.status && element.status === 'Active') {
        this.breadcrumb.push(element.moduleName);
        this.selectTypes = element || {};
        element.childNode.forEach((i, index) => {
          i.loading = true;
          this.getChild(i).then((e) => {
            e.loading = false
            this.$set(this.selectTypes.childNode, index, e);
          })
        })
      }
    },
    choiceTypeByNameClick: function (name, index) {
      // Default SelectTypes Is All Types;
      let selectTypes = this.types[this.selectRootIndex];
      if (index !== 0) {
        for (let sliceElement of [...this.breadcrumb.slice(1, index + 1)]) {
          let findItem = selectTypes.childNode.find(
              (i) => i.moduleName === sliceElement
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
            prefabricationPaletteExtendParam['create.ref-service_task' + item.id] = {
              type: 'bpmn:Task',
              group: 'ref',
              title: item.moduleName,
              className: 'customer-element',
              icoImageUrl: item.icon,
              shapeImageUrl: item.previewDiagram,
              index: item.id,
            };
          });
        }
        config.additionalModules.push({
          prefabricationPaletteExtendParam: [
            'value',
            Object.assign(prefabricationPaletteExtendParam),
          ],
        });
        this.planType.bpmnConf = config;
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
