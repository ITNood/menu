<template>
  <div id="canvasImg">
  </div>
</template>

<script>
import * as THREE from 'three';
export default {
  name: 'canvasImg',
  props: ['arrayData'],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    init() {
      this.arrayData._Container._Goods.forEach((e) => {
        e.Box.forEach((item, index) => {
          const width = item.width;
          const height = item.height;
          const depth = item.depth;
          switch (item.rotation) {
            case 0: // WHD
              item.width = width;
              item.height = height;
              item.depth = depth;
              item._SequenceNr = index + 1;
              break;
            case 1: // HWD
              item.width = height;
              item.height = width;
              item.depth = depth;
              item._SequenceNr = index + 1;
              break;
            case 2: // HDW)
              item.width = height;
              item.height = depth;
              item.depth = width;
              item._SequenceNr = index + 1;
              break;
            case 3: // DHW
              item.width = depth;
              item.height = height;
              item.depth = width;
              item._SequenceNr = index + 1;
              break;
            case 4: // DWH
              item.width = depth;
              item.height = width;
              item.depth = height;
              item._SequenceNr = index + 1;
              break;
            case 5: // WDH
              item.width = width;
              item.height = depth;
              item.depth = height;
              item._SequenceNr = index + 1;
              break;
          }
        });
      });
      const serverLocation = 'http://localhost:65384';
      const runtimeManager = new RuntimeManager();
      const renderH = $('#canvasImg').height();
      const renderW = $('#canvasImg').width();
      const camera = new THREE.PerspectiveCamera(
        45,
        renderW / renderH,
        1,
        100000
      );
      camera.position.set(8000, 2000, 5000); //中心坐标 12000, 5000, 10000
      const scene = new THREE.Scene(); //三维坐标
      scene.background = new THREE.Color('white'); //背景色
      if (renderer) {
        document.getElementById('canvasImg').removeChild(renderer.domElement);
      }
      const renderer = new THREE.WebGLRenderer({ antialias: true }); //创建渲染器对象
      renderer.domElement.id = 'solution-preview';
      renderer.setSize(renderW, renderH); //设置全屏大小
      document.getElementById('canvasImg').appendChild(renderer.domElement); //添加到dom节点
      const controls = new THREE.OrbitControls(camera, renderer.domElement); //鼠标旋转、缩放、滚轮大小
      const ray = new THREE.Raycaster(); //点击交互
      animate();
      runtimeManager.addSolution(new Solution(data));
      camera.fov = 20;
      camera.updateProjectionMatrix();
    },
  },
};
</script>

<style  scoped>
</style>