import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routerList: []
  },
  getters: {
    getrouterList: state => {
      return state.routerList;
    }
  },
  mutations: {
    ADD_ROUTER(state, data) {
      const index = state.routerList.findIndex(item => item.title == data.title)
      if (index == -1) {
        state.routerList.push(data);
      }
    },
    DEL_ROUTER(state, routerName) {
      const list = [...state.routerList].filter(item => item.title !== routerName)
      state.routerList = [...list]
    }
  },
  actions: {
    addRouter({ commit }, routerName) {
      commit("ADD_ROUTER", routerName);
    },
    deleteRouter({ commit }, routerName) {
      commit("DEL_ROUTER", routerName);
    }
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
})
