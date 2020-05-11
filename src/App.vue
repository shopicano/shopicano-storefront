<template>
    <div>
        <!-- mobile menu -->
        <MobileNav/>
        <div id="page" v-bind:style="styleCss">
            <Header/>

            <RouterView :key="$route.fullPath"></RouterView>

            <Footer/>
        </div>
    </div>
</template>

<script>
    import {EventBus} from "@/common/event-bus";
    import MobileNav from "@/components/MobileNav";
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";

    export default {
        name: 'App',
        components: {Footer, Header, MobileNav},
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
        },
        metaInfo: {
            title: "Shopicano - E-commerce framework for future",
            meta: [
                {
                    name: 'description',
                    content: 'Shopicano - E-commerce framework for future'
                },
                {
                    property: 'og:title', content: "Shopicano - E-commerce framework for future"
                },
                {
                    property: 'og:site_name', content: 'Shopicano'
                },
                {
                    property: 'og:type', content: 'website'
                },
                {
                    name: 'robots', content: 'index,follow'
                }
            ]
        }
    }
</script>
