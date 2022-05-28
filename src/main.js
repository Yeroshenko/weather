import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import initVue from '@/plugins/initVue';

Vue.config.productionTip = false;

initVue(Vue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
