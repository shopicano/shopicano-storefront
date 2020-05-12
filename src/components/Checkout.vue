<template>
    <section class="main-container col1-layout">
        <PleaseWait :isLoading="isLoading"/>
        <div class="main container">
            <div class="col-main">
                <div class="shopping-cart-inner">
                    <div class="page-content">
                        <ul class="step">
                            <li class="current-step"><span>Summary</span></li>
                            <li><span>Shipping</span></li>
                            <li><span>Payment</span></li>
                            <li><span>Review</span></li>
                        </ul>
                        <div class="heading-counter warning">Your shopping cart contains: <span>{{ numberOfProducts }} Product(s)</span>
                        </div>
                        <div class="table-responsive">
                            <div class="order-detail-content">
                                <table class="table table-bordered jtv-cart-summary">
                                    <thead>
                                    <tr>
                                        <th class="cart_product"></th>
                                        <th>Name</th>
                                        <th>Unit price</th>
                                        <th>Qty</th>
                                        <th>Sub Total</th>
                                        <th class="action"><i class="fa fa-trash-o"></i></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in cart_items" v-bind:key="item.id">
                                        <td class="cart_product">
                                            <a href="#">
                                                <img class="img-responsive" v-bind:src="createImageUrl(item.image)"
                                                     alt="Product"/>
                                            </a>
                                        </td>
                                        <td class="cart_description"><p class="product-name">
                                            <a href="#">{{ item.name }}</a></p>
                                            <!--                                            <small class="cart_ref">SKU : #987654</small><br>-->
                                            <!--                                            <small><a href="#">Color : Pink</a></small><br>-->
                                        </td>
                                        <td class="price"><span>${{ item.price }}</span></td>
                                        <td class="qty">
                                            <input class="form-control input-sm" type="text"
                                                   v-bind:value="item.quantity">
                                            <a href="#"><i class="fa fa-plus"></i></a>
                                            <a href="#"><i class="fa fa-minus"></i></a>
                                        </td>
                                        <td class="price"><span>${{ item.quantity * item.price }}</span></td>
                                        <td class="action">
                                            <a v-on:click="onCartItemRemoveClicked(item.id)">Remove</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colspan="1"></td>
                                        <td colspan="3"><strong>Total</strong></td>
                                        <td colspan="2"><strong>${{ subTotal }}</strong></td>
                                    </tr>
                                    </tfoot>
                                </table>
                                <div class="cart_navigation">
                                    <button class="button continue-shopping" type="button"
                                            v-on:click="onContinueShopping">
                                        <span>Continue shopping</span></button>&nbsp;
                                    <button class="button btn-checkout" type="button" v-on:click="onContinueShipping">
                                        <span>Continue to Shipping</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {EventBus} from "@/common/event-bus";
    // import axios from "axios";
    import Settings from "@/common/settings";
    import Cart from "@/common/cart";
    import PleaseWait from "@/components/PleaseWait";

    export default {
        name: "Checkout",
        components: {PleaseWait},
        data() {
            return {
                cart_items: [],
                numberOfProducts: 0,
                subTotal: 0,
                isLoading: false
            }
        },
        mounted() {
            this.isLoading = true;

            EventBus.$on('cart-updated', ok => {
                if (ok) {
                    this.isLoading = true;
                    this.checkoutStepCartReview();
                }
            });

            this.checkoutStepCartReview();
        },
        methods: {
            checkoutStepCartReview: function () {
                this.cart_items = Cart.get(this.$ls);
                this.numberOfProducts = 0;
                this.subTotal = 0;

                if (Cart.is_empty(this.$ls)) {
                    this.cart_items = []
                }

                for (let i = 0; i < this.cart_items.length; i++) {
                    this.subTotal += (this.cart_items[i].price * this.cart_items[i].quantity);
                    this.numberOfProducts += this.cart_items[i].quantity;
                }

                this.isLoading = false;
            },
            createImageUrl: function (path) {
                return Settings.GetMediaUrl() + path;
            },
            onCheckoutClicked: function () {
                this.$router.push('/checkout')
            },
            onCartItemRemoveClicked: function (id) {
                Cart.remove_item(this.$ls, id);
                EventBus.$emit('cart-updated', true);
            },
            onContinueShopping: function () {
                this.$router.push('/');
            },
            onContinueShipping: function () {
                this.$router.push('/checkout-shipping');
            }
        }
    }
</script>
