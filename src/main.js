import Vue from 'vue';
import App from './App.vue';
import iView from 'iview';
import locale from 'iview/dist/locale/en-US';
import store from './store';

import 'iview/dist/styles/iview.css';

Vue.use(iView, { locale });
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
