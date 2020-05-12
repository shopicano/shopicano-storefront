<template>
    <section class="main-container col1-layout">
        <PleaseWait :isLoading="isLoading"/>
        <div class="main container">
            <div class="col-main">
                <div class="shopping-cart-inner">
                    <div class="page-content">
                        <ul class="step">
                            <li><span>Summary</span></li>
                            <li><span>Shipping</span></li>
                            <li><span>Payment</span></li>
                            <li class="current-step"><span>Review</span></li>
                        </ul>
                        <div class="heading-counter warning">
                            Your shopping cart contains: <span>{{ numberOfProducts }} Product(s)</span>
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
                                            <span>{{ item.quantity }}</span>
                                        </td>
                                        <td class="price"><span>${{ item.quantity * item.price }}</span></td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colspan="1"></td>
                                        <td colspan="3"><strong>Sub Total</strong></td>
                                        <td colspan="2"><strong>${{ subTotal }}</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><strong>{{ shippingMedium }}</strong></td>
                                        <td colspan="2">Shipping charge</td>
                                        <td colspan="2"><strong>${{ shippingCharge }}</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><strong>{{ paymentMedium }}</strong></td>
                                        <td colspan="2">Payment processing fee</td>
                                        <td colspan="2"><strong>${{ paymentCharge }}</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="1"></td>
                                        <td colspan="3"><strong>Total</strong></td>
                                        <td colspan="2"><strong>${{ subTotal+paymentCharge+shippingCharge }}</strong>
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                                <div class="cart_navigation">
                                    <button class="button continue-shopping" type="button"
                                            v-on:click="onContinueBilling">
                                        <span>Go to billing</span></button>&nbsp;
                                    <button class="button btn-checkout" type="button" v-on:click="onPlaceOrder">
                                        <span>Place Order</span></button>
                                </div>
                            </div>
                        </div>

                        <div class="heading-counter warning">
                            <h3 class="checkout-sep">Billing Address</h3><br>
                            {{ billingDetails }}
                        </div>
                        <div class="heading-counter warning">
                            <h3 class="checkout-sep">Shipping Address</h3><br>
                            {{ shippingDetails }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import PleaseWait from "@/components/PleaseWait";
    import {EventBus} from "@/common/event-bus";
    import Cart from "@/common/cart";
    import Settings from "@/common/settings";
    import axios from "axios";
    import SessionStore from "@/common/session_store";

    export default {
        name: "OrderDetails",
        components: {PleaseWait},
        data() {
            return {
                orderDetails: Object,
                isLoading: false
            }
        },
        mounted() {
            this.isLoading = true;

            this.getBillingDetails();
            this.getShippingDetails();
            this.checkoutStepCartReview();
            this.calculateShippingCharge(Cart.get_shipping_method(this.$ls));
            this.calculatePaymentProcessingFee(Cart.get_billing_method(this.$ls));

            this.isLoading = false;
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
            onContinueBilling: function () {
                this.$router.push('/checkout-billing');
            },
            getBillingDetails: function () {
                let billingAddress = '';
                let d = Cart.get_billing_details(this.$ls);

                billingAddress += d.name;
                billingAddress += ', ' + d.address;
                billingAddress += ', ' + d.city;
                if (d.state !== '') {
                    billingAddress += ', ' + d.state;
                }
                billingAddress += ', ' + d.postal_code;
                billingAddress += ', ' + d.location.name;
                billingAddress += ', ' + d.email;
                billingAddress += ', ' + d.phone;

                this.billingDetails = billingAddress;
            },
            getShippingDetails: function () {
                let shippingAddress = '';
                let d = Cart.get_shipping_details(this.$ls);

                shippingAddress += d.name;
                shippingAddress += ', ' + d.address;
                shippingAddress += ', ' + d.city;
                if (d.state !== '') {
                    shippingAddress += ', ' + d.state;
                }
                shippingAddress += ', ' + d.postal_code;
                shippingAddress += ', ' + d.location.name;
                shippingAddress += ', ' + d.email;
                shippingAddress += ', ' + d.phone;

                this.shippingDetails = shippingAddress;
            },
            calculatePaymentProcessingFee: function (pm) {
                let cost = 10;
                let charge;
                if (pm.is_flat) {
                    charge = pm.processing_fee / 100;
                } else {
                    charge = (cost * pm.processing_fee) / 100;
                    if (pm.max_processing_fee !== 0 && charge > pm.max_processing_fee) {
                        charge = pm.max_processing_fee;
                    } else if (pm.min_processing_fee !== 0 && charge < pm.min_processing_fee) {
                        charge = pm.min_processing_fee;
                    }
                }

                this.paymentMedium = pm.name;
                this.paymentCharge = charge;
            },
            calculateShippingCharge: function (sm) {
                let charge = sm.delivery_charge / 100;
                this.shippingMedium = sm.name + ' (Approximate Delivery in ' + sm.approximate_delivery_time + ' days)';
                this.shippingCharge = charge;
            },
            onPlaceOrder: function () {
                this.isLoading = true;

                this.createAddresses(1);
            },
            createAddresses: function (t) {
                let d;

                if (t === 1) {
                    d = Cart.get_billing_details(this.$ls)
                } else {
                    d = Cart.get_shipping_details(this.$ls)
                }

                let body = {};
                body.name = d.name;
                body.address = d.address;
                body.country_id = d.location.id;
                body.city = d.city;
                body.state = d.state;
                body.postcode = d.postal_code;
                body.email = d.email;
                body.phone = d.phone;

                axios.post(`${Settings.GetUserApiUrl()}/addresses`, body, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(this.$ls)
                    }
                }).then(resp => {
                    let data = resp.data.data;
                    if (t === 1) {
                        this.billing_address_id = data.id;
                        this.createAddresses(2);
                    } else {
                        this.shipping_address_id = data.id;
                        this.createOrder();
                    }

                    this.isLoading = false;
                }).catch(err => {
                    console.log(err);

                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            createOrder: function () {
                let body = {};
                body.payment_method_id = Cart.get_billing_method(this.$ls).id;
                body.billing_address_id = this.billing_address_id;
                body.shipping_method_id = Cart.get_shipping_method(this.$ls).id;
                body.shipping_address_id = this.shipping_address_id;

                let cart_items = Cart.get(this.$ls);
                let items = [];

                for (let i in cart_items) {
                    items.push({
                        id: cart_items[i].id,
                        quantity: cart_items[i].quantity
                    })
                }

                body.items = items;

                console.log(body);

                axios.post(`${Settings.GetUserApiUrl()}/orders`, body, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(this.$ls)
                    }
                }).then(resp => {
                    let order = resp.data.data;
                    if (order.grand_total === 0) {
                        this.$router.push(`/#/order-history/${order.id}`);
                        return
                    }

                    this.generateNonce(order);
                }).catch(err => {
                    this.isLoading = false;
                    this.errors = err.response.data.title;
                });
            }
        }
    }
</script>
