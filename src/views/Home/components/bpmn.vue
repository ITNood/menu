<template>
  <div>
    <div class="containers">
      <div class="canvas" ref="canvas"></div>
      <div class="properties-panel-parent" id="js-properties-panel"></div>
    </div>
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css'; // 左边工具栏外框样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'; // 左边工具栏元素样式
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css'; // 右侧编辑框样式
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel';
// import BpmnPropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';

export default {
  name: 'bpmn',
  data() {
    return {
      containerEl: null,
      bpmnModeler: null,
      fileList: [],
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      const canvas = document.getElementById('canvas');
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        propertiesPanel: {
          parent: '#js-properties-panel',
        },
        additionalModules: [
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule,
          // PrefabricationPaletteProviderModule
        ],
      });
    },
  },
};
</script>

<style  scoped lang="less">
</style>