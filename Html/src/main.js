import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// use element ui
import './plugins/element.js'
import './styles/normalize.css';

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
