import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import VCharts from 'v-charts';
import './assets/iconlib/iconfont.css';
//import './assets/scss/index.css';
import './assets/fonts/icomoon.css';
import JsonExcel from 'vue-json-excel';

//window.$=window.jQuery=require('jquery');
//require("./assets/js/china");
//require("./assets/js/echarts.min");
//require("./assets/js/index");
//require("./assets/js/jquery.min");
//require("./assets/js/mymap");


// scss style
import './assets/scss/index.scss';

import VDistpicker from 'v-distpicker';

Vue.component('v-distpicker', VDistpicker);

// 引入echarts
Vue.prototype.$echarts = echarts; // echarts挂载在全局

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VCharts)
// vuelidate
Vue.use(Vuelidate);

// axios
Vue.use(VueAxios, axios);
// element ui
Vue.use(ElementUI);
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  el: '#app',
  render: (h) => h(App),
}).$mount('#app');
