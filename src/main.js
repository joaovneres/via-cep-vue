import { createApp } from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/js/bootstrap.min.js';

createApp(App).mount('#app');

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueTheMask);