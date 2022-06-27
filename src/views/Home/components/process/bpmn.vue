<template>
  <div>
    <!--    <header-buttons size="mini" type="primary"/>-->
    <div class="containers">
      <div class="canvas" ref="canvas" id="canvas"></div>
      <div class="properties-panel-parent" id="js-properties-panel"></div>
      <!--      <button @click="out">导出Xml到控制台（临时）</button>-->
      <right-menu @toggleFlow="out" />
    </div>
    <select-type-panel :visible="dialogVisible" />
  </div>
</template>

<script>
/**
 * CSS
 */
import 'bpmn-js/dist/assets/diagram-js.css'; // 左边工具栏外框样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'; // 左边工具栏元素样式
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css'; // 右侧编辑框样式
/**
 * Plugins
 */
// import HeaderButtons from "@/views/Home/components/process/tools/HeaderButtons";
import RightMenu from './rightMenu.vue';
import SelectTypePanel from './tools/SelectTypePanel';
/**
 * Bpmn And Bpmn Extend
 */
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
  PrefabricationTranslateModule,
  PrefabricationPaletteModule,
  PrefabricationReaderModule,
  PrefabricationModuleDescriptor,
} from '@/components/bpmn/prefabrication';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

export default {
  name: 'bpmn',
  components: { SelectTypePanel, RightMenu },

  data() {
    return {
      containerEl: null,
      bpmnModeler: null,
      fileList: [],
      dialogVisible: true,
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.bpmnModeler = new BpmnModeler({
        container: '#canvas',
        additionalModules: [
          PrefabricationTranslateModule,
          PrefabricationPaletteModule,
          PrefabricationReaderModule,
        ],
        moddleExtensions: {
          ...PrefabricationModuleDescriptor,
          camunda: camundaModdleDescriptor,
        },
      });
      this.bpmnModeler.createDiagram();
    },
    out() {
      // this.bpmnModeler.saveXML({format: true}).then(xml => console.log(xml.xml))

      this.dialogVisible = !this.dialogVisible;
      this.bpmnModeler
        .saveXML({ format: true })
        .then((xml) => console.log(xml.xml));
    },
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
