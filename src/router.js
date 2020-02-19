import Vue from 'vue';
import Router from 'vue-router'
import Index from "@/views/Index";
import Me from "@/views/Me";
import Article from "@/views/Article";
import Error from "@/components/Error";
import Login from "@/views/Login";

Vue.use(Router);

export default new Router({
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
            component: Article,
            props: true
        },
        {
            path: '/error',
            component: Error
        }
    ]
})