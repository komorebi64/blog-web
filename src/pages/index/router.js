import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

export default new Router({

  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve=>require(['@/pages/index/views/Index.vue'],resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve=>require(['@/pages/index/views/Login.vue'],resolve)
    },
    {
      path: '/me',
      component: resolve=>require(['@/pages/index/views/Me.vue'],resolve)
    },
    {
      path: '/article/:id',
      name: 'article',
      component: resolve=>require(['@/pages/index/views/Article.vue'],resolve),
      props: true
    },
    {
      path: '/error/:msg',
      name: 'error',
      component: resolve=>require(['@/pages/index/components/Error.vue'],resolve),
      props: true
    },
    {
      path: '/registered/:csrf',
      name: 'registered',
      component: resolve=>require(['@/pages/index/views/Registered.vue'],resolve),
      props: true
    },
    {
      path: '/tags',
      name: 'tag',
      component: resolve=>require(['@/pages/index/views/Tag.vue'],resolve)
    },
    {
      path: '/tags/:id',
      name: 'tagParam',
      component: resolve=>require(['@/pages/index/views/Tag.vue'],resolve),
      props: true
    }
  ]
})
