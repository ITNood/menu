<template>
  <div>
    <div class="containers">
      <div class="canvas" ref="canvas" id="canvas"></div>
      <div class="properties-panel-parent" id="js-properties-panel"></div>
      <button @click="out">导出Xml到控制台（临时）</button>
      <right-menu />
    </div>
    <select-type-panel :visible="dialogVisible"/>
  </div>
</template>

<script>
import 'bpmn-js/dist/assets/diagram-js.css'; // 左边工具栏外框样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'; // 左边工具栏元素样式
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css'; // 右侧编辑框样式

import BpmnModeler from 'bpmn-js/lib/Modeler';
import TranslateModule from "@/components/bpmn/translate";
import PrefabricationPaletteProviderModule from "@/components/bpmn/palette";
import SelectTypePanel from "@/components/process/SelectTypePanel";
import NyanRender from "@/components/bpmn/draw";
import descriptors from "@/components/bpmn/descriptors";
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import rightMenu from './rightMenu.vue';

export default {
  name: 'bpmn',
  components: {SelectTypePanel,rightMenu},
  data() {
    return {
      containerEl: null,
      bpmnModeler: null,
      fileList: [],
      dialogVisible: true
    };
  },
  created() {
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.bpmnModeler = new BpmnModeler({
        container: '#canvas',
        propertiesPanel: {
          parent: '#js-properties-panel',
        },
        additionalModules: [
          PrefabricationPaletteProviderModule,
          NyanRender,
          TranslateModule
        ],
        moddleExtensions:{
          ...descriptors,
          camunda: camundaModdleDescriptor,
        }

      });
      this.bpmnModeler.createDiagram();
    },
    out(){
      this.bpmnModeler.saveXML({format: true}).then(xml=> console.log(xml.xml))
    }
  },
};
</script>

<style scoped lang="less">
.containers {
  height: calc(100vh - 160px);
  position: relative;

  .canvas {
    height: 100%;
  }
}

#js-properties-panel {
  width: 300px;
  height: calc(100vh - 160px);
  position: absolute;
  top: 0;
  right: 0;
  display: block;
}

.properties-panel-parent {
  display: block;
  overflow: auto;
  border: 1px solid #e6e6e6;
}

.properties-panel-parent:empty {
  display: none;
}

.properties-panel-parent > .djs-properties-panel {
  padding-bottom: 70px;
  min-height: 100%;
}
</style>
