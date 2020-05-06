<template>
    <!-- Header -->
    <header class="jtv-header-v2">
        <div class="header-lines-decoration"><span class="bg-secondary-color"></span> <span
                class="bg-blue"></span>
            <span class="bg-blue-light"></span> <span class="bg-orange-light"></span> <span
                    class="bg-red"></span> <span
                    class="bg-green"></span> <span class="bg-secondary-color"></span></div>
        <div class="header-container">
            <div class="header-top">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 col-sm-4 col-xs-12">
                            <div class="jtv-lang-cur-wrapper">
                                <div class="jtv-inner-box">
                                    <div class="block jtv-language-block">
                                        <div class="lg-cur">
                                            <span>
                                                <img src="/images/english.png" alt="English"/>
                                                <span class="lg-en">EN</span>
                                                <i class="fa fa-angle-down"></i>
                                            </span>
                                        </div>
                                        <ul>
                                            <li>
                                                <a class="selected" href="#">
                                                    <img src="/images/english.png" alt="flag"><span>EN</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="block jtv-currency-block">
                                        <div class="item-cur">USD<i
                                                class="fa fa-angle-down"></i>
                                        </div>
                                        <ul>
                                            <li><a href="#" title="Dollar">USD</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- top links -->
                        <div class="toplinks col-md-7 col-sm-8 col-xs-12 hidden-xs">
                            <ul class="links">
                                <li class="myaccount"><a title="My Account" href="/my-account"><span
                                        class="hidden-xs">My Account</span></a></li>
                                <li class="wishlist"><a title="My Wishlist" href="/wishlist"><span
                                        class="hidden-xs">Wishlist</span></a></li>
                                <li class="checkout"><a title="Checkout" href="/checkout"><span
                                        class="hidden-xs">Checkout</span></a>
                                </li>
                                <li class="login"><a href="/login"><span
                                        class="hidden-xs">Log In</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Nav/>
        </div>
    </header>
    <!-- end header -->
</template>

<script>
    import Nav from "@/components/Nav";

    export default {
        name: "Header",
        components: {Nav}
    }
</script>
