<template>
    <div class="main-container col2-right-layout">
        <PleaseWait :isLoading="isLoading"/>
        <div class="main container">
            <div class="row">
                <section class="col-sm-9 wow">
                    <div class="col-main">
                        <div class="my-account">
                            <div class="page-title">
                                <h2>Welcome, {{ name }}</h2>
                            </div>
                            <div class="dashboard">
                                <div class="recent-orders">
                                    <div class="title-buttons">
                                        <strong>Recent Orders</strong>
                                    </div>
                                    <br>
                                    <div class="table-responsive">
                                        <table class="data-table" id="my-orders-table">
                                            <col>
                                            <col>
                                            <col>
                                            <col width="1">
                                            <col width="1">
                                            <col width="1">
                                            <thead>
                                            <tr class="first last">
                                                <th>OrderID</th>
                                                <th>Date</th>
                                                <th><span class="nobr">Order Total</span></th>
                                                <th>Status</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr class="first odd" v-for="o in orders" v-bind:key="o.id">
                                                <td>{{ o.hash }}</td>
                                                <td>{{ o.created_at }}</td>
                                                <td><span class="price">${{ toDisplayUnit(o.grand_total) }}</span></td>
                                                <td><em>{{ o.status }}</em></td>
                                                <td class="a-center last">
                                                    <span class="nobr">
                                                        <a v-bind:href="'/#/order-history/'+o.id">View Order</a>
                                                    </span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="ajax-checkout">
                                            <button class="button button-compare"
                                                    v-on:click="prevOrders">
                                                <span>Prev</span>
                                            </button>&nbsp;&nbsp;&nbsp;
                                            <button class="button button-compare"
                                                    v-on:click="nextOrders">
                                                <span>Next</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <aside class="col-right sidebar col-sm-3 wow">
                    <div class="block block-account">
                        <div class="block-content">
                            <ul>
                                <li><a>My Orders</a></li>
                                <li><a>My Profile</a></li>
                                <li><a>Change Password</a></li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";
    import PleaseWait from "@/components/PleaseWait";

    export default {
        name: "Dashboard",
        components: {PleaseWait},
        data() {
            return {
                name: '',
                orders: [],
                current_page: 1,
                isLoading: false
            }
        },
        mounted() {
            this.isLoading = true;
            this.getProfile();
        },
        methods: {
            getProfile: function () {
                axios.get(`${Settings.GetUserApiUrl()}/users`, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(this.$ls)
                    }
                }).then(resp => {
                    this.name = resp.data.data.name;
                    this.getOrders(this.current_page);
                }).catch(err => {
                    console.log(err);

                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            getOrders: function (page) {
                axios.get(`${Settings.GetUserApiUrl()}/orders?limit=10&page=${page}`, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(this.$ls)
                    }
                }).then(resp => {
                    this.orders = resp.data.data;
                    this.isLoading = false;
                }).catch(err => {
                    console.log(err);

                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            nextOrders: function () {
                this.isLoading = true;
                this.current_page = this.current_page + 1;
                this.getOrders(this.current_page);
            },
            prevOrders: function () {
                if (this.current_page === 1) {
                    return
                }

                this.isLoading = true;
                this.current_page--;
                this.getOrders(this.current_page);
            },
            toDisplayUnit(v) {
                return (v / 100).toFixed(2)
            }
        }
    }
</script>
