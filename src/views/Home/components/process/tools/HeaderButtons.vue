<template>
  <div class="header">
    <input type="file" id="files" ref="refFile" style="display: none" accept=".xml, .bpmn" @change="importLocalFile"/>
    <el-button-group key="file-control">
      <!--          <el-button :size="headerButtonSize" :type="headerButtonType" icon="el-icon-edit-outline" @click="onSave">保存流程</el-button>-->
      <el-button :size="size" :type="type" icon="el-icon-folder-opened"
                 @click="$refs.refFile.click()">打开文件
      </el-button>
      <el-tooltip effect="light">
        <div slot="content">
          <el-button :size="size" type="text" @click="downloadProcessAsXml()">下载为XML文件</el-button>
          <br/>
          <el-button :size="size" type="text" @click="downloadProcessAsSvg()">下载为SVG文件</el-button>
          <br/>
          <el-button :size="size" type="text" @click="downloadProcessAsBpmn()">下载为BPMN文件</el-button>
        </div>
        <el-button :size="size" :type="type" icon="el-icon-download">下载文件</el-button>
      </el-tooltip>
      <el-tooltip effect="light">
        <div slot="content">
          <el-button :size="size" type="text" @click="previewProcessXML">预览XML</el-button>
          <br/>
          <el-button :size="size" type="text" @click="previewProcessJson">预览JSON</el-button>
        </div>
        <el-button :size="size" :type="type" icon="el-icon-view">预览</el-button>
      </el-tooltip>
      <!--        <el-tooltip v-if="simulation" effect="light" :content="this.simulationStatus ? '退出模拟' : '开启模拟'">-->
      <!--          <el-button :size="headerButtonSize" :type="headerButtonType" icon="el-icon-cpu" @click="processSimulation">-->
      <!--            模拟-->
      <!--          </el-button>-->
      <!--        </el-tooltip>-->
    </el-button-group>

    <el-button-group key="align-control">
      <el-tooltip effect="light" content="向左对齐">
        <el-button :size="size" class="align align-left" icon="el-icon-s-data"
                   @click="elementsAlign('left')"/>
      </el-tooltip>
      <el-tooltip effect="light" content="向右对齐">
        <el-button :size="headerButtonSize" class="align align-right" icon="el-icon-s-data"
                   @click="elementsAlign('right')"/>
      </el-tooltip>
      <el-tooltip effect="light" content="向上对齐">
        <el-button :size="headerButtonSize" class="align align-top" icon="el-icon-s-data"
                   @click="elementsAlign('top')"/>
      </el-tooltip>
      <el-tooltip effect="light" content="向下对齐">
        <el-button :size="headerButtonSize" class="align align-bottom" icon="el-icon-s-data"
                   @click="elementsAlign('bottom')"/>
      </el-tooltip>
      <el-tooltip effect="light" content="水平居中">
        <el-button :size="headerButtonSize" class="align align-center" icon="el-icon-s-data"
                   @click="elementsAlign('center')"/>
      </el-tooltip>
      <el-tooltip effect="light" content="垂直居中">
        <el-button :size="headerButtonSize" class="align align-middle" icon="el-icon-s-data"
                   @click="elementsAlign('middle')"/>
      </el-tooltip>
    </el-button-group>

  </div>
</template>

<script>
export default {
  name: "HeaderButtons",
  props: {
    size: {
      type: String,
      default: "small",
      validator: value => ["default", "medium", "small", "mini"].indexOf(value) !== -1
    },
    type: {
      type: String,
      default: "primary",
      validator: value => ["default", "primary", "success", "warning", "danger", "info"].indexOf(value) !== -1
    },
  }
}
</script>

<style scoped>

</style>
