<template>
    <section class="main-container col1-layout">
        <PleaseWait :isLoading="isLoading"/>
        <div class="main container">
            <div class="col-main">
                <div class="shopping-cart-inner">
                    <div class="page-content">
                        <div class="form-share">
                            <div class="sendtofriend-print">
                                <a href="javascript:print();"><i class="fa fa-print"></i> Print</a>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div class="order-detail-content">
                                <table class="table table-bordered jtv-cart-summary">
                                    <tbody>
                                    <tr>
                                        <td colspan="2"><strong>OrderID</strong></td>
                                        <td colspan="3" class="price"><strong>#{{ orderDetails.hash }}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><strong>Store</strong></td>
                                        <td colspan="3" class="price"><strong>{{ orderDetails.store_name }}</strong>
                                        </td>
                                    </tr>
                                    <tr v-if="!orderDetails.is_all_digital_products">
                                        <td colspan="2"><strong>Order Status</strong></td>
                                        <td colspan="3" class="price"><strong>{{ orderDetails.status
                                            }}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><strong>Payment Gateway</strong></td>
                                        <td colspan="3" class="price"><strong>{{ orderDetails.payment_gateway
                                            }}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><strong>Payment Status</strong></td>
                                        <td colspan="3" class="price"><strong>{{ orderDetails.payment_status
                                            }}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><strong>Payment Method</strong></td>
                                        <td colspan="3" class="price"><strong>{{ orderDetails.payment_method_name
                                            }}</strong>
                                        </td>
                                    </tr>
                                    <tr v-if="!orderDetails.is_all_digital_products">
                                        <td colspan="2"><strong>Shipping Method</strong></td>
                                        <td colspan="3" class="price"><strong>{{ orderDetails.shipping_method_name
                                            }} (Delivery in {{ orderDetails.approximate_delivery_time }} days)</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><strong>Order Initiated</strong></td>
                                        <td colspan="3" class="price"><strong>{{ orderDetails.created_at }}</strong>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered jtv-cart-summary">
                                    <thead>
                                    <tr>
                                        <th class="cart_product"></th>
                                        <th>Name</th>
                                        <th>Unit price</th>
                                        <th>Qty</th>
                                        <th>Sub Total</th>
                                        <th v-if="orderDetails.is_all_digital_products"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in orderDetails.items" v-bind:key="item.id">
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
                                        <td class="price"><span>${{ toDisplayUnit(item.price) }}</span></td>
                                        <td class="qty">
                                            <span>{{ item.quantity }}</span>
                                        </td>
                                        <td class="price"><span>${{ toDisplayUnit(item.quantity * item.price) }}</span>
                                        </td>
                                        <td class="price">
                                            <button v-on:click="onDownloadClicked(orderDetails, item)">Download</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colspan="1"></td>
                                        <td colspan="3"><strong>Sub Total</strong></td>
                                        <td colspan="2"><strong>${{ toDisplayUnit(orderDetails.sub_total) }}</strong>
                                        </td>
                                    </tr>
                                    <tr v-if="!orderDetails.is_all_digital_products">
                                        <td colspan="2"><strong></strong></td>
                                        <td colspan="2">Shipping charge</td>
                                        <td colspan="2"><strong>${{ toDisplayUnit(orderDetails.shipping_charge)
                                            }}</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><strong></strong></td>
                                        <td colspan="2">Payment processing fee</td>
                                        <td colspan="2"><strong>${{ toDisplayUnit(orderDetails.payment_processing_fee)
                                            }}</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="1"></td>
                                        <td colspan="3"><strong>Total</strong></td>
                                        <td colspan="2">
                                            <strong>
                                                ${{ toDisplayUnit(orderDetails.grand_total) }}
                                            </strong>
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        <div class="heading-counter warning">
                            <h3 class="checkout-sep">Billing Address</h3><br>
                            {{ getFormattedAddressBilling(orderDetails) }}
                        </div>
                        <div class="heading-counter warning">
                            <h3 class="checkout-sep">Shipping Address</h3><br>
                            {{ getFormattedAddressShipping(orderDetails) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import PleaseWait from "@/components/PleaseWait";
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
            this.getOrderDetails();
        },
        methods: {
            createImageUrl: function (path) {
                return Settings.GetMediaUrl() + path;
            },
            getOrderDetails: function () {
                let orderId = this.$route.params.id;

                axios.get(`${Settings.GetUserApiUrl()}/orders/${orderId}`, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(this.$ls)
                    }
                }).then(resp => {
                    this.orderDetails = resp.data.data;
                    this.isLoading = false;
                }).catch(err => {
                    console.log(err);

                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            getFormattedAddressShipping: function (addr) {
                return addr.shipping_name + ', ' + addr.shipping_address + ', ' + addr.shipping_city + ', ' + addr.shipping_country +
                    ', ' + addr.shipping_postcode + ', ' + addr.shipping_email + ', ' + addr.shipping_phone;
            },
            getFormattedAddressBilling: function (addr) {
                return addr.billing_name + ', ' + addr.billing_address + ', ' + addr.billing_city + ', ' + addr.billing_country +
                    ', ' + addr.billing_postcode + ', ' + addr.billing_email + ', ' + addr.billing_phone;
            },
            onDownloadClicked: function (order, item) {
                let url = `${Settings.GetUserApiUrl()}/orders/${order.id}/products/${item.product_id}/download?Authorization=${SessionStore.GetAccessToken(this.$ls)}`;
                window.open(url, '_blank');
            },
            toDisplayUnit(v) {
                console.log('--> ' + v);
                return (v / 100).toFixed(2)
            }
        }
    }
</script>
