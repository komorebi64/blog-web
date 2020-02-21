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

router.beforeEach((to, from, next) => {
if (to.matched.length ===0) {                                  //如果未匹配到路由
  //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    from.name ? next({ name:from.name }) : next('/');
  } else {
  //如果匹配到正确跳转
    next();
  }

});