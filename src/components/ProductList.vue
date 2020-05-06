<template>
    <div class="row">
        <Product v-for="p in products" v-bind:key="p.id"></Product>
    </div>
</template>

<script>
    import Product from "@/components/Product";

    export default {
        name: "ProductList",
        components: {Product},
        data() {
            return {
                products: []
            }
        },
        mounted() {
            for (let i = 1; i <= 10; i++) {
                this.products.push({
                    id: i,
                })
            }
        }
    }
</script>

<style scoped>

</style>
