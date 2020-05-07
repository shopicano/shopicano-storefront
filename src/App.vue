<template>
    <RouterView :key="$route.fullPath"></RouterView>
</template>

<script>
    export default {
        name: 'App',
        components: {}
    }
</script>
