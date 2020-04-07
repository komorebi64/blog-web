import Vue from 'vue';
import Router from 'vue-router'
import Index from "@/pages/index/views/Index";
import Me from "@/pages/index/views/Me";
import Article from "@/pages/index/views/Article";
import Error from "@/pages/index/components/Error";
import Login from "@/pages/index/views/Login";
import Registered from "@/pages/index/views/Registered";

Vue.use(Router);

export default new Router({

  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/me',
      component: Me
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article,
      props: true
    },
    {
      path: '/error/:msg',
      name: 'error',
      component: Error,
      props: true
    },
    {
      path: '/registered/:csrf',
      name: 'registered',
      component: Registered,
      props: true
    }
  ]
})
