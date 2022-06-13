<template>
  <div class="containers" ref="containers">
    <div id="js-canvas" class="canvas" ref="canvas"></div>
    <div id="js-properties-panel"></div>
  </div>
</template>
<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'; // 引入 bpmn-js
// import customTranslate from './customTranslate/customTranslate'; //汉化
import xmlStr from '../../../assets/js/xml'; //引入默认显示的xml字符串数据

//右侧属性栏功能
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

export default {
  data() {
    return {
      bpmnModeler: null,
      containers: null,
      canvas: null,
      // customTranslateModule: {
      //   translate: ['value', customTranslate],
      // },
    };
  },
  mounted() {
    this.initDiagram();
  },
  methods: {
    //初始化方法
    initDiagram() {
      this.containers = this.$refs.containers; // 获取到属性ref为“containers”的dom节点
      const canvas = this.$refs.canvas; // 获取到属性ref为“canvas”的dom节点
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        //添加控制板
        propertiesPanel: {
          parent: '#js-properties-panel',
        },
        //左侧
        additionalModules: [
          // this.customTranslateModule,
          // 右边的属性栏
          propertiesProviderModule,
          propertiesPanelModule,
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
        },
      });
      this.createNewDiagram();
    },
    // 注意：必须先加载一个bpmn文件，新建就是加载一个空的bpmn文件，否则不能拖拽节点
    createNewDiagram() {
      /**
       * 获取后台，获取默认的xml
       * */
      // var diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';
      // this.$axios.get(diagramUrl).then((res)=>{
      //     console.log(res.data)
      //     this.openDiagram(res.data)
      //   }).catch((err)=>{
      //     console.log(err)
      //   })
      let mr_xml = xmlStr; //默认值-xml
      // let mr_xml = '' //默认值-xml
      this.openDiagram(mr_xml);
    },
    openDiagram(xml) {
      /**
       * 导入xml（字符串形式），返回导入结果
       * 后续会取消传入回调函数的方式
       * 推荐使用async/await或者链式调用
       * @param { string } xml 流程图xml字符串
       * @param { Promise } callback 回调函数，出错时返回{ warnings，err }
       */
      this.bpmnModeler.importXML(xml, function (err) {
        if (err) {
          // container
          //     .removeClass('with-diagram')
          //     .addClass('with-error');
          console.error(err);
        } else {
          // container
          //   .removeClass('with-error')
          //   .addClass('with-diagram');
        }
      });
    },
  },
};
</script>
<style lang="less">
/*左边工具栏以及编辑节点的样式*/
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
/*右侧详情*/
@import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  .canvas {
    width: 100%;
    height: 100%;
  }
  .bjs-powered-by {
    display: none;
  }
}
</style>
 