<template>
  <div v-if="dialogVisible">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" id="stepChild">       <!--查询-->
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="queryParams.name" placeholder="请输入名称" clearable size="small"
                    @keyup.enter.native="handleQuery"/>
        </el-form-item>
        <el-form-item label="开始时间" prop="deployTime">
          <el-date-picker clearable size="small" v-model="queryParams.deployTime" type="date"
                          placeholder="选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-carousel height="600px" :initial-index="carouselIndex" :autoplay="false" indicator-position="none"
                   @change="change">
        <el-carousel-item v-for="(item,index) in dataRows" :key="index">
          <div :ref="'viewer'+ index"
               :style="{height: '600px',width:'90%',background:'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+'}"
          />
        </el-carousel-item>
      </el-carousel>

      <div class="news" v-if="dataRows[carouselIndex]">
        <el-form :model="dataRows[carouselIndex]" ref="newForm" :inline="true">
          <el-form-item label="名称：" prop="idName">
            <el-input disabled :value="dataRows[carouselIndex].processName" width="200px"></el-input>
          </el-form-item>
          <el-form-item label="版本号：" prop="version" v-if="dataRows[carouselIndex].vesrionsList">
            <el-select :value="dataRows[carouselIndex].version" @change="changeVersion">
              <el-option v-for="(list,index) in dataRows[carouselIndex].vesrionsList" :key="index" :value="list.version"
                         :label="list.version"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false,$destroy">取 消</el-button>
        <el-button type="primary" @click="selection">确 定</el-button>
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

export default {
  name: 'Banner',
  data() {
    return {
      queryParams: {
        deployTime: '',
        name: '',
        pageNum: 1,
        pageSize: 10,
        type: 'select',
        category: 0,
      },
      allViewerCache: {},
      carouselIndex: 0,
      dataRows: [],
      selectType: {},
      dialogVisible: false,
    };
  },
  created() {
    console.log("recc")
  },
  methods: {
    open(group, type) {
      // 获取相关菜单ID的视图数据
      this.dataRows = [];
      this.selectType = type;
      this.queryParams.category = type.id;
      this.dialogVisible = !this.dialogVisible;
      this.getList();
    },
    selection() {
      this.dialogVisible = false
      this.$emit("onSelect", this.dataRows[this.carouselIndex].readXml)
      this.$destroy()
    },
    getList() {
      processList(this.queryParams).then((response) => {
        this.dataRows = response.rows ?? [];
        this.carouselIndex = 0;

        if (this.dataRows.length) {
          this.reloadViewer();
        }
        // this.show = true;

        // this.items = response.rows;
        //
        // //默认第一个
        // this.newForm.idName = response.rows[0].processName;
        // this.newForm.version = response.rows[0].version;
        // this.lists = response.rows[0].vesrionsList.rows.map((item) => {
        //   return {version: item.version};
        // });
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
      Object.keys(nowSelect).forEach(i => {
        if (i !== 'vesrionsList') {
          nowSelect[i] = data[i]
        }
      })
      this.reloadViewer();
    },
    //选择轮播图
    change(index) {
      this.carouselIndex = index;
      this.reloadViewer();
    },
    reloadViewer() {
      this.$nextTick(() => {
        this.createViewer('viewer' + this.carouselIndex,
            this.dataRows[this.carouselIndex].readXml
        );
      });
    },
    createViewer(container, xml) {
      let that = this;
      let idContainer = that.allViewerCache[container];
      if (idContainer) {
        idContainer.destroy();
      }
      let ref = that.$refs[container][0]
      let bpmn = new BpmnViewer({
        container: ref,
        keyboard: {bindTo: ref},
        additionalModules: [
          PrefabricationTranslateModule,
          PrefabricationReaderModule,
          ...(this.selectType.bpmnConf?.additionalModules ?? []),
        ],
        moddleExtensions: {
          ...PrefabricationModuleDescriptor,
        },
      });
      this.allViewerCache[container] = bpmn;
      bpmn.importXML(xml).then(() => {
        bpmn.get('canvas').zoom('fit-viewport', 'auto');
      });
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
  },
};
</script>
<style lang="scss" scoped></style>
