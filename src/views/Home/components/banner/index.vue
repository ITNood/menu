<template>
  <div v-if="dialogVisible">
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="60%"
               id="stepChild"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <!--查询-->
      <el-form :model="queryParams"
               ref="queryForm"
               :inline="true"
               label-width="68px">
        <el-form-item label="名称"
                      prop="name">
          <el-input v-model="queryParams.name"
                    placeholder="请输入名称"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery"/>
        </el-form-item>
        <el-form-item label="开始时间"
                      prop="deployTime">
          <!--          <el-date-picker clearable size="small" v-model="queryParams.deployTime" type="date"-->
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     size="mini"
                     @click="handleQuery">搜索
          </el-button>
          <el-button icon="el-icon-refresh"
                     size="mini"
                     @click="resetQuery('queryParams')">重置
          </el-button>
        </el-form-item>
      </el-form>

      <el-carousel height="600px" style="margin-bottom: 30px;" type="card"
                   :initial-index="carouselIndex"
                   :autoplay="false"
                   trigger="click"
                   :loop="false"
                   indicator-position="outside"
                   @change="change">
        <el-carousel-item v-for="(item,index) in dataRows"
                          :key="index"
                          style="border: 1px rgba(106,250,255,0.84) solid ;background-color: rgba(224,224,224,0.47)">
          <div class="bpmnDiv" :ref="'viewer'+ index" tabindex="-1"></div>
        </el-carousel-item>
      </el-carousel>

      <div class="news"
           v-if="dataRows[carouselIndex]">
        <el-form :model="dataRows[carouselIndex]"
                 ref="newForm"
                 :inline="true">
          <el-row :gutter="2" type="flex" justify="space-between">
            <el-col :span="12">
              <el-form-item label="名称："
                            prop="idName">
                <el-input disabled
                          :value="dataRows[carouselIndex].processName"
                          width="200px"></el-input>
              </el-form-item>
              <el-form-item label="版本号："
                            prop="version"
                            v-if="dataRows[carouselIndex].vesrionsList">
                <el-select :value="dataRows[carouselIndex].version"
                           @change="changeVersion">
                  <el-option v-for="(list,index) in dataRows[carouselIndex].vesrionsList"
                             :key="index"
                             :value="list.version"
                             :label="list.version"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-pagination background small
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page="queryParams.pageNum"
                             :page-sizes="[5,10, 20, 30, 40]"
                             :page-size="queryParams.pageSize"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="queryParams.total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary"
                   @click="selection">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {list as processList} from '@/api/process';
import BpmnViewer from 'bpmn-js/lib/Viewer';
import {
  PrefabricationModuleDescriptor,
  PrefabricationReaderModule,
  PrefabricationTranslateModule,
} from '@/components/bpmn/prefabrication';

// 通过鼠标移动画布
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
// 编辑器事件，在使用键盘组件时需要添加
import EditorActionsModule from 'bpmn-js/lib/features/editor-actions';
// 键盘监听扩展
import KeyboardModule from 'bpmn-js/lib/features/keyboard';
// 通过键盘移动画布的功能
import KeyboardMoveModule from 'diagram-js/lib/navigation/keyboard-move/index.js';
// Ctrl + F 搜索框
import SearchModule from 'bpmn-js/lib/features/search';

export default {
  name: 'Banner',
  data() {
    return {
      queryParams: {
        startTime: '',
        name: '',
        pageNum: 1,
        pageSize: 5,
        type: 'select',
        category: 0,
        total: 0
      },
      allViewerCache: {},
      carouselIndex: 0,
      carouselIndexSelectHistory: [0],
      dataRows: [],
      selectType: {},
      dialogVisible: false,
    };
  },
  created() {
  },
  methods: {
    open(group, type) {
      // 获取相关菜单ID的视图数据
      this.selectType = type;
      this.queryParams = {
        deployTime: '',
        name: '',
        pageNum: 1,
        pageSize: 5,
        type: 'select',
        category: group + type.id,
        total: 0
      };
      this.dialogVisible = true;
      this.getList();
    },
    selection() {
      let that = this;
      that.dialogVisible = false;
      if (that.dataRows[that.carouselIndex]) {
        that.$emit(
            'onSelect',
            that.dataRows[that.carouselIndex].readXml,
            that.dataRows[that.carouselIndex].definitionId
        );
      }
    },
    cancel() {
      let that = this;
      that.dialogVisible = false;
    },
    loadMore() {
      if ((this.carouselIndex + 1) !== this.dataRows.length) {
        this.carouselIndex += 1;
        this.reloadViewer(() => {
          this.carouselIndex -= 1;
        });
      }
    },
    getList() {
      this.dataRows = [];
      this.carouselIndexSelectHistory = [0];
      processList(this.queryParams).then((response) => {
        this.queryParams.total = response.total
        this.carouselIndex = 0;
        this.dataRows = response.rows ?? [];
        if (this.dataRows.length) {
          this.reloadViewer(this.loadMore)
        }
      });
    },
    //选择版本号
    changeVersion(val) {
      let nowSelect = this.dataRows[this.carouselIndex];
      const data = nowSelect.vesrionsList.filter((item) => {
        if (item.version == val) {
          return item;
        }
      })[0];
      Object.keys(nowSelect).forEach((i) => {
        if (i !== 'vesrionsList') {
          nowSelect[i] = data[i];
        }
      });
      if (data.readXml) {
        this.reloadViewer();
      }
    },
    //选择轮播图
    change(index) {
      this.carouselIndex = index;
      // 避免重复加载历史页面
      if (this.carouselIndexSelectHistory.indexOf(index) < 0) {
        this.loadMore();
        this.carouselIndexSelectHistory.push(index);
      }
    },
    reloadViewer(moreFun) {
      return this.$nextTick(() => {
        this.createViewer(
            'viewer' + this.carouselIndex,
            this.dataRows[this.carouselIndex].readXml
        );
        if (moreFun) {
          moreFun()
        }
      });
    },
    createViewer(container, xml) {
      let that = this;
      let idContainer = that.allViewerCache[container];
      if (idContainer) {
        idContainer.destroy();
      }
      if (xml) {
        let ref = that.$refs[container][0];
        let bpmn = new BpmnViewer({
          container: ref,
          keyboard: {bindTo: ref},
          additionalModules: [
            MoveCanvasModule,
            KeyboardMoveModule,
            EditorActionsModule,
            SearchModule,
            KeyboardModule,
            PrefabricationTranslateModule,
            PrefabricationReaderModule,
            ...(this.selectType.bpmnConf?.additionalModules ?? [
              {prefabricationPaletteExtendParam: ['value', {}]},
            ]),
          ],
          moddleExtensions: {
            ...PrefabricationModuleDescriptor,
          },
        });
        this.allViewerCache[container] = bpmn;
        bpmn.importXML(xml).then(() => {
          bpmn.get('canvas').zoom('fit-viewport', 'auto');
        });
      }
    },
    //搜索
    handleQuery() {
      this.getList();
    },
    //重置
    resetQuery(queryParams) {
      // this.resetForm('queryForm');
      this.$refs[queryParams].resetFields();
      this.handleQuery();
    },

    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.queryParams.pageNum = val;
      this.getList();
    },
  },
};
</script>

<style lang="css" scoped>
.bpmnDiv {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+');
  color: #99a9bf;
  height: 100%;
}
</style>
