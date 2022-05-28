import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

function loadPlugins(Vue) {
    Vue.use(VueToast);
    Vue.use(Vuesax);
}

export default function initVue(Vue) {
    loadPlugins(Vue);
}
