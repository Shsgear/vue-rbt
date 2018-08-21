import * as types from '../mutation-types';

const user = {
  state: {
    isLoggedin: false,
    adminName: '',
    UUID: ''
  },
  getters: {
    adminName: state => state.adminName,
    UUID: state => state.UUID,
    isLoggedin: state => state.isLoggedin
  },
  mutations: {
    [types.LOGIN](state, adminInfo) {
      state.isLoggedin = true;
      state.adminName = adminInfo.adminName;
      state.UUID = adminInfo.UUID;
    },
    [types.LOGOUT](state) {
      state.isLoggedin = false;
      state.adminName = '';
      state.UUID = '';
    },
  },
  actions: {
    loginAction({ commit }, adminInfo) {
      console.log(adminInfo);
      commit(types.LOGIN, adminInfo);
    },
    logoutAction({ commit }) {
      commit(types.LOGOUT);
    }
  }
}

export default user;
