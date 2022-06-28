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
        <li><span>包含订单</span>{{orders}}</li>
        <li><span>订单总数</span>{{ordersTotal}}</li>
        <li><span>体积利用率</span>{{volumeUse}}</li>
        <li><span>高度利用率</span>{{heightUse}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
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
  ],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
</style>