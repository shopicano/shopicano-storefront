<template>
    <section class="main-container col1-layout">
        <PleaseWait :isLoading="isLoading"/>
        <div class="main container">
            <div class="col-main">
                <div class="shopping-cart-inner">
                    <div class="page-content">
                        <ul class="step">
                            <li><span>Summary</span></li>
                            <li class="current-step"><span>Shipping</span></li>
                            <li><span>Payment</span></li>
                            <li><span>Review</span></li>
                        </ul>

                        <div class="main-container col1-layout">
                            <div class="main container">
                                <div class="row">
                                    <section class="col-sm-12 col-xs-12">
                                        <div class="col-main">
                                            <div class="page-content checkout-page">
                                                <div class="box-border">
                                                    <ul>
                                                        <li class="row">
                                                            <div class="col-sm-6">
                                                                <label for="first_name_1" class="required">Name*</label>
                                                                <input v-model="name" class="input form-control"
                                                                       type="text"
                                                                       id="first_name_1">
                                                            </div>
                                                            <!--/ [col] -->

                                                            <div class="col-sm-6">
                                                                <label for="email" class="required">Email*</label>
                                                                <input v-model="email" class="input form-control"
                                                                       type="text"
                                                                       id="email">
                                                            </div>
                                                            <!--/ [col] -->

                                                        </li>
                                                        <!--/ .row -->

                                                        <li class="row">
                                                            <div class="col-xs-12">
                                                                <label for="address_1" class="required">Address*</label>
                                                                <input v-model="address" class="input form-control"
                                                                       type="text"
                                                                       id="address_1">
                                                            </div>
                                                            <!--/ [col] -->

                                                        </li>
                                                        <!--/ .row -->

                                                        <li class="row">
                                                            <div class="col-sm-6">
                                                                <label for="city_1" class="required">City*</label>
                                                                <input v-model="city" class="input form-control"
                                                                       type="text"
                                                                       id="city_1">
                                                            </div>
                                                            <!--/ [col] -->

                                                            <div class="col-sm-6">
                                                                <label for="state_1" class="required">State</label>
                                                                <input v-model="state" class="input form-control"
                                                                       type="text"
                                                                       id="state_1">
                                                            </div>
                                                            <!--/ [col] -->
                                                        </li>
                                                        <!--/ .row -->

                                                        <li class="row">
                                                            <div class="col-sm-6">
                                                                <label for="postal_code_1" class="required">Zip/Postal
                                                                    Code*</label>
                                                                <input v-model="postal_code" class="input form-control"
                                                                       type="text"
                                                                       id="postal_code_1">
                                                            </div>
                                                            <!--/ [col] -->

                                                            <div class="col-sm-6">
                                                                <label class="required">Country</label>
                                                                <div class="custom_select">
                                                                    <select class="input form-control"
                                                                            v-on:change="onLocationChange($event)">
                                                                        <option v-for="l in locations" v-bind:key="l.id"
                                                                                v-bind:value="l.id">{{ l.name }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <!--/ [col] -->
                                                        </li>
                                                        <!--/ .row -->

                                                        <li class="row">
                                                            <div class="col-sm-6">
                                                                <label for="telephone_1"
                                                                       class="required">Phone*</label>
                                                                <input v-model="phone" class="input form-control"
                                                                       type="text"
                                                                       id="telephone_1">
                                                            </div>
                                                            <!--/ [col] -->
                                                        </li>
                                                        <!--/ .row -->
                                                    </ul>
                                                </div>

                                                <h3 class="checkout-sep">Shipping Method</h3>
                                                <div class="box-border">
                                                    <h4 v-if="shipping_methods.length===0" class="checkout-sep">No
                                                        shipping method available</h4>

                                                    <ul v-if="shipping_methods.length!==0" class="shipping_method">
                                                        <!--/ [col] -->
                                                        <li v-for="s in shipping_methods" v-bind:key="s.id">
                                                            <label for="radio_button_3">
                                                                <input type="radio"
                                                                       v-bind:value="s.id"
                                                                       v-on:change="onShippingMethodChange($event)"
                                                                       name="radio_3"
                                                                       id="radio_button_3">
                                                                {{ calculateShippingCharge(s) }}<br>
                                                                Approximate Delivery in {{ s.approximate_delivery_time
                                                                }} Days
                                                            </label>
                                                        </li>
                                                    </ul>
                                                    <button class="button" v-on:click="onBackToOverview">
                                                        Go to Overview
                                                    </button>&nbsp;&nbsp;
                                                    <button v-if="shipping_methods.length!==0" class="button"
                                                            v-on:click="onContinueBilling">
                                                        Continue to Billing
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
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
    import axios from "axios";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";
    import Cart from "@/common/cart";
    import PleaseWait from "@/components/PleaseWait";

    export default {
        name: "CheckoutShippingMethodSetup",
        components: {PleaseWait},
        data() {
            return {
                locations: [],
                shipping_methods: [],
                selectedLocation: null,
                selectedShippingMethod: null,
                name: '',
                email: '',
                address: '',
                city: '',
                state: '',
                postal_code: '',
                phone: '',
                isLoading: false
            }
        },
        mounted() {
            this.isLoading = true;
            this.getLocations();
        },
        methods: {
            getLocations: function () {
                axios.get(`${Settings.GetUserApiUrl()}/locations`, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(this.$ls)
                    }
                }).then(resp => {
                    this.locations = resp.data.data;
                    this.selectedLocation = this.locations[0];
                    this.listShippingMethods(this.selectedLocation.id);
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            listShippingMethods: function (locationId) {
                this.isLoading = true;

                let url = `${Settings.GetUserApiUrl()}/locations/` + locationId + `/shipping-methods`;
                axios.get(url, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(this.$ls)
                    }
                }).then(resp => {
                    this.shipping_methods = null;
                    this.shipping_methods = resp.data.data;
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            onLocationChange: function (e) {
                this.isLoading = true;

                let id = e.target.value;
                for (let i in this.locations) {
                    if (this.locations[i].id === Number(id)) {
                        this.selectedLocation = this.locations[i];
                    }
                }

                this.listShippingMethods(id);
            },
            calculateShippingCharge: function (sm) {
                let charge = sm.delivery_charge;
                return sm.name + " - " + "Fee $" + this.toDisplayUnit(charge)
            },
            onBackToOverview: function () {
                this.$router.push('/checkout');
            },
            onContinueBilling: function () {
                if (this.name === '' || this.email === '' || this.address === '' ||
                    this.city === '' || this.postal_code === '' || this.phone === '') {
                    alert('* marked fields are mandatory');
                    return;
                }

                this.setShippingAddress({
                    name: this.name,
                    email: this.email,
                    address: this.address,
                    city: this.city,
                    postal_code: this.postal_code,
                    state: this.state,
                    phone: this.phone,
                    location: this.selectedLocation,
                });

                if (this.selectedShippingMethod === null) {
                    alert('Please select a shipping method');
                    return;
                }

                this.$router.push('/checkout-billing');
            },
            setShippingAddress: function (a) {
                Cart.set_shipping_details(this.$ls, a);
            },
            setShippingMethod: function (sm) {
                this.selectedShippingMethod = sm;
                Cart.set_shipping_method(this.$ls, sm);
            },
            onShippingMethodChange: function (e) {
                let id = e.target.value;
                for (let i in this.shipping_methods) {
                    if (this.shipping_methods[i].id === id) {
                        this.setShippingMethod(this.shipping_methods[i]);
                    }
                }
                console.log(this.selectedShippingMethod);
            },
            toDisplayUnit(v) {
                return (v / 100).toFixed(2)
            }
        }
    }
</script>
