<template>
  <div>
    <div id="trayKpi">
      <div style="padding:15px">
        <span>托盘编号：</span>
        <el-select v-model="valueData"
          placeholder="选择托盘编号:"
          @change="handleChange">
          <el-option v-for="e in items"
            :key="e.value"
            :label="e.value"
            :value="e.value"></el-option>
        </el-select>
      </div>

      <div class="content">
        <h2>KPI</h2>
        <ul>
          <li>
            <span>总托盘数</span>{{trayTotal}}
          </li>
          <li>
            <span>总订单数</span>{{ordersNumber}}
          </li>
          <li>
            <span>总货箱数</span>{{boxTotal}}
          </li>
          <li>
            <span>已打包托盘</span>{{packedTray}}
          </li>
          <li>
            <span>未打包托盘</span>{{unpackTray}}
          </li>
          <li>
            <span>已打包订单</span>{{packOrder}}
          </li>
          <li>
            <span>未打包订单</span>{{unpackOrder}}
          </li>
          <li>
            <span>已打包货箱</span>{{packBox}}
          </li>
          <li>
            <span>未打包货箱</span>{{unpackBox}}
          </li>
          <li>
            <span>尾箱数量</span>{{tailBox}}
          </li>
          <li>
            <span>已打包最大体积利用率</span>{{packMaxVolume}}
          </li>
          <li>
            <span>已打包平均体积利用率</span>{{averageVolume}}
          </li>
          <li>
            <span>已打包体积利用率</span>{{packVolume}}
          </li>
          <li>
            <span>未打包最大体积</span>{{unpackVolume}}
          </li>
          <li>
            <span>未打包平均体积</span>{{unpackAverageVolume}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrayKpi',
  props: {
    value: String,
    items: Array,
    trayTotal: Number,
    ordersNumber: Number,
    boxTotal: Number,
    packedTray: Number,
    unpackTray: Number,
    packOrder: Number,
    unpackOrder: Number,
    packBox: Number,
    unpackBox: Number,
    tailBox: Number,
    packMaxVolume: String,
    averageVolume: String,
    packVolume: String,
    unpackVolume: String,
    unpackAverageVolume: String,
  },
  data() {
    return {};
  },
  computed: {
    valueData: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('updateValue', val);
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(val) {
      this.$emit('change', val);
    },
  },
};
</script>

<style  scoped>
</style>