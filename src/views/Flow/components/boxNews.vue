<template>
  <div id="boxNews">
    <div class="trayNew">
      <h2>当前托盘信息</h2>
      <ul class="trayList">
        <li><span>托盘编号</span>{{trayNumber}}</li>
        <li><span>托盘类型</span>{{trayType}}</li>
        <li><span>托盘总体积</span>{{trayVolume}}</li>
        <li><span>箱子总数</span>{{boxNumber}}</li>
        <li><span>托盘长x宽x高</span>{{trayLength}}</li>
        <li :title="orders"><span>包含订单</span>{{orders}}</li>
        <li><span>订单总数</span>{{ordersTotal}}</li>
        <li><span>体积利用率</span>{{volumeUse}}</li>
        <li><span>高度利用率</span>{{heightUse}}</li>
      </ul>
    </div>
    <div class="trayNew"
      v-if="show">
      <h2>当前货箱信息</h2>
      <ul class="trayList">
        <li><span>货箱序号</span>{{box}}</li>
        <li><span>箱子编号</span>{{caseNumber}}</li>
        <li><span>箱深</span>{{length}}</li>
        <li><span>箱宽</span>{{width}}</li>
        <li><span>箱高</span>{{height}}</li>
        <li><span>坐标</span>{{coordinate}}</li>
      </ul>
    </div>
    <!-- <el-button-group class="button-group">
      <el-button icon="el-icon-download"
        class="btn"
        type="primary"
        @click="exportJson"
        plain>导出数据(.json)</el-button>
      <el-button icon="el-icon-download"
        class="btn"
        type="primary"
        @click="exportCsv"
        plain>导出数据(.csv)</el-button>
    </el-button-group> -->

    <!----动态展示-->
    <div class="show">
      <div class="title">
        <h1 v-if="isshow">动态展示</h1>
        <p v-else>第{{lengthNumber}}个,共{{total}}个</p>
      </div>
      <div class="btn-icon">
        <el-button icon="el-icon-back"
          @click="prev"
          title="上一个"
          circle
          size="mini"></el-button>
        <el-button :icon="play?'el-icon-video-play':'el-icon-video-pause'"
          :title="play?'播放':'暂停'"
          @click="player"
          circle></el-button>
        <el-button icon="el-icon-refresh-right"
          @click="reset"
          title="重置"
          circle></el-button>
        <el-button icon="el-icon-right"
          title="下一个"
          @click="next"
          circle
          size="mini"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { handleDownloadCSV, saveJSON } from '../js/export';
export default {
  name: 'BoxNews',
  props: [
    'trayNumber',
    'trayType',
    'trayVolume',
    'boxNumber',
    'trayLength',
    'orders',
    'ordersTotal',
    'volumeUse',
    'heightUse',
    'coordinate',
    'box',
    'length',
    'width',
    'height',
    'show',
    'isshow',
    'lengthNumber',
    'total',
    'play',
    'arrayData',
    'caseNumber',
  ],
  data() {
    return {
      data: '',
    };
  },
  created() {
    this.data = this.arrayData._Container._Goods[0];
  },
  mounted() {},
  methods: {
    //导出csv
    exportCsv() {
      handleDownloadCSV(this.data.Box);
    },
    //导出json
    exportJson() {
      saveJSON(this.data, '数据');
    },

    prev() {
      this.$emit('prev');
    },
    player() {
      this.$emit('player');
    },
    reset() {
      this.$emit('reset');
    },
    next() {
      this.$emit('next');
    },
  },
};
</script>

<style  scoped>
</style>