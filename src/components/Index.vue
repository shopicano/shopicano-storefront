<template>
    <Shop/>
</template>

<script>
    import Shop from "@/components/Shop";
    import {EventBus} from "@/common/event-bus";

    export default {
        name: "Index",
        components: {Shop},
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
