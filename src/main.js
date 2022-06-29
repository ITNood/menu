import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from "./i18n";
import store from './store'
import ElementUI from 'element-ui';
import hljs from 'highlight.js';
import axios from 'axios';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/style.less'
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

Vue.use(hljs.vuePlugin);
Vue.config.productionTip = false
Vue.prototype.$axios= axios
Vue.use(ElementUI)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
