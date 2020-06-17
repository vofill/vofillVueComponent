<style>
    @import "../style/reset.css";
    @import "../style/index.css";
</style>

<template>
    <div>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
    import vofill from "../js/common/vofill.js";
    export default {
        name: 'HelloWorld',
        data () {
            return {
                msg: 'Welcome to Your 首页'
            }
        },
        mounted() {
        }
    }
</script>