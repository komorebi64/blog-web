import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Utils from './common/utils';

Vue.use(ElementUI);
Vue.prototype.utils=Utils;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
