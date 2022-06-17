import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from "./i18n";
import store from './store'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/style.less'
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
