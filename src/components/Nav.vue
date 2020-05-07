<template>
    <nav>
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12 jtv-logo-block">
                    <div class="logo"><a title="e-commerce" href="/">
                        <img alt="e-commerce" src="/banner_logo.png" width="200px"></a>
                    </div>
                    <!-- Navbar -->

                    <div class="nav-inner">
                        <div class="mm-toggle-wrap hidden-lg" v-on:click="onNavClick">
                            <div class="mm-toggle"><i class="fa fa-align-justify"></i><span
                                    class="mm-label hidden">Menu</span></div>
                        </div>
                        <ul id="nav" class="hidden-xs hidden-sm">
                            <li class="level-a drop-menu">
                                <a href="/" class="active"><span>Home</span></a>
                            </li>

                            <li class="level-a drop-menu" v-for="c in categories" v-bind:key="c.id">
                                <a v-bind:href="c.id" class="active"><span>{{ c.name }}</span></a>
                            </li>
                        </ul>

                        <!-- top cart -->
                        <div class="top-cart">
                            <div class="top-cart-contain">
                                <div class="mini-cart">
                                    <div data-toggle="dropdown" data-hover="dropdown"
                                         class="basket dropdown-toggle"><a href="#">
                                        <div class="shoppingcart-inner"><span class="cart-title"><i
                                                class="fa fa-shopping-cart"></i></span> <span
                                                class="cart_count">2</span></div>
                                    </a></div>
                                    <div>
                                        <div class="top-cart-content">
                                            <div class="block-subtitle hidden-xs">Recently added
                                                item(s)
                                            </div>
                                            <ul id="cart-sidebar" class="mini-products-list">
                                                <li class="item odd"><a href="shopping_cart.html"
                                                                        title="Product Title Here "
                                                                        class="product-image"><img
                                                        src="images/products/img01.jpg" alt="html theme"
                                                        width="65"></a>
                                                    <div class="product-details"><a href="#"
                                                                                    title="Remove This Item"
                                                                                    class="remove-cart"><i
                                                            class="pe-7s-close"></i></a>
                                                        <p class="product-name"><a
                                                                href="shopping_cart.html">
                                                            Product Title Here </a></p>
                                                        <strong>1</strong> x <span
                                                                class="price">$299.00</span>
                                                    </div>
                                                </li>
                                                <li class="item last odd"><a href="shopping_cart.html"
                                                                             title="Product Title Here "
                                                                             class="product-image"><img
                                                        src="images/products/img01.jpg" alt="html theme"
                                                        width="65"></a>
                                                    <div class="product-details"><a href="#"
                                                                                    title="Remove This Item"
                                                                                    class="remove-cart"><i
                                                            class="pe-7s-close"></i></a>
                                                        <p class="product-name"><a
                                                                href="shopping_cart.html">
                                                            Product Title Here </a></p>
                                                        <strong>2</strong> x <span
                                                                class="price">$99.00</span>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="top-subtotal">Subtotal: <span
                                                    class="price">$389.00</span></div>
                                            <div class="actions">
                                                <button class="btn-checkout" type="button"><i
                                                        class="fa fa-check"></i><span>Checkout</span>
                                                </button>
                                                <button class="view-cart" type="button"><i
                                                        class="fa fa-shopping-cart"></i>
                                                    <span>View Cart</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="jtv-search-block">
                            <div class="search">
                                <input class="search_box" type="checkbox" id="search_box">
                                <label class="fa fa-search" for="search_box"></label>
                                <div class="search_form">
                                    <form action="/">
                                        <input type="text" name="query">
                                        <input type="submit" value="search">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end nav -->
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import axios from 'axios'
    import Settings from "@/common/settings";
    import {EventBus} from "@/common/event-bus";

    export default {
        name: "Nav",
        data() {
            return {
                categories: [],
                isNavOpen: false
            }
        },
        mounted() {
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
            },
            onNavClick: function () {
                this.isNavOpen = !this.isNavOpen;
                EventBus.$emit('nav-action', this.isNavOpen);
            }
        }
    }
</script>
