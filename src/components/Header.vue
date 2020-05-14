<template>
    <!-- Header -->
    <header class="jtv-header-v2">
        <div class="header-lines-decoration"><span class="bg-secondary-color"></span> <span
                class="bg-blue"></span>
            <span class="bg-blue-light"></span> <span class="bg-orange-light"></span> <span
                    class="bg-red"></span> <span
                    class="bg-green"></span> <span class="bg-secondary-color"></span></div>
        <div class="header-container">
            <div class="header-top">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 col-sm-4 col-xs-12">
                            <div class="jtv-lang-cur-wrapper">
                                <div class="jtv-inner-box">
                                    <div class="block jtv-language-block">
                                        <div class="lg-cur"><span> <img src="images/english.png" alt="English"> <span
                                                class="lg-fr">EN</span> <i
                                                class="fa fa-angle-down"></i> </span>
                                        </div>
                                        <ul>
                                            <li>
                                                <a class="selected">
                                                    <img src="images/english.png" alt="flag"><span>EN</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="block jtv-currency-block">
                                        <div class="item-cur"><span>Currency</span>&nbsp;$ USD<i
                                                class="fa fa-angle-down"></i></div>
                                        <ul>
                                            <li><a href="#" title="USD"> $ USD </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- top links -->
                        <div class="toplinks col-md-7 col-sm-8 col-xs-12 hidden-xs">
                            <ul class="links">
                                <li v-if="is_logged_in"><a title="My Account" href="/#/my-account">My Account</a></li>
                                <li v-if="is_logged_in"><a title="Wishlist" href="/#/wishlist">Wishlist</a></li>
                                <li><a title="Checkout" href="/#/checkout">Checkout</a></li>
                                <li v-if="is_logged_in" class="last"><a href="/#/logout">
                                    <span>Logout</span></a>
                                </li>
                                <li v-if="!is_logged_in" class="last"><a href="/#/login">
                                    <span>Login</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Nav/>
        </div>
    </header>
    <!-- end header -->
</template>

<script>
    import Nav from "@/components/Nav";
    import SessionStore from "@/common/session_store";
    import {EventBus} from "@/common/event-bus";

    export default {
        name: "Header",
        components: {Nav},
        data() {
            return {
                is_logged_in: false
            }
        },
        mounted() {
            this.is_logged_in = SessionStore.IsLoggedIn(this.$ls);

            EventBus.$on('nav-refresh', isOpen => {
                console.log(isOpen);

                this.is_logged_in = SessionStore.IsLoggedIn(this.$ls);
            });
        },
        methods: {}
    }
</script>
s