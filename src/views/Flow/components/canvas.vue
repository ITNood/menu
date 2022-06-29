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
  methods: {
    init() {
      this.arrayData._Container._Goods.forEach((e) => {
        e.Box.forEach((item, index) => {
          switch (item.rotation) {
            case 0: // WHD
              item.width = item.width;
              item.height = item.height;
              item.depth = item.depth;
              item._SequenceNr = index + 1;
              break;
            case 1: // HWD
              item.width = item.height;
              item.height = item.width;
              item.depth = item.depth;
              item._SequenceNr = index + 1;
              break;
            case 2: // HDW)
              item.width = item.height;
              item.height = item.depth;
              item.depth = item.width;
              item._SequenceNr = index + 1;
              break;
            case 3: // DHW
              item.width = item.depth;
              item.height = item.height;
              item.depth = item.width;
              item._SequenceNr = index + 1;
              break;
            case 4: // DWH
              item.width = item.depth;
              item.height = item.width;
              item.depth = item.height;
              item._SequenceNr = index + 1;
              break;
            case 5: // WDH
              item.width = item.width;
              item.height = item.depth;
              item.depth = item.height;
              item._SequenceNr = index + 1;
              break;
          }
        });
      });
      serverLocation = 'http://localhost:65384';
      runtimeManager = new RuntimeManager();
      renderH = $('#canvasImg').height();
      renderW = $('#canvasImg').width();
      console.log(renderH, renderW);
      camera = new THREE.PerspectiveCamera(45, renderW / renderH, 1, 100000);
      camera.position.set(8000, 2000, 5000); //中心坐标 12000, 5000, 10000
      scene = new THREE.Scene(); //三维坐标
      scene.background = new THREE.Color('white'); //背景色
      if (renderer) {
        document.getElementById('canvasImg').removeChild(renderer.domElement);
      }
      renderer = new THREE.WebGLRenderer({ antialias: true }); //创建渲染器对象
      renderer.domElement.id = 'solution-preview';
      renderer.setSize(renderW, renderH); //设置全屏大小
      document.getElementById('canvasImg').appendChild(renderer.domElement); //添加到dom节点
      controls = new THREE.OrbitControls(camera, renderer.domElement); //鼠标旋转、缩放、滚轮大小
      ray = new THREE.Raycaster(); //点击交互
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