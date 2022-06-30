<template>
  <div>
    <header-buttons size="mini"
      type="primary"
      v-model="bpmnProp.zoom"
      v-if="bpmnProp.bpmn"
      :bpmn="bpmnProp.bpmn"
      :min-zoom="0.1"
      :max-zoom="4" />
    <div class="containers"
      ref="containers">
      <div class="canvas"
        ref="canvas"
        id="canvas"></div>
      <div class="properties-panel-parent"
        id="js-properties-panel"></div>

      <right-menu @toggleFlow="out"
        :panel-types="selectType"
        :elements="selectElements"
        :bpmn="bpmnProp.bpmn"
        @changeField="changeField" />
    </div>
    <select-type-panel ref="typeSelect"
      @onSelect="typeSelect" />
  </div>
</template>

<script>
/**
 * CSS
 */
import 'bpmn-js/dist/assets/diagram-js.css'; // 左边工具栏外框样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'; // 左边工具栏元素样式
/**
 * Plugins
 */
import HeaderButtons from './tools/HeaderButtons';
import RightMenu from './rightMenu.vue';
import SelectTypePanel from './tools/SelectTypePanel';
/**
 * Bpmn And Bpmn Extend
 */
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
  PrefabricationModuleDescriptor,
  PrefabricationPaletteModule,
  PrefabricationReaderModule,
  PrefabricationTranslateModule,
} from '@/components/bpmn/prefabrication';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

export default {
  name: 'bpmn',

  //
  components: { SelectTypePanel, HeaderButtons, RightMenu },

  data() {
    return {
      // 定制的元素标准颜色在不同场景下
      elementColorEnum: {
        unSave: {
          fill: null,
          stroke: 'rgb(255,0,0)',
        },
        imperfect: {
          fill: null,
          stroke: 'rgb(255,255,55)',
        },
        unCheck: {
          fill: null,
          stroke: 'rgb(0,255,255)',
        },
        complete: {
          fill: null,
          stroke: 'rgb(0,255,0)',
        },
        error: {
          fill: 'rgb(255,0,0)',
          stroke: 'rgb(0,0,0)',
        },
      },

      selectType: {},
      selectElements: [],
      // 系统处理标识，在初始化后更新
      initialized: false,
      bpmnProp: {
        container: 'canvas',
        keyboardDefaultBindTo: window,
        bpmn: null,
        keyboard: null,
        zoom: 1,
        modules: {
          modeling: null,
          eventBus: null,
          editorActions: null,
          clipboard: null,
          canvas: null,
        },
      },
    };
  },
  created() {},
  mounted() {
    this.$refs['typeSelect'].open();
  },
  methods: {
    typeSelect(selectType, xml) {
      this.selectType = selectType;
      let config = {
        additionalModules: [],
      };

      let prefabricationPaletteExtendParam = {
        'ref:separator:top': 'ref',
      };

      selectType.childNode.forEach((item) => {
        console.log('-------------', item);
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

      this.init(xml, config);
    },

    /**
     * 初始化Bpmn图
     * @param xml
     * @param conf
     */
    init(xml, conf) {
      let props = this.bpmnProp;
      let that = this;

      if (props.bpmn) {
        props.bpmn.destroy();
      }

      props.bpmn = new BpmnModeler({
        container: that.$refs[props.container],
        keyboard: props.keyboard ?? { bindTo: props.keyboardDefaultBindTo },
        additionalModules: [
          PrefabricationTranslateModule,
          PrefabricationPaletteModule,
          PrefabricationReaderModule,
          ...(conf?.additionalModules ?? []),
        ],
        moddleExtensions: {
          ...PrefabricationModuleDescriptor,
          camunda: camundaModdleDescriptor,
        },
      });
      Object.keys(props.modules).forEach(
        (key) => (props.modules[key] = props.bpmn.get(key))
      );

      that.initListeners();
      that.importXML(props.bpmn, xml);
    },

    /**
     * XML导入Bpmn的验证和导入操作
     * @param bpmn
     * @param xml
     */
    async importXML(bpmn, xml) {
      if (xml) {
        bpmn.importXML(xml);
      } else {
        if (bpmn.createDiagram) {
          await bpmn.createDiagram().then(() => {
            bpmn
              .get('elementRegistry')
              .updateId(
                bpmn.get('canvas').getRootElements()[0],
                'Process_' + Date.now().valueOf()
              );
          });
        }
      }
    },

    /**
     * 一些固定需要的监听方法
     */
    initListeners() {
      let props = this.bpmnProp;
      // 监听视图缩放变化
      props.modules.eventBus.on('canvas.viewbox.changed', ({ viewbox }) => {
        this.$emit('canvas-viewbox-changing', { viewbox });
        const { scale } = viewbox;
        props.zoom = Math.floor(scale * 100) / 100;
      });

      // props.modules.eventBus.on("element.updateProperties", (element) => {
      //   // 数据更新后
      //   console.log(element)
      //   // this.selectElements = this.selectElements;
      //
      //   // let newValue = this.selectElements;
      //   // this.selectElements = [];
      //   // this.selectElements = newValue;
      // });

      props.modules.eventBus.on('selection.changed', (event) => {
        this.selectElements = event.newSelection.length
          ? event.newSelection
          : this.bpmnProp.modules.canvas.getRootElements();
      });

      props.modules.eventBus.on('connection.changed', ({ element }) => {
        let type = element.type;
        let source = element.source;
        let target = element.target;
        if (source.type.includes('StartEvent')) {
          if (source.outgoing.length > 1) {
            this.removeCollection(
              element,
              this.$createElement(
                'i',
                { style: 'color: teal' },
                '开始点仅可对应一个目标内容'
              )
            );
          }
        } else if (source.type.includes('EndEvent')) {
          this.removeCollection(
            element,
            this.$createElement('i', { style: 'color: teal' }, '当前节点已结束')
          );
        } else if (source.type.includes('Gateway')) {
          if (source.outgoing.length > 2) {
            this.removeCollection(
              element,
              this.$createElement(
                'i',
                { style: 'color: teal' },
                '条件仅可使用“是”，“否”两个分支'
              )
            );
          } else if (target.type.includes('Gateway')) {
            this.removeCollection(
              element,
              this.$createElement(
                'i',
                { style: 'color: teal' },
                '不可重复巡回节点，此操作将会死循环'
              )
            );
          } else {
            this.synchronousCondition(
              element,
              source.outgoing[source.outgoing.indexOf(element) == 0 ? 1 : 0]
            );
          }
        } else if (source.type.includes('Task')) {
          if (source.outgoing.length > 1) {
            this.removeCollection(
              element,
              this.$createElement(
                'i',
                { style: 'color: teal' },
                '任务仅可有一个目标内容'
              )
            );
          }
        } else if (source.type.includes('ThrowEvent')) {
          if (source.outgoing.length > 1) {
            this.removeCollection(
              element,
              this.$createElement(
                'i',
                { style: 'color: teal' },
                '中间输出操作仅可有一个目标内容'
              )
            );
          }
        } else if (source.type.includes('SubProcess')) {
          if (source.outgoing.length > 1) {
            this.removeCollection(
              element,
              this.$createElement(
                'i',
                { style: 'color: teal' },
                '子任务结束后仅可有一个目标内容'
              )
            );
          }
        }
      });

      props.modules.eventBus.on('element.changed', ({ element }) => {
        let type = element.type ?? '';
        if (type.includes('StartEvent') || type.includes('EndEvent')) {
          let haveBegin = false;
          let havaEnd = false;
          if (element.parent) {
            let brother = element.parent.children;
            for (let i = brother.length - 1; i >= 0; i--) {
              let itemType = brother[i].type;
              if (itemType.includes('StartEvent')) {
                if (haveBegin) {
                  this.removeCollection(
                    element,
                    this.$createElement(
                      'i',
                      { style: 'color: teal' },
                      '每个层级仅可包含一个开始和一个结束'
                    )
                  );
                  break;
                } else {
                  haveBegin = true;
                }
              } else if (itemType.includes('EndEvent')) {
                if (havaEnd) {
                  this.removeCollection(
                    element,
                    this.$createElement(
                      'i',
                      { style: 'color: teal' },
                      '每个层级仅可包含一个开始和一个结束'
                    )
                  );
                  break;
                } else {
                  havaEnd = true;
                }
              }
            }
          }
        }
      });
    },

    /**
     * 用于同步两个内容的值，当前用于分支的线条自动取反
     * @param first
     * @param second
     */
    synchronousCondition(first, second) {
      if (first && second) {
        let firstName = first.businessObject.name;
        let secondName = second.businessObject.name;
        if (
          (firstName ? (firstName == 'true' ? 'false' : 'true') : null) !=
          secondName
        ) {
          if (firstName) {
            this.bpmnProp.modules.modeling.updateProperties(second, {
              name: firstName == 'true' ? 'false' : 'true',
            });
          } else if (secondName) {
            this.bpmnProp.modules.modeling.updateProperties(first, {
              name: secondName == 'true' ? 'false' : 'true',
            });
          }
        }
      } else if (!first.businessObject.name) {
        this.bpmnProp.modules.modeling.updateProperties(first, {
          name: 'true',
        });
      }
    },

    /**
     * 删除一个元素的实现
     * @param element
     * @param message
     */
    removeCollection(element, message) {
      if (element.constructor.name === 'Shape') {
        this.bpmnProp.modules.canvas._removeElement(element, 'shape');
        this.removeCollection(element.outgoing);
        this.removeCollection(element.incoming);
        if (message) {
          this.$message.warning({
            title: '提示',
            message: message,
          });
        }
      } else if (element.constructor.name === 'Connection') {
        this.bpmnProp.modules.canvas._removeElement(element, 'connection');
        element.source.outgoing.remove(element);
        element.target.incoming.remove(element);
        if (message) {
          this.$message.warning({
            title: '提示',
            message: message,
          });
        }
      }
    },

    /**
     * 复制当前Bpmn组件视图的内容，并复制到电脑的裁剪板中
     */
    selectAllAndCopy() {
      let editorActions = this.bpmnProp.modules.editorActions;
      // 选中全部
      editorActions.trigger('selectElements');
      // 复制到Bpmn内部
      editorActions.trigger('copy');
      // 将Bpmn内容数据导出到裁剪板
      this.globalCopy();
    },

    /**
     * 将Bpmn内容剪切板中的内容复制到电脑的剪切板中
     */
    globalCopy() {
      let modules = this.bpmnProp.modules;
      // 复制到计算机裁剪板
      navigator.clipboard.writeText(JSON.stringify(modules.clipboard.get()));
    },

    /**
     * TODO 未完全实现
     * 全局粘贴
     */
    globalPaste() {
      let modules = this.bpmnProp.modules;
      // 复制到计算机裁剪板
      let selfCopies = modules.clipboard.get();
      navigator.clipboard.readText().then((text) => {
        try {
          let beforeCopiesValue = JSON.parse(text);
          modules.clipboard.set(beforeCopiesValue);
        } catch (e) {
          modules.clipboard.set(selfCopies);
        }
        //
      });
    },

    /**
     * 给定元素并将其修改颜色
     * @param color
     * @param element
     */
    changeColor(color, ...element) {
      this.bpmnProp.modules.modeling.setColor([...element], color);
    },

    /**
     * 修改元素的属性
     * @param event
     * @param type
     */
    changeField(element, type) {
      let isImperfect = false;
      let isUnSave = false;
      let isUnCheck = true;
      let isSuccess = true;
      if (isImperfect) {
        this.changeColor(this.elementColorEnum.imperfect, element);
      } else if (isUnSave) {
        this.changeColor(this.elementColorEnum.unSave, element);
      } else if (isUnCheck) {
        this.changeColor(this.elementColorEnum.unCheck, element);
      } else if (isSuccess) {
        this.changeColor(this.elementColorEnum.complete, element);
      }
    },

    out() {},
  },
};
</script>

<style lang="less">
.containers {
  height: calc(100vh - 160px);
  position: relative;

  .canvas {
    background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')
      repeat !important;
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
