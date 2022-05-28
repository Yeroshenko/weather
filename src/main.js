import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';

import 'material-icons/iconfont/material-icons.css';

Vue.use(VueToast);
Vue.use(Vuesax);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
