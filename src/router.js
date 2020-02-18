import Vue from 'vue';
import Router from 'vue-router'
import Index from "@/views/Index";
import Me from "@/views/Me";

Vue.use(Router);

export default new Router({
    routes:[
        {
            path: '/',
            component: Index
        },
        {
            path: '/me',
            component: Me
        }
    ]
})