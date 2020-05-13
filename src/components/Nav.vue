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
                                         class="basket dropdown-toggle">
                                        <a href="/#/checkout">
                                            <div class="shoppingcart-inner">
                                            <span class="cart-title">
                                                <i class="fa fa-shopping-cart"></i>
                                            </span>
                                                <span class="cart_count">{{ number_of_items }}</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <div class="top-cart-content">
                                            <div v-if="number_of_items!==0" class="block-subtitle hidden-xs">Recently
                                                Added
                                                Item(s)
                                            </div>
                                            <div v-if="number_of_items===0" class="block-subtitle hidden-xs">
                                                No Items Added Yet
                                            </div>
                                            <ul v-if="number_of_items!==0" id="cart-sidebar" class="mini-products-list">
                                                <li v-for="i in cart_items" class="item odd" v-bind:key="i.id">
                                                    <a v-bind:href="'/#/products/'+i.slug"
                                                       v-bind:title="i.name" class="product-image">
                                                        <img v-bind:src="createImageUrl(i.image)"
                                                             width="65"></a>
                                                    <div class="product-details">
                                                        <a class="remove-cart">
                                                            <i class="pe-7s-close"
                                                               v-on:click="onCartItemRemoveClicked(i.id)"></i>
                                                        </a>
                                                        <p class="product-name">
                                                            <a v-bind:href="'/#/products/'+i.slug">{{ i.name }}</a>
                                                        </p>
                                                        <strong>{{ i.quantity }}</strong> x <span
                                                            class="price">${{ toDisplayUnit(i.price) }}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div v-if="number_of_items!==0" class="top-subtotal">Subtotal: <span
                                                    class="price">${{ toDisplayUnit(sub_total) }}</span></div>
                                            <div v-if="number_of_items!==0" class="actions">
                                                <button class="btn-checkout" type="button"
                                                        v-on:click="onCheckoutClicked">
                                                    <span>Checkout</span>
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
    import Cart from "@/common/cart";

    export default {
        name: "Nav",
        data() {
            return {
                categories: [],
                isNavOpen: false,
                cart_items: [],
                sub_total: 0,
                number_of_items: 0
            }
        },
        mounted() {
            EventBus.$on('cart-updated', ok => {
                if (ok) {
                    this.populateFromCart();
                }
            });

            this.populateFromCart();
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
            },
            populateFromCart: function () {
                this.cart_items = Cart.get(this.$ls);
                this.sub_total = 0;
                this.number_of_items = 0;

                if (Cart.is_empty(this.$ls)) {
                    this.cart_items = []
                }

                for (let i = 0; i < this.cart_items.length; i++) {
                    this.sub_total += (this.cart_items[i].price * this.cart_items[i].quantity);
                    this.number_of_items += this.cart_items[i].quantity;
                }
            },
            createImageUrl: function (path) {
                return Settings.GetMediaUrl() + path;
            },
            onCheckoutClicked: function () {
                this.$router.push('/checkout')
            },
            onCartItemRemoveClicked: function (id) {
                Cart.remove_item(this.$ls, id);
                this.populateFromCart();
            },
            toDisplayUnit(v) {
                return (v / 100).toFixed(2)
            }
        }
    }
</script>
