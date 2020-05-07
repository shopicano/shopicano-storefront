import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

import Index from "@/components/Index";
import ProductDetails from "@/components/ProductDetails";
import vjquery from 'vue-jquery';

Vue.use(vjquery);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
    {
        path: '/',
        component: Index,
    },
    {
        path: '/products/:id',
        component: ProductDetails,
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes,
});

new Vue({
    mounted() {
        window.addEventListener('resize', () => {
            console.log('boom')
        })
    },
    render: h => h(App),
    router,
}).$mount('#app');
