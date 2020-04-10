import Vue from 'vue';
import store from "@/pages/index/store";
import App from './App.vue';
import router from "@/pages/index/router";
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import Utils from '../../common/utils';
import axios from "axios";

import constant from "@/constants/common"

Vue.use(ElementUI);
Vue.prototype.utils=Utils;
Vue.prototype.common = constant;
Vue.config.productionTip = false;
axios.defaults.baseURL = constant.API_URL;
axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

/**
 * 重写路由的push方法 防止两次访问相同路由地址报错
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

router.beforeEach((to, from, next) => {
if (to.matched.length ===0) {                                  //如果未匹配到路由
  //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    from.name ? next({ name:from.name }) : next('/');
  } else {
  //如果匹配到正确跳转
    next();
  }

});
