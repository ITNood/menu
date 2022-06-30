<template>
  <div id="canvasImg">
    <el-cascader :options="options"></el-cascader>
  </div>
</template>

<script>
import * as THREE from 'three';
export default {
  name: 'canvasImg',
  props: ['arrayData'],
  data() {
    return {
      options: [
        {
          value: 'zhinan',
          label: '指南',
          disabled: true,
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致',
                },
                {
                  value: 'fankui',
                  label: '反馈',
                },
                {
                  value: 'xiaolv',
                  label: '效率',
                },
                {
                  value: 'kekong',
                  label: '可控',
                },
              ],
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航',
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航',
                },
              ],
            },
          ],
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局',
                  children: [
                    {
                      value: '545',
                      label: '四层',
                    },
                  ],
                },
                {
                  value: 'color',
                  label: 'Color 色彩',
                },
                {
                  value: 'typography',
                  label: 'Typography 字体',
                },
                {
                  value: 'icon',
                  label: 'Icon 图标',
                },
                {
                  value: 'button',
                  label: 'Button 按钮',
                },
              ],
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框',
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框',
                },
                {
                  value: 'input',
                  label: 'Input 输入框',
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器',
                },
                {
                  value: 'select',
                  label: 'Select 选择器',
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器',
                },
                {
                  value: 'switch',
                  label: 'Switch 开关',
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块',
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器',
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器',
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器',
                },
                {
                  value: 'upload',
                  label: 'Upload 上传',
                },
                {
                  value: 'rate',
                  label: 'Rate 评分',
                },
                {
                  value: 'form',
                  label: 'Form 表单',
                },
              ],
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格',
                },
                {
                  value: 'tag',
                  label: 'Tag 标签',
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条',
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件',
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页',
                },
                {
                  value: 'badge',
                  label: 'Badge 标记',
                },
              ],
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告',
                },
                {
                  value: 'loading',
                  label: 'Loading 加载',
                },
                {
                  value: 'message',
                  label: 'Message 消息提示',
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框',
                },
                {
                  value: 'notification',
                  label: 'Notification 通知',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单',
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页',
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑',
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单',
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条',
                },
              ],
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框',
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示',
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框',
                },
                {
                  value: 'card',
                  label: 'Card 卡片',
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯',
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板',
                },
              ],
            },
          ],
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
      ],
    };
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