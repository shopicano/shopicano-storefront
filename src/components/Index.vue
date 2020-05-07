<template>
    <div>
        <!-- mobile menu -->
        <MobileNav/>
        <div id="page" v-bind:style="styleCss">
            <Header/>

            <Shop/>

            <Footer/>
        </div>
    </div>
</template>

<script>
    // import MobileNav from "@/components/MobileNav";
    // import Header from "@/components/Header";
    // import Footer from "@/components/Footer";

    import Shop from "@/components/Shop";
    import MobileNav from "@/components/MobileNav";
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import {EventBus} from "@/common/event-bus";

    export default {
        name: "Index",
        components: {Footer, Header, MobileNav, Shop},
        data() {
            return {
                styleCss: ''
            }
        },
        mounted() {
            EventBus.$on('nav-action', isOpen => {
                if (isOpen) {
                    this.styleCss = 'left: 250px;';
                } else {
                    this.styleCss = '';
                }
            });
        }
    }
</script>
