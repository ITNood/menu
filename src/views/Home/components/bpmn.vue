<template>
  <div>
    <div class="containers">
      <div class="canvas" ref="canvas" id="canvas"></div>
      <!-- <div class="properties-panel-parent" id="js-properties-panel"></div> -->
      <right-menu />
    </div>
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';
import customTranslate from '../js/customTranslate';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import rightMenu from './rightMenu.vue';
// import {
//   // BpmnPropertiesPanelModule,
//   // BpmnPropertiesProviderModule,
// } from 'bpmn-js-properties-panel';

export default {
  components: { rightMenu },
  name: 'bpmn',
  data() {
    return {
      containerEl: null,
      bpmnModeler: null,
      fileList: [],
      customTranslateModule: {
        translate: ['value', customTranslate],
      },
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
        propertiesPanel: {
          parent: '#js-properties-panel',
        },
        additionalModules: [
          // BpmnPropertiesPanelModule,
          // BpmnPropertiesProviderModule,
          this.customTranslateModule, //汉化
        ],
        moddleExtensions: {
          //如果要在属性面板中修改属性，必须添加
          camunda: camundaModdleDescriptor,
        },
      });
      this.bpmnModeler.createDiagram();
    },
  },
};
</script>

<style  scoped lang="less">
@import '~bpmn-js/dist/assets/diagram-js.css'; // 左边工具栏外框样式
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'; // 左边工具栏元素样式
@import '~bpmn-js-properties-panel/dist/assets/properties-panel.css'; // 右侧编辑框样式
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