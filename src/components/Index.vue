<template>
    <div>
        <!-- mobile menu -->
        <MobileNav/>
        <div id="page">
            <Header/>

            <Shop/>

            <Footer/>
        </div>
    </div>
</template>

<script>
    import MobileNav from "@/components/MobileNav";
    import Header from "@/components/Header";
    import Shop from "@/components/Shop";
    import Footer from "@/components/Footer";

    export default {
        name: "Index",
        components: {Footer, Shop, MobileNav, Header}
    }
</script>
