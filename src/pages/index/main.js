import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router'
import axios from "axios";

import Utils from '@/common/utils';
import constant from "@/constants/common"
import router from "@/pages/index/router";
import store from "@/pages/index/store";


import { Main, Container, Col, Card, Divider, Row, Breadcrumb, Button, Link, Pagination,
  Input, Tag, TimelineItem, Tooltip, Collapse, Header, Menu, MenuItem, Dropdown, DropdownMenu,
  DropdownItem, PageHeader, Footer, Avatar, BreadcrumbItem, Loading, Notification, Timeline} from 'element-ui';

Vue.use(Main);
Vue.use(Container);
Vue.use(Col);
Vue.use(Card);
Vue.use(Divider);
Vue.use(Row);
Vue.use(Breadcrumb);
Vue.use(Button);
Vue.use(Link);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Tag);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Tooltip);
Vue.use(Collapse);
Vue.use(Header);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(PageHeader);
Vue.use(Footer);
Vue.use(Avatar);
Vue.use(BreadcrumbItem);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.prototype.utils = Utils;
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
  return routerPush.call(this, location).catch(error => error)
}

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {                                  //如果未匹配到路由
    //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    from.name ? next({name: from.name}) : next('/');
  } else {
    //如果匹配到正确跳转
    next();
  }

});
