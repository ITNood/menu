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
          <!-- <el-cascader placeholder="试试搜索：指南"             :options="options"             filterable></el-cascader> -->
          <el-row v-if="selectTypes && selectTypes.status && selectTypes.status === 'Active'">
            <el-col :span="4" v-for="(element, index) in selectTypes.childNode" :key="index"
                    :offset="index%4 > 0 ? 2 : 1">
              <el-card :shadow="(element.status && element.status === 'Active')?'hover':'never'">
                <div style="padding: 14px;text-align: center;">
                  <el-col v-if="element.preview" :span="10">
                    <el-image :src="element.preview" fit="cover" style="max-width: 100px"/>
                  </el-col>
                  <el-col :span="element.preview?14:24">
                    <el-row>
                      <span>{{ element.moduleName }}</span></el-row>
                    <el-row>
                      <el-col :span="12" v-if="element.childNode.length">
                        <el-button v-on:click="choiceTypeClick(element)" size="mini">展开</el-button>
                      </el-col>
                      <el-col :span="element.childNode.length?12:24">
                        <el-button size="mini">选定</el-button>
                      </el-col>
                    </el-row>
                  </el-col>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-col>
            <el-button type="text" icon="el-icon-plus" @click="onSelect(null)">创建一个新的流程</el-button>
          </el-col>
          <el-col>
            <el-button type="text" icon="el-icon-star-on" @click="selectTemplate">选择模板</el-button>
          </el-col>
          <el-col>
            <el-button type="text" icon="el-icon-search" @click="selectHistory">使用历史流程</el-button>
          </el-col>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('el.messagebox.cancel') }}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{ $t('el.messagebox.confirm') }}</el-button>
      </span>
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
  data() {
    return {
      dialogVisible: false,
      bannerVisible: false,
      types: [],
      selectTypes: {},
      breadcrumb: [],
      options: [],
      value: '',
    };
  },
  created() {
    const that = this;

    list().then((response) => {
      that.types = response.data;
    }).then(() => that.choiceTypeClick(that.types[0]));
  },
  methods: {
    open() {
      this.dialogVisible = !this.dialogVisible;
    },
    onSelect(xml) {
      this.convertType2BpmnConfig();
      this.dialogVisible = false;
      this.$emit('onSelect', this.selectTypes, xml);
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
      if (!this.selectTypes.bpmnConf) {
        let config = {
          additionalModules: [],
        };
        let prefabricationPaletteExtendParam = {
          'ref:separator:top': 'ref',
        };
        this.selectTypes.childNode.forEach((item) => {
          prefabricationPaletteExtendParam['create.ref-service_task' + item.id] =
              {
                type: 'refBpmn:RefServiceTask',
                group: 'ref' + item.id,
                title: item.moduleName,
                className: 'ttttt0',
                icoImageUrl: item.icon,
                shapeImageUrl: item.preview,
                index: item.id,
              };
        });
        config.additionalModules.push({
          prefabricationPaletteExtendParam: [
            'value',
            Object.assign(prefabricationPaletteExtendParam),
          ],
        });
        this.selectTypes.bpmnConf = config
      }
    },

    selectTemplate() {
      this.convertType2BpmnConfig();
      this.$refs['selectProcessBanner'].open('template', this.selectTypes);
    },
    selectHistory() {
      this.$refs['selectProcessBanner'].open('history', this.selectTypes);
    },
  },
};
</script>
<style scoped>
</style>
