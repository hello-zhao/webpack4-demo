import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import home from './home';

export default new Vuex.Store({
  modules: {
    home,
  },
});
