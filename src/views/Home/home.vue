<template>
  <div>
    <bpmn />
    <banner ref="banner" />
  </div>
</template>

<script>
import Bpmn from './components/bpmn.vue';
import Banner from '../../components/banner/index.vue';
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
