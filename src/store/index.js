import Vuex from 'vuex';
import Vue from 'vue';
import getters from './getters';
import mutations from './mutations';

//Load vuex
Vue.use(Vuex);

export function initialState() {
  return {
    rules: []
  };
}

//create store
const store = new Vuex.Store({
  state: {
    app: initialState()
  },
  getters,
  mutations
});

export default store;
