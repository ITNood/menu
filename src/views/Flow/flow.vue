<template>
  <div>
    <box-news :trayNumber="number"
      :trayType="type"
      :trayVolume="volume"
      :boxNumber="boxNumber"
      :trayLength="trayLength"
      :orders="orders"
      :ordersTotal="ordersTotal"
      :volumeUse="volumeUse"
      :heightUse="heightUse" />
  </div>
</template>

<script>
import BoxNews from './components/boxNews.vue';
export default {
  components: { BoxNews },
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