import Vue from 'vue';
import Vuex from 'vuex';
import loginStore from './modules/login';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    login: loginStore
  }
});

export default store;

