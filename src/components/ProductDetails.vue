<template>
    <section class="main-container col1-layout">
        <div class="main">
            <div class="container">
                <div class="row">
                    <div class="col-main">
                        <div class="product-view">
                            <div class="product-essential">
                                <div>
                                    <div class="product-img-box col-lg-5 col-sm-5 col-xs-12">
                                        <div class="new-label new-top-left"> New</div>
                                        <div class="product-image">
                                            <div class="product-full">
                                                <slider animation="fade"
                                                        v-model="sliderValue" :duration="5000" :speed="1000">
                                                    <SliderItem
                                                            v-for="(i, index) in productImages"
                                                            :key="index">
                                                        <img width="auto" height="auto" v-bind:src="i"/>
                                                    </SliderItem>
                                                </slider>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="product-shop col-lg-7 col-sm-7 col-xs-12">
                                        <div class="product-name">
                                            <h1>{{ productDetails.name }}</h1>
                                        </div>
                                        <div class="rating"><i class="fa fa-star"></i> <i
                                                class="fa fa-star"></i> <i class="fa fa-star"></i> <i
                                                class="fa fa-star"></i> <i class="fa fa-star-o"></i>
                                            <p class="rating-links"><a href="#">4 Review(s)</a> <span
                                                    class="separator">|</span> <a href="#"><i
                                                    class="fa fa-pencil"></i> write a review</a></p>
                                        </div>
                                        <div class="price-block">
                                            <div class="price-box">
                                                <p class="special-price"><span
                                                        class="price-label">Special Price</span> <span
                                                        id="product-price-48"
                                                        class="price"> ${{productDetails.price}} </span></p>
                                                <!--                                                <p class="old-price"><span-->
                                                <!--                                                        class="price-label">Regular Price:</span> <span-->
                                                <!--                                                        class="price"> $ {{ productDetails.price }} </span></p>-->
                                            </div>
                                        </div>
                                        <div class="info-orther">
                                            <p>Seller: {{ productDetails.store_name }}</p>
                                            <p>SKU: {{ productDetails.sku }}</p>
                                            <p>Availability:
                                                <span v-if="productDetails.stock>0" class="in-stock">In stock</span>
                                                <span v-if="productDetails.stock===0"
                                                      class="out-of-stock">Out of stock</span>
                                            </p>
                                        </div>
                                        <div class="form-option">
                                            <p v-if="productDetails.stock>0" class="form-option-title">Available
                                                Options:</p>
                                            <div v-if="productDetails.stock>0" class="attributes">
                                                <div class="attribute-label">Color:</div>
                                                <div class="attribute-list">
                                                    <ul class="list-color">
                                                        <li style="background:#DD4132;"><a href="#">Fiesta</a>
                                                        </li>
                                                        <li style="background:#4F84C4;"><a href="#">Marina</a>
                                                        </li>
                                                        <li style="background:#EE82EE;" class="active"><a
                                                                href="#">Violet</a></li>
                                                        <li style="background:#92B558;"><a href="#">Green</a>
                                                        </li>
                                                        <li style="background:#191970;"><a
                                                                href="#">MidnightBlue</a></li>
                                                        <li style="background:#ff0000;"><a href="#">red</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="add-to-box">
                                                <div v-if="productDetails.stock>0" class="add-to-cart">
                                                    <div class="pull-left">
                                                        <div class="custom pull-left">
                                                            <label>Qty :</label>
                                                            <button v-on:click="adjustQuantity(-1)"
                                                                    class="reduced items-count" type="button"><i
                                                                    class="fa fa-minus">&nbsp;</i></button>
                                                            <input type="text" class="input-text qty"
                                                                   title="Qty" v-bind:value="numberOfQuantity"
                                                                   maxlength="12" id="qty"
                                                                   name="qty">
                                                            <button v-on:click="adjustQuantity(1)"
                                                                    class="increase items-count" type="button">
                                                                <i class="fa fa-plus">&nbsp;</i></button>
                                                        </div>
                                                    </div>
                                                    <button v-if="numberOfQuantity===0" v-on:click="onAddToCart"
                                                            class="button btn-cart" title="Add to Cart"
                                                            type="button">Add to Cart
                                                    </button>
                                                    <button v-if="numberOfQuantity!==0" v-on:click="onAddToCart"
                                                            class="button btn-cart" title="Add to Cart"
                                                            type="button">Update to Cart
                                                    </button>
                                                </div>
                                                <div class="email-addto-box">
                                                    <ul class="add-to-links">
                                                        <li><a class="link-wishlist"
                                                               href=""><span>Add to Wishlist</span></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-share">
                                            <div class="sendtofriend-print"><a href="javascript:print();"><i
                                                    class="fa fa-print"></i> Print</a> <a href="#"><i
                                                    class="fa fa-envelope-o fa-fw"></i> Send to a friend</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-collateral col-lg-12 col-sm-12 col-xs-12">
                        <div class="add_info">
                            <ul id="product-detail-tab" class="nav nav-tabs product-tabs">
                                <li class="active"><a href="#product_tabs_description" data-toggle="tab">
                                    Product Description </a></li>
                                <li><a href="#reviews_tabs" data-toggle="tab">Reviews</a></li>
                            </ul>
                            <div id="productTabContent" class="tab-content">
                                <div class="tab-pane fade in active" id="product_tabs_description">
                                    <div class="std">
                                        {{ productDetails.description }}
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="reviews_tabs">
                                    <div class="box-collateral box-reviews" id="customer-reviews">
                                        <div class="box-reviews1">
                                            <div class="form-add">
                                                <form id="review-form" method="post"
                                                      action="http://www.jtvcommerce.com/review/product/post/id/176/">
                                                    <h3>Write Your Own Review</h3>
                                                    <fieldset>
                                                        <h4>How do you rate this product? <em
                                                                class="required">*</em></h4>
                                                        <span id="input-message-box"></span>
                                                        <table id="product-review-table" class="data-table">
                                                            <colgroup>
                                                                <col>
                                                                <col width="1">
                                                                <col width="1">
                                                                <col width="1">
                                                                <col width="1">
                                                                <col width="1">
                                                            </colgroup>
                                                            <thead>
                                                            <tr class="first last">
                                                                <th>&nbsp;</th>
                                                                <th><span class="nobr">1 *</span></th>
                                                                <th><span class="nobr">2 *</span></th>
                                                                <th><span class="nobr">3 *</span></th>
                                                                <th><span class="nobr">4 *</span></th>
                                                                <th><span class="nobr">5 *</span></th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr class="first odd">
                                                                <th>Price</th>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio"
                                                                                         value="11" id="Price_1"
                                                                                         name="ratings[3]"></td>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio"
                                                                                         value="12" id="Price_2"
                                                                                         name="ratings[3]"></td>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio"
                                                                                         value="13" id="Price_3"
                                                                                         name="ratings[3]"></td>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio"
                                                                                         value="14" id="Price_4"
                                                                                         name="ratings[3]"></td>
                                                                <td class="value last"><input type="radio"
                                                                                              class="radio"
                                                                                              value="15"
                                                                                              id="Price_5"
                                                                                              name="ratings[3]">
                                                                </td>
                                                            </tr>
                                                            <tr class="even">
                                                                <th>Value</th>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio" value="6"
                                                                                         id="Value_1"
                                                                                         name="ratings[2]"></td>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio" value="7"
                                                                                         id="Value_2"
                                                                                         name="ratings[2]"></td>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio" value="8"
                                                                                         id="Value_3"
                                                                                         name="ratings[2]"></td>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio" value="9"
                                                                                         id="Value_4"
                                                                                         name="ratings[2]"></td>
                                                                <td class="value last"><input type="radio"
                                                                                              class="radio"
                                                                                              value="10"
                                                                                              id="Value_5"
                                                                                              name="ratings[2]">
                                                                </td>
                                                            </tr>
                                                            <tr class="last odd">
                                                                <th>Quality</th>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio" value="1"
                                                                                         id="Quality_1"
                                                                                         name="ratings[1]"></td>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio" value="2"
                                                                                         id="Quality_2"
                                                                                         name="ratings[1]"></td>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio" value="3"
                                                                                         id="Quality_3"
                                                                                         name="ratings[1]"></td>
                                                                <td class="value"><input type="radio"
                                                                                         class="radio" value="4"
                                                                                         id="Quality_4"
                                                                                         name="ratings[1]"></td>
                                                                <td class="value last"><input type="radio"
                                                                                              class="radio"
                                                                                              value="5"
                                                                                              id="Quality_5"
                                                                                              name="ratings[1]">
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <input type="hidden" value="" class="validate-rating"
                                                               name="validate_rating">
                                                        <div class="review1">
                                                            <ul class="form-list">
                                                                <li>
                                                                    <label class="required"
                                                                           for="nickname_field">Nickname<em>*</em></label>
                                                                    <div class="input-box">
                                                                        <input type="text" class="input-text"
                                                                               id="nickname_field"
                                                                               name="nickname">
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <label class="required"
                                                                           for="summary_field">Summary<em>*</em></label>
                                                                    <div class="input-box">
                                                                        <input type="text" class="input-text"
                                                                               id="summary_field" name="title">
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="review2">
                                                            <ul>
                                                                <li>
                                                                    <label class="required "
                                                                           for="review_field">Review<em>*</em></label>
                                                                    <div class="input-box">
                                                                                <textarea rows="3" cols="5"
                                                                                          id="review_field"
                                                                                          name="detail"></textarea>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div class="buttons-set">
                                                                <button class="button submit"
                                                                        title="Submit Review" type="submit">
                                                                    <span>Submit Review</span></button>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="box-reviews2">
                                            <h3>Customer Reviews</h3>
                                            <div class="box visible">
                                                <ul>
                                                    <li>
                                                        <table class="ratings-table">
                                                            <colgroup>
                                                                <col width="1">
                                                                <col>
                                                            </colgroup>
                                                            <tbody>
                                                            <tr>
                                                                <th>Value</th>
                                                                <td>
                                                                    <div class="rating-box">
                                                                        <div class="rating"
                                                                             style="width:100%;"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Quality</th>
                                                                <td>
                                                                    <div class="rating-box">
                                                                        <div class="rating"
                                                                             style="width:100%;"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Price</th>
                                                                <td>
                                                                    <div class="rating-box">
                                                                        <div class="rating"
                                                                             style="width:100%;"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <div class="review">
                                                            <h6><a href="#">Excellent</a></h6>
                                                            <small>Review by <span>Leslie Prichard </span>on
                                                                1/3/2014 </small>
                                                            <div class="review-txt"> I have purchased shirts
                                                                from Minimalism a few times and am never
                                                                disappointed. The quality is excellent and the
                                                                shipping is amazing. It seems like it's at your
                                                                front door the minute you get off your pc. I
                                                                have received my purchases within two days -
                                                                amazing.
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="even">
                                                        <table class="ratings-table">
                                                            <colgroup>
                                                                <col width="1">
                                                                <col>
                                                            </colgroup>
                                                            <tbody>
                                                            <tr>
                                                                <th>Value</th>
                                                                <td>
                                                                    <div class="rating-box">
                                                                        <div class="rating"
                                                                             style="width:100%;"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Quality</th>
                                                                <td>
                                                                    <div class="rating-box">
                                                                        <div class="rating"
                                                                             style="width:100%;"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Price</th>
                                                                <td>
                                                                    <div class="rating-box">
                                                                        <div class="rating"
                                                                             style="width:80%;"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <div class="review">
                                                            <h6>
                                                                <a href="#/catalog/product/view/id/60/">Amazing</a>
                                                            </h6>
                                                            <small>Review by <span>Sandra Parker</span>on
                                                                1/3/2014 </small>
                                                            <div class="review-txt"> Minimalism is the online
                                                                !
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <table class="ratings-table">
                                                            <colgroup>
                                                                <col width="1">
                                                                <col>
                                                            </colgroup>
                                                            <tbody>
                                                            <tr>
                                                                <th>Value</th>
                                                                <td>
                                                                    <div class="rating-box">
                                                                        <div class="rating"
                                                                             style="width:100%;"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Quality</th>
                                                                <td>
                                                                    <div class="rating-box">
                                                                        <div class="rating"
                                                                             style="width:100%;"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Price</th>
                                                                <td>
                                                                    <div class="rating-box">
                                                                        <div class="rating"
                                                                             style="width:80%;"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <div class="review">
                                                            <h6>
                                                                <a href="#/catalog/product/view/id/59/">Nicely</a>
                                                            </h6>
                                                            <small>Review by <span>Anthony  Lewis</span>on
                                                                1/3/2014 </small>
                                                            <div class="review-txt last"> Unbeatable service and
                                                                selection. This store has the best business
                                                                model I have seen on the net. They are true to
                                                                their word, and go the extra mile for their
                                                                customers. I felt like a purchasing partner more
                                                                than a customer. You have a lifetime client in
                                                                me.
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="actions"><a class="button view-all" id="revies-button"
                                                                    href="#"><span><span>View all</span></span></a>
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                    </div>
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
    import Cart from "@/common/cart";
    import {Slider, SliderItem} from 'vue-easy-slider'
    import {EventBus} from "@/common/event-bus";

    export default {
        name: "ProductDetails",
        components: {Slider, SliderItem},
        data() {
            return {
                productDetails: Object,
                numberOfQuantity: 0,
                sliderValue: 1,
                productImages: [],
                metas: [],
            }
        },
        mounted() {
            this.getProductDetails(this.$route.params.id);
        },
        methods: {
            getProductDetails: function (slug) {
                axios.get(`${Settings.GetUserApiUrl()}/products/` + slug).then(resp => {
                    this.productDetails = resp.data.data;

                    let images = [];
                    images.push(this.createImageUrl(this.productDetails.image));

                    if (this.productDetails.additional_images !== null) {
                        for (let i = 0; i < this.productDetails.additional_images.length; i++) {
                            images.push(this.createImageUrl(this.productDetails.additional_images[i]));
                        }
                    }

                    this.productImages = images;

                    console.log(this.productImages);

                    if (Cart.is_added(this.$ls, this.productDetails.id)) {
                        this.numberOfQuantity = Cart.get_item(this.$ls, this.productDetails.id).quantity;
                    }

                    console.log(document.head);

                    this.isLoading = false;
                }).catch(err => {
                    console.log(err);

                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
            adjustQuantity: function (change) {
                if (this.numberOfQuantity + change < 0) {
                    return
                }
                if (this.productDetails.max_quantity_count !== 0 && (this.numberOfQuantity + change) <= this.productDetails.max_quantity_count) {
                    this.numberOfQuantity += change;
                }
            },
            onAddToCart: function () {
                if (this.numberOfQuantity === 0) {
                    return
                }

                Cart.add(this.$ls, {
                    id: this.productDetails.id,
                    quantity: this.numberOfQuantity,
                    name: this.productDetails.name,
                    image: this.productDetails.image,
                    price: this.productDetails.price,
                    slug: this.productDetails.slug
                });

                EventBus.$emit('cart-updated', true);
            },
            createImageUrl: function (path) {
                return Settings.GetMediaUrl() + path;
            },
        }
    }
</script>
