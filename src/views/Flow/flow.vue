<template>
  <div class="flex">
    <box-news :trayNumber="number"
      :trayType="type"
      :trayVolume="volume"
      :boxNumber="boxNumber"
      :trayLength="trayLength"
      :orders="orders"
      :ordersTotal="ordersTotal"
      :volumeUse="volumeUse"
      :heightUse="heightUse"
      :coordinate="coordinate"
      :box="box"
      :length="length"
      :width="width"
      :height="height"
      :show="show"
      :isshow="isshow"
      :lengthNumber="lengthNumber"
      :total="total"
      :play="play"
      @prev="prev"
      @player="player"
      @reset="reset"
      @next="next" />
    <canvas-img :arrayData="array" />

    <tray-kpi :value="numberkpi"
      @updateValue="(val)=>{
        value=val
      }"
      :items="items"
      :trayTotal="trayTotal"
      :ordersNumber="ordersNumber"
      :boxTotal="boxTotal"
      :packedTray="packedTray"
      :unpackTray="unpackTray"
      :packOrder="packOrder"
      :unpackOrder="unpackOrder"
      :packBox="packBox"
      :unpackBox="unpackBox"
      :tailBox="tailBox"
      :packMaxVolume="packMaxVolume"
      :averageVolume="averageVolume"
      :packVolume="packVolume"
      :unpackVolume="unpackVolume"
      :unpackAverageVolume="unpackAverageVolume"
      @change="change" />
  </div>
</template>

<script>
import BoxNews from './components/boxNews.vue';
import TrayKpi from './components/trayKai.vue';
import CanvasImg from './components/canvas.vue';
import datas from './js/data.js';
export default {
  components: { BoxNews, TrayKpi, CanvasImg },
  data() {
    return {
      number: '',
      type: '',
      volume: '',
      boxNumber: '',
      trayLength: '',
      orders: '',
      ordersTotal: '',
      volumeUse: '',
      heightUse: '',
      coordinate: '',
      box: '',
      length: '',
      width: '',
      height: '',
      lengthNumber: '',
      total: '',
      show: false,
      isshow: true,
      play: true,
      numberkpi: '',
      items: [],
      array: '',
      trayTotal: '',
      ordersNumber: '',
      boxTotal: '',
      packedTray: '',
      unpackTray: '',
      packOrder: '',
      unpackOrder: '',
      packBox: '',
      unpackBox: '',
      tailBox: '',
      packMaxVolume: '',
      averageVolume: '',
      packVolume: '',
      unpackVolume: '',
      unpackAverageVolume: '',
    };
  },
  created() {
    this.array = datas;
    this.getKpi();
    this.getTrayNew(datas._Container._Goods[0]);
  },
  mounted() {},
  methods: {
    getKpi() {
      //托盘编号 、Kpi
      const arr = [];
      const data = datas._Container;
      data._Goods.forEach((e, index) => {
        if (e.name) {
          arr.push({ value: e.name });
        }
      });
      this.items = arr;
      this.$nextTick(() => {
        this.numberkpi = arr[0].value; //默认选中第一个
      });
      //kpi
      this.trayTotal = data.OutputSummary.TotalPallet;
      this.ordersNumber = data.OutputSummary.TotalOrder;
      this.boxTotal = data.OutputSummary.TotalBox;
      this.packedTray = data.OutputSummary.PalletPacked;
      this.unpackTray = data.OutputSummary.PalletUnpacked;
      this.packOrder = data.OutputSummary.OrderPacked;
      this.unpackOrder = data.OutputSummary.OrderUnpacked;
      this.packBox = data.OutputSummary.BoxPacked;
      this.unpackBox = data.OutputSummary.BoxUnpacked;
      this.tailBox = data.OutputSummary.TailBoxCount;
      this.packMaxVolume = `${data.OutputSummary.PackedMaxUtil * 100}%`;
      this.averageVolume = `${data.OutputSummary.PackedAvgUtil * 100}%`;
      this.packVolume = `${data.OutputSummary.PackedLessUtil * 100}%`;
      this.unpackVolume = `${data.OutputSummary.UnpackedMaxUtil * 100}%`;
      this.unpackAverageVolume =
        (Math.floor(data.OutputSummary.UnpackedAvgUtil * 10000) / 100).toFixed(
          2
        ) + '%';
    },
    getTrayNew(data) {
      //当前托盘信息
      this.number = data.name;
      this.type = data.pallet_type;
      const width = data.width / 1000,
        height = data.height / 1000,
        depth = data.depth / 1000;
      this.volume =
        (Math.floor(width * height * depth * 100) / 100).toFixed(2) + 'm³';
      this.boxNumber = data.Box.length;
      this.trayLength = `${data.width / 1000}m X ${data.height / 1000}m X ${
        data.depth / 1000
      }m`;
      this.orders = data.Order.join(' , ');
      this.ordersTotal = data.total_order;
      this.volumeUse = `${data.volume_util * 100}%`;
      this.heightUse = `${data.depth_util * 100}%`;
    },
    //选择托盘编号
    change(val) {
      this.numberkpi = val;
      const data = datas._Container;
      const arr = data._Goods.filter((e) => e.name == val);
      const arr1 = data._Goods.filter((e) => e.name !== val);
      arr1.unshift(...arr);
      data._Goods = arr1;
      this.getTrayNew(data._Goods[0]);
    },
    //上一个
    prev() {},
    //播放暂停
    player() {
      this.play = !this.play;
      this.isshow = false;
      console.log(this.play);
    },
    //重置
    reset() {
      this.isshow = true;
    },
    //下一个
    next() {},
  },
};
</script>

<style  scoped>
</style>