<template>
    <div>
        <Nav></Nav>
        <ProductList></ProductList>
    </div>
</template>

<script>
    import Nav from "@/components/Nav";
    import ProductList from "@/components/ProductList";

    export default {
        name: "Home",
        components: {ProductList, Nav}
    }
</script>
