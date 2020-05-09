<template>
    <section class="main-container col1-layout">
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
                                                                <label for="first_name_1" class="required">Name</label>
                                                                <input class="input form-control" type="text"
                                                                       id="first_name_1">
                                                            </div>
                                                            <!--/ [col] -->

                                                            <div class="col-sm-6">
                                                                <label for="last_name_1" class="required">Email</label>
                                                                <input class="input form-control" type="text"
                                                                       id="last_name_1">
                                                            </div>
                                                            <!--/ [col] -->

                                                        </li>
                                                        <!--/ .row -->

                                                        <li class="row">
                                                            <div class="col-xs-12">
                                                                <label for="address_1" class="required">Address</label>
                                                                <input class="input form-control" type="text"
                                                                       id="address_1">
                                                            </div>
                                                            <!--/ [col] -->

                                                        </li>
                                                        <!--/ .row -->

                                                        <li class="row">
                                                            <div class="col-sm-6">
                                                                <label for="city_1" class="required">City</label>
                                                                <input class="input form-control" type="text"
                                                                       id="city_1">
                                                            </div>
                                                            <!--/ [col] -->

                                                            <div class="col-sm-6">
                                                                <label for="state_1" class="required">State</label>
                                                                <input class="input form-control" type="text"
                                                                       id="state_1">
                                                            </div>
                                                            <!--/ [col] -->
                                                        </li>
                                                        <!--/ .row -->

                                                        <li class="row">
                                                            <div class="col-sm-6">
                                                                <label for="postal_code_1" class="required">Zip/Postal
                                                                    Code</label>
                                                                <input class="input form-control" type="text"
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
                                                                       class="required">Phone</label>
                                                                <input class="input form-control" type="text"
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
                                                        <li v-for="s in shipping_methods" v-bind:key="s.id">
                                                            <label for="radio_button_3">
                                                                <input type="radio" checked name="radio_3"
                                                                       id="radio_button_3">
                                                                {{ calculateShippingCharge(s) }}<br>
                                                                Approximate Delivery in {{ s.approximate_delivery_time
                                                                }} Days
                                                            </label>
                                                        </li>
                                                    </ul>
                                                    <button class="button">Go to Overview</button>&nbsp;&nbsp;
                                                    <button v-if="shipping_methods.length!==0" class="button">
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

    export default {
        name: "CheckoutShippingMethodSetup",
        data() {
            return {
                locations: [],
                shipping_methods: [],
                selectedLocation: Object
            }
        },
        mounted() {
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
                let url = `${Settings.GetUserApiUrl()}/locations/` + locationId + `/shipping-methods`;
                axios.get(url, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(this.$ls)
                    }
                }).then(resp => {
                    this.shipping_methods = resp.data.data;
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            onLocationChange: function (e) {
                let id = e.target.value;
                this.locations.forEach(item => {
                    if (item.id === id) {
                        this.selectedLocation = item;
                    }
                });
                this.listShippingMethods(id);
            },
            calculateShippingCharge: function (sm) {
                let charge = sm.delivery_charge;
                return sm.name + " - " + "Fee $" + (charge / 100)
            }
        }
    }
</script>
