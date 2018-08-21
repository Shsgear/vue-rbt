import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
// use element ui
import './plugins/element.js'
import './styles/normalize.css';
// globalMethods
import { globalMethods } from './tools/util';
import * as http from './tools/request';


Vue.config.productionTip = false;
Vue.mixin(globalMethods);

Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
