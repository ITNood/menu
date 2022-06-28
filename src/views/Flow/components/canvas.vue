<template>
  <div id="canvasImg"></div>
</template>

<script>
import * as THREE from 'three';
export default {
  name: 'canvasImg',
  props: ['arrayData'],
  data() {
    return {};
  },
  created() {
    console.log('ssss', this.arrayData);
  },
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
</style>