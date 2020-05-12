import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

import Index from "@/components/Index";
import ProductDetails from "@/components/ProductDetails";
import vjquery from 'vue-jquery';
import Storage from 'vue-ls';
import Checkout from "@/components/Checkout";
import SessionStore from "@/common/session_store";
import Login from "@/components/Login";
import CreateAccount from "@/components/CreateAccount";
import CheckoutShippingMethodSetup from "@/components/CheckoutShippingMethodSetup";
import CheckoutBillingMethodSetup from "@/components/CheckoutBillingMethodSetup";
import CheckoutReview from "@/components/CheckoutReview";
import VueMeta from 'vue-meta'
import OrderDetails from "@/components/OrderDetails";

Vue.use(vjquery);
Vue.use(VueRouter);
Vue.use(VueMeta);

let options = {
    namespace: 'shopicano__', // key prefix
    name: 'ls',
    storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

Vue.config.productionTip = false;

const routes = [
    {
        path: '/',
        component: Index,
    },
    {
        path: '/products/:id',
        component: ProductDetails,
    },
    {
        path: '/checkout',
        component: Checkout,
        beforeEnter: (to, from, next) => {
            if (!SessionStore.IsLoggedIn(Vue.ls)) {
                SessionStore.setReturnPath(Vue.ls, '/checkout');
                next({path: '/login'});
            } else {
                next();
            }
        }
    },
    {
        path: '/checkout-shipping',
        component: CheckoutShippingMethodSetup,
        beforeEnter: (to, from, next) => {
            if (!SessionStore.IsLoggedIn(Vue.ls)) {
                SessionStore.setReturnPath(Vue.ls, '/checkout');
                next({path: '/login'});
            } else {
                next();
            }
        }
    },
    {
        path: '/checkout-billing',
        component: CheckoutBillingMethodSetup,
        beforeEnter: (to, from, next) => {
            if (!SessionStore.IsLoggedIn(Vue.ls)) {
                SessionStore.setReturnPath(Vue.ls, '/checkout');
                next({path: '/login'});
            } else {
                next();
            }
        }
    },
    {
        path: '/checkout-review',
        component: CheckoutReview,
        beforeEnter: (to, from, next) => {
            if (!SessionStore.IsLoggedIn(Vue.ls)) {
                SessionStore.setReturnPath(Vue.ls, '/checkout');
                next({path: '/login'});
            } else {
                next();
            }
        }
    },
    {
        path: '/my-account',
        component: Checkout,
        beforeEnter: (to, from, next) => {
            if (!SessionStore.IsLoggedIn(Vue.ls)) {
                SessionStore.setReturnPath(Vue.ls, '/my-account');
                next({path: '/login'});
            } else {
                next();
            }
        }
    },
    {
        path: '/order-history/:id',
        component: OrderDetails,
        beforeEnter: (to, from, next) => {
            if (!SessionStore.IsLoggedIn(Vue.ls)) {
                SessionStore.setReturnPath(Vue.ls, '/my-account');
                next({path: '/login'});
            } else {
                next();
            }
        }
    },
    {
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (SessionStore.IsLoggedIn(Vue.ls)) {
                next({path: '/my-account'});
            } else {
                next();
            }
        }
    },
    {
        path: '/create-account',
        component: CreateAccount,
        beforeEnter: (to, from, next) => {
            if (SessionStore.IsLoggedIn(Vue.ls)) {
                next({path: '/my-account'});
            } else {
                next();
            }
        }
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
