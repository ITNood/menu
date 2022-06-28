<template>
  <div class="header">
    <input type="file"
      id="files"
      ref="refFile"
      style="display: none"
      accept=".xml, .bpmn" />

    <el-dialog title="预览"
      width="60%"
      :visible.sync="previewModelVisible"
      id="previewXml"
      append-to-body
      destroy-on-close>
      <highlightjs autodetect
        :language="previewType"
        :code="previewResult"
        style="height: 60vh" />
    </el-dialog>
    <!--    @change="importLocalFile"-->
    <el-button-group key="file-control">
      <!--          <el-button :size="size" :type="headerButtonType" icon="el-icon-edit-outline" @click="onSave">保存流程</el-button>-->
      <el-button :size="size"
        :type="type"
        icon="el-icon-folder-opened"
        @click="$refs.refFile.click()">打开文件
      </el-button>
      <el-tooltip effect="light">
        <div slot="content">
          <el-button :size="size"
            type="text"
            @click="downloadProcessAsXml()">下载为XML文件</el-button>
          <br />
          <el-button :size="size"
            type="text"
            @click="downloadProcessAsSvg()">下载为SVG文件</el-button>
          <br />
          <el-button :size="size"
            type="text"
            @click="downloadProcessAsBpmn()">下载为BPMN文件</el-button>
        </div>
        <el-button :size="size"
          :type="type"
          icon="el-icon-download">下载文件</el-button>
      </el-tooltip>
      <el-tooltip effect="light">
        <div slot="content">
          <el-button :size="size"
            type="text"
            @click="previewProcessXML">预览XML</el-button>
          <br />
          <el-button :size="size"
            type="text"
            @click="previewProcessJson">预览JSON</el-button>
        </div>
        <el-button :size="size"
          :type="type"
          icon="el-icon-view">预览</el-button>
      </el-tooltip>
      <!--      <el-tooltip v-if="simulation" effect="light" :content="this.simulationStatus ? '退出模拟' : '开启模拟'">-->
      <!--        <el-button :size="size" :type="headerButtonType" icon="el-icon-cpu" @click="processSimulation">-->
      <!--          模拟-->
      <!--        </el-button>-->
      <!--      </el-tooltip>-->
    </el-button-group>

    <el-button-group key="align-control">
      <el-tooltip effect="light"
        content="向左对齐">
        <el-button :size="size"
          class="align align-left"
          icon="el-icon-s-data"
          @click="elementsAlign('left')" />
      </el-tooltip>
      <el-tooltip effect="light"
        content="向右对齐">
        <el-button :size="size"
          class="align align-right"
          icon="el-icon-s-data"
          @click="elementsAlign('right')" />
      </el-tooltip>
      <el-tooltip effect="light"
        content="向上对齐">
        <el-button :size="size"
          class="align align-top"
          icon="el-icon-s-data"
          @click="elementsAlign('top')" />
      </el-tooltip>
      <el-tooltip effect="light"
        content="向下对齐">
        <el-button :size="size"
          class="align align-bottom"
          icon="el-icon-s-data"
          @click="elementsAlign('bottom')" />
      </el-tooltip>
      <el-tooltip effect="light"
        content="水平居中">
        <el-button :size="size"
          class="align align-center"
          icon="el-icon-s-data"
          @click="elementsAlign('center')" />
      </el-tooltip>
      <el-tooltip effect="light"
        content="垂直居中">
        <el-button :size="size"
          class="align align-middle"
          icon="el-icon-s-data"
          @click="elementsAlign('middle')" />
      </el-tooltip>
    </el-button-group>

    <el-button-group key="scale-control">
      <el-tooltip effect="light"
        content="缩小视图">
        <el-button :size="size"
          :disabled="value <= minZoom"
          icon="el-icon-zoom-out"
          @click="processZoomOut()" />
      </el-tooltip>
      <el-button :size="size">{{ Math.floor(this.value * 10 * 10) + "%" }}</el-button>
      <el-tooltip effect="light"
        content="放大视图">
        <el-button :size="size"
          :disabled="value >= maxZoom"
          icon="el-icon-zoom-in"
          @click="processZoomIn()" />
      </el-tooltip>
      <el-tooltip effect="light"
        content="自适应">
        <el-button :size="size"
          icon="el-icon-c-scale-to-original"
          @click="processAutoZoom()" />
      </el-tooltip>
    </el-button-group>

    <el-button-group key="stack-control">
      <el-tooltip effect="light"
        content="撤销">
        <el-button :size="size"
          :disabled="!bpmn.get('commandStack').canRedo"
          icon="el-icon-refresh-left"
          @click="processUndo()" />
      </el-tooltip>
      <el-tooltip effect="light"
        content="恢复">
        <el-button :size="size"
          :disabled="!bpmn.get('commandStack').canUndo"
          icon="el-icon-refresh-right"
          @click="processRedo()" />
      </el-tooltip>
      <!--      <el-tooltip effect="light" content="重新绘制">-->
      <!--        <el-button :size="size" icon="el-icon-refresh" @click="processRestart"/>-->
      <!--      </el-tooltip>-->
    </el-button-group>
  </div>
</template>

<script>
import convert from 'xml-js';
import 'highlight.js/styles/googlecode.css';

export default {
  name: 'HeaderButtons',
  props: {
    bpmn: Object,
    size: {
      type: String,
      default: 'small',
      validator: (value) =>
        ['default', 'medium', 'small', 'mini'].indexOf(value) !== -1,
    },
    type: {
      type: String,
      default: 'primary',
      validator: (value) =>
        ['default', 'primary', 'success', 'warning', 'danger', 'info'].indexOf(
          value
        ) !== -1,
    },
    // Zoom
    value: {
      type: Number,
      default: 1,
    },
    // Zoom
    defaultZoom: {
      type: Number,
      default: 1,
    },
    minZoom: {
      type: Number,
      default: 0.1,
    },
    maxZoom: {
      type: Number,
      default: 7,
    },
    zoomStep: {
      type: Number,
      default: 0.1,
    },
  },
  watch: {
    value(newValue) {
      this.processZoomTo(newValue);
    },
  },
  data() {
    return {
      previewType: 'xml',
      previewResult: '',
      previewModelVisible: false,
    };
  },
  methods: {
    // 下载流程图到本地
    async downloadProcess(type, name) {
      try {
        const _this = this;
        // 按需要类型创建文件并下载
        if (type === 'xml' || type === 'bpmn') {
          const { err, xml } = await this.bpmn.saveXML({ format: true });
          // 读取异常时抛出异常
          if (err) {
            console.error(`[Process Designer Warn ]: ${err.message || err}`);
          }
          let { href, filename } = _this.setEncoded(
            type.toUpperCase(),
            name,
            xml
          );
          downloadFunc(href, filename);
        } else {
          const { err, svg } = await this.bpmn.saveSVG();
          // 读取异常时抛出异常
          if (err) {
            return console.error(err);
          }
          let { href, filename } = _this.setEncoded('SVG', name, svg);
          downloadFunc(href, filename);
        }
      } catch (e) {
        console.error(`[Process Designer Warn ]: ${e.message || e}`);
      }

      // 文件下载方法
      function downloadFunc(href, filename) {
        if (href && filename) {
          let a = document.createElement('a');
          a.download = filename; //指定下载的文件名
          a.href = href; //  URL对象
          a.click(); // 模拟点击
          URL.revokeObjectURL(a.href); // 释放URL 对象
        }
      }
    },
    // 根据所需类型进行转码并返回下载地址
    setEncoded(type, filename = 'diagram', data) {
      const encodedData = encodeURIComponent(data);
      return {
        filename: `${filename}.${type}`,
        href: `data:application/${
          type === 'svg' ? 'text/xml' : 'bpmn20-xml'
        };charset=UTF-8,${encodedData}`,
        data: data,
      };
    },

    downloadProcessAsXml() {
      this.downloadProcess('xml');
    },
    downloadProcessAsBpmn() {
      this.downloadProcess('bpmn');
    },
    downloadProcessAsSvg() {
      this.downloadProcess('svg');
    },
    elementsAlign(align) {
      const Align = this.bpmn.get('alignElements');
      const Selection = this.bpmn.get('selection');
      const SelectedElements = Selection.get();
      if (!SelectedElements || SelectedElements.length <= 1) {
        this.$message.warning('请按住 Ctrl 键选择多个元素对齐');
        return;
      }
      this.$confirm('自动对齐可能造成图形变形，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => Align.trigger(SelectedElements, align));
    },

    processZoomIn(zoomStep = this.zoomStep) {
      this.processZoomTo(Math.floor(this.value * 100 + zoomStep * 100) / 100);
    },
    processZoomOut(zoomStep = this.zoomStep) {
      this.processZoomTo(Math.floor(this.value * 100 - zoomStep * 100) / 100);
    },
    processAutoZoom() {
      let zoom = this.defaultZoom;
      this.$emit('input', zoom);
      this.$emit('change', zoom);
      this.bpmn.get('canvas').zoom('fit-viewport', 'auto');
    },
    processZoomTo(newZoom = 1) {
      if (newZoom < this.minZoom) {
        throw new Error(
          '[Process Designer Warn ]: The zoom ratio cannot be less than ' +
            this.minZoom
        );
      }
      if (newZoom > this.maxZoom) {
        throw new Error(
          '[Process Designer Warn ]: The zoom ratio cannot be greater than ' +
            this.maxZoom
        );
      }
      console.log(newZoom);
      this.$emit('input', newZoom);
      this.$emit('change', newZoom);
      this.bpmn.get('canvas').zoom(newZoom);
    },
    processRedo() {
      this.bpmn.get('commandStack').redo();
    },
    processUndo() {
      this.bpmn.get('commandStack').undo();
    },
    previewProcessXML() {
      this.bpmn.saveXML({ format: true }).then(({ xml }) => {
        this.previewResult = xml;
        this.previewType = 'xml';
        this.previewModelVisible = true;
      });
    },
    previewProcessJson() {
      this.bpmn.saveXML({ format: true }).then(({ xml }) => {
        this.previewResult = convert.xml2json(xml, { spaces: 2 });
        this.previewType = 'json';
        this.previewModelVisible = true;
      });
    },
  },
};
</script>

<style scoped>
</style>
