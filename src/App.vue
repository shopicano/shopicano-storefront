<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        mounted() {
            window.$ = require('jquery');
            window.JQuery = require('jquery');
        }
    }
</script>
