<template>
  <div>
    <bpmn />
    <banner ref="banner" />
  </div>
</template>

<script>
import Banner from '../../components/banner/index.vue';
import Bpmn from './components/process/bpmn.vue';
export default {
  components: { Bpmn, Banner },
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
