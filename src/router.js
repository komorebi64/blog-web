import Vue from 'vue';
import Router from 'vue-router'
import Index from "@/views/Index";
import Me from "@/views/Me";
import Article from "@/views/Article";
import Error from "@/components/Error";
import Login from "@/views/Login";
import Registered from "@/views/Registered";

Vue.use(Router);

export default new Router({
    mode:'history',
    routes:[
        {
            path: '/',
            component: Index
        },
        {
            path: '/login',
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