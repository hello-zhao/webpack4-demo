import Vue from 'vue';
import { AppContainer } from '@/components';
import store from '@/store';
import router from '@/router';

new Vue({
  el: '#root',
  router,
  store,
  components: { AppContainer },
  render(h) {
    return h(AppContainer, null, [h('router-view')]);
  },
});
