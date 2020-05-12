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
                            <li class="current-step"><span>Payment</span></li>
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
                                                                <input v-model="name" class="input form-control"
                                                                       type="text"
                                                                       id="first_name_1">
                                                            </div>
                                                            <!--/ [col] -->

                                                            <div class="col-sm-6">
                                                                <label for="email" class="required">Email</label>
                                                                <input v-model="email" class="input form-control"
                                                                       type="text"
                                                                       id="email">
                                                            </div>
                                                            <!--/ [col] -->

                                                        </li>
                                                        <!--/ .row -->

                                                        <li class="row">
                                                            <div class="col-xs-12">
                                                                <label for="address_1" class="required">Address</label>
                                                                <input v-model="address" class="input form-control"
                                                                       type="text"
                                                                       id="address_1">
                                                            </div>
                                                            <!--/ [col] -->

                                                        </li>
                                                        <!--/ .row -->

                                                        <li class="row">
                                                            <div class="col-sm-6">
                                                                <label for="city_1" class="required">City</label>
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
                                                                    Code</label>
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
                                                                       class="required">Phone</label>
                                                                <input v-model="phone" class="input form-control"
                                                                       type="text"
                                                                       id="telephone_1">
                                                            </div>
                                                            <!--/ [col] -->
                                                        </li>
                                                        <!--/ .row -->
                                                    </ul>
                                                </div>

                                                <h3 class="checkout-sep">Payment Method</h3>
                                                <div class="box-border">
                                                    <h4 v-if="payment_methods.length===0" class="checkout-sep">No
                                                        payment method available</h4>

                                                    <ul v-if="payment_methods.length!==0" class="shipping_method">
                                                        <li v-for="p in payment_methods" v-bind:key="p.id">
                                                            <label for="radio_button_3">
                                                                <input type="radio" name="radio_3"
                                                                       v-bind:value="p.id"
                                                                       v-on:change="onPaymentMethodChange($event)"
                                                                       id="radio_button_3">
                                                                {{ calculatePaymentProcessingFee(p) }}
                                                            </label>
                                                        </li>
                                                    </ul>
                                                    <button class="button" v-on:click="onBackToShipping">Go to
                                                        Shipping
                                                    </button>&nbsp;&nbsp;
                                                    <button v-if="payment_methods.length!==0" class="button"
                                                            v-on:click="onContinueReview">
                                                        Continue to Review
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
        name: "CheckoutBillingMethodSetup",
        components: {PleaseWait},
        data() {
            return {
                locations: [],
                payment_methods: [],
                selectedLocation: Object,
                selectedPaymentMethod: null,
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
                    this.listPaymentMethods(this.selectedLocation.id);
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            listPaymentMethods: function (locationId) {
                this.isLoading = true;

                let url = `${Settings.GetUserApiUrl()}/locations/` + locationId + `/payment-methods`;
                axios.get(url, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(this.$ls)
                    }
                }).then(resp => {
                    this.payment_methods = resp.data.data;
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
                        console.log(this.selectedLocation);
                    }
                }

                this.listPaymentMethods(id);
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
                return pm.name + " - " + "Fee $" + charge;
            },
            onBackToShipping: function () {
                this.$router.push('/checkout-shipping');
            },
            onContinueReview: function () {
                if (this.name === '' || this.email === '' || this.address === '' ||
                    this.city === '' || this.postal_code === '' || this.phone === '') {
                    alert('* marked fields are mandatory');
                    return;
                }

                this.setBillingAddress({
                    name: this.name,
                    email: this.email,
                    address: this.address,
                    city: this.city,
                    postal_code: this.postal_code,
                    state: this.state,
                    phone: this.phone,
                    location: this.selectedLocation,
                });

                if (this.selectedPaymentMethod === null) {
                    alert('Please select a payment method');
                    return;
                }

                this.$router.push('/checkout-review');
            },
            setBillingAddress: function (a) {
                Cart.set_billing_details(this.$ls, a);
            },
            setBillingMethod: function (pm) {
                this.selectedPaymentMethod = pm;
                Cart.set_billing_method(this.$ls, pm);
            },
            onPaymentMethodChange: function (e) {
                let id = e.target.value;
                for (let i in this.payment_methods) {
                    if (this.payment_methods[i].id === id) {
                        this.setBillingMethod(this.payment_methods[i]);
                    }
                }

                console.log(this.selectedPaymentMethod);
            },
        }
    }
</script>
