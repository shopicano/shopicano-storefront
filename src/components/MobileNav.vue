<template>
    <div id="jtv-mobile-menu" class="jtv-mobile-menu" v-bind:style="styleCss">
        <ul>
            <li><a href="/">Home</a></li>
            <li v-for="c in categories" v-bind:key="c.id">
                <a v-bind:href="c.id" class="active"><span>{{ c.name }}</span></a>
            </li>
        </ul>
        <div class="jtv-top-link-mob">
            <ul class="links">
                <li><a title="My Account" href="/#/my-account">My Account</a></li>
                <li><a title="Wishlist" href="/#/wishlist">Wishlist</a></li>
                <li><a title="Checkout" href="/#/checkout">Checkout</a></li>
                <li class="last"><a title="Login" href="/#/login"><span>Login</span></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {EventBus} from "@/common/event-bus";
    import axios from "axios";
    import Settings from "@/common/settings";

    export default {
        name: "MobileNav",
        data() {
            return {
                categories: [],
                styleCss: ''
            }
        },
        mounted() {
            EventBus.$on('nav-action', isOpen => {
                if (isOpen) {
                    this.styleCss = 'left: 0px; width: 250px; height: 11988px; display: block; overflow: hidden;';
                } else {
                    this.styleCss = '';
                }
            });

            this.listCategories();
        },
        methods: {
            listCategories: function () {
                axios.get(`${Settings.GetUserApiUrl()}/categories?limit=5`).then(resp => {
                    this.categories = resp.data.data;
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            }
        }
    }
</script>
