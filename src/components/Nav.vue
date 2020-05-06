<template>
    <b-navbar fixed-top spaced mobile-burger>
        <div slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/'}">
                <img src="/logo.png">
                <h1 class="logo-name">hopicano</h1>
            </b-navbar-item>
        </div>
        <div slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/'}">
                <a class="is-primary">Home</a>
            </b-navbar-item>
        </div>
        <div slot="end">
            <b-navbar-item tag="router-link" :to="{ path: '/cart'}">
                <a class="is-primary">Cart</a>
            </b-navbar-item>
        </div>
    </b-navbar>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style scoped>
    .logo-name {
        color: #1632A4;
        font-weight: 700;
        font-size: 24px;
        line-height: 38px;
        display: block;
        float: left;
        text-decoration: none;
    }
</style>
