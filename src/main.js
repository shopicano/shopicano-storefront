import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import VueRouter from "vue-router"

import 'buefy/dist/buefy.css'
import Home from "@/components/Home";

Vue.use(Buefy);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
    {
        path: '/',
        component: Home,
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes,
});

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
