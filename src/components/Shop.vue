<template>
    <!-- Main Container -->
    <section class="main-container col2-left-layout">
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-sm-push-3">
                    <article class="col-main">
                        <div class="category-products">
                            <ol class="products-list" id="products-list">
                                <li class="item" v-for="p in products" v-bind:key="p.id">
                                    <div class="product-image">
                                        <a v-bind:href="'/#/products/'+p.id"
                                           v-bind:title="p.name">
                                            <img class="img-responsive small-image"
                                                 v-bind:src="createImageUrl(p.image)"
                                                 v-bind:alt="p.name">
                                        </a>
                                    </div>
                                    <div class="product-shop">
                                        <h2 class="product-name">
                                            <a v-bind:href="'/#/products/'+p.id"
                                               v-bind:title="p.name">
                                                {{ p.name }}
                                            </a>
                                        </h2>
                                        <div class="rating"><i class="fa fa-star"></i> <i
                                                class="fa fa-star"></i> <i
                                                class="fa fa-star-o"></i> <i class="fa fa-star-o"></i> <i
                                                class="fa fa-star-o"></i>
                                            <p class="rating-links"><a v-bind:href="'/#/products/'+p.id+'#reviews'">2
                                                Review(s)</a></p>
                                        </div>
                                        <div class="desc std">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy
                                                text ever
                                                since the 1500s, when an unknown printer...
                                                <a class="link-learn" title="" v-bind:href="'/#/products/'+p.id">
                                                    Learn More
                                                </a>
                                            </p>
                                        </div>
                                        <div class="price-box">
                                            <!--                                            <p class="old-price">-->
                                            <!--                                                <span class="price-label"></span><span class="price">$442.99</span>-->
                                            <!--                                            </p>-->
                                            <p class="special-price">
                                                <span class="price-label"></span><span
                                                    class="price">${{ p.price }}</span></p>
                                        </div>
                                        <div class="actions">
                                            <button class="button btn-cart" title="Add to Cart" type="button">
                                                <span>Add to Cart</span>
                                            </button>
                                            <span class="add-to-links">
                                                <a title="Add to Wishlist" class="button link-wishlist"
                                                   href="/#/wishlist">
                                                    <span>Add to Wishlist</span>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div class="toolbar">
                            <div class="row">
                                <div class="col-sm-6 text-left">
                                    <ul class="pagination">
                                        <li v-if="currentPage-2>0">
                                            <a v-on:click="onPageChange(currentPage-2)">&lt;&lt;</a>
                                        </li>
                                        <li v-if="currentPage-1>0">
                                            <a v-on:click="onPageChange(currentPage-1)">&lt;</a>
                                        </li>
                                        <li class="active"><span>{{ currentPage }}</span></li>
                                        <li v-if="currentPage+1<=totalPages">
                                            <a v-on:click="onPageChange(currentPage+1)">&gt;</a>
                                        </li>
                                        <li v-if="currentPage+2<=totalPages">
                                            <a v-on:click="onPageChange(currentPage+2)">&gt;&gt;</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-sm-6 text-right">Showing 1 to 15 of 25 (2 Pages)</div>
                            </div>
                        </div>
                    </article>
                </div>

                <div class="sidebar col-sm-3 col-xs-12 col-sm-pull-9">
                    <aside class="sidebar">
                        <div class="block block-layered-nav">
                            <div class="block-title">Shop By</div>
                            <div class="block-content">
                                <dl id="narrow-by-list">
                                    <dt class="even">Stores</dt>
                                    <dd class="even">
                                        <ol>
                                            <li><a href="#">Colorido</a> (20)</li>
                                            <li><a href="#">Adidas</a> (25)</li>
                                            <li><a href="#">Barisa Epic</a> (8)</li>
                                            <li><a href="#">Esbeda</a> (5)</li>
                                        </ol>
                                    </dd>
                                    <dt class="odd">Collections</dt>
                                    <dd class="odd">
                                        <ol class="bag-material">
                                            <li v-for="c in collections" v-bind:key="c.id">
                                                <a>
                                                    <input type="checkbox" v-on:change="onItemChecked(c.id)"/>
                                                    {{ c.name }}
                                                </a>
                                            </li>
                                        </ol>
                                    </dd>
                                </dl>
                            </div>
                        </div>

                        <div class="block block-list block-viewed">
                            <div class="block-title"> Recently Viewed</div>
                            <div class="block-content">
                                <ol id="recently-viewed-items">
                                    <li class="item">
                                        <p class="product-name"><a href="#"><i class="fa fa-angle-right"></i>Product
                                            Title Here</a></p>
                                    </li>
                                    <li class="item">
                                        <p class="product-name"><a href="#"><i class="fa fa-angle-right"></i>Product
                                            Title Here</a></p>
                                    </li>
                                    <li class="item last">
                                        <p class="product-name"><a href="#"><i class="fa fa-angle-right"></i>Product
                                            Title Here</a></p>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </section>
    <!-- Main Container End -->
</template>

<script>
    import axios from "axios";
    import Settings from "@/common/settings";

    export default {
        name: "Shop",
        data() {
            return {
                collections: [],
                products: [],
                currentPage: 1,
                totalPages: 10
            }
        },
        mounted() {
            if (this.$route.query.page !== undefined) {
                this.currentPage = this.$route.query.page;
            }
            this.listCollections();
            this.listProducts();
        },
        methods: {
            listCollections: function () {
                axios.get(`${Settings.GetUserApiUrl()}/collections?limit=10`).then(resp => {
                    this.collections = resp.data.data;
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            onItemChecked: function (id) {
                alert(id);
            },
            listProducts: function () {
                axios.get(`${Settings.GetUserApiUrl()}/products?limit=4&page=` + this.currentPage).then(resp => {
                    this.products = resp.data.data;
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            createImageUrl: function (path) {
                return Settings.GetMediaUrl() + path;
            },
            onPageChange: function (newPage) {
                this.currentPage = newPage;
                this.listProducts();
            }
        }
    }
</script>
