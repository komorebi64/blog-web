import Vue from 'vue';
import Router from 'vue-router'
import EditMd from "@/pages/admin/views/EditMd";
import Home from "@/pages/admin/views/Home";
import ArticleList from "@/pages/admin/views/ArticleList";
import Setting from "@/pages/admin/views/Setting";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin/editmd/:id',
      name: 'editmd-props',
      props: true,
      component: EditMd
    },
    {
      path: '/admin/editmd',
      name: 'editmd',
      component: EditMd
    },
    {
      path: '/admin/home',
      name: 'home',
      component: Home
    },
    {
      path: '/admin/article',
      name: 'articleList',
      component: ArticleList
    },
    {
      path: '/admin/setting',
      name: 'setting',
      component: Setting
    }
  ]
})
