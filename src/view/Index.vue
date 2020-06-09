<style>
    @import "../style/reset.css";
    @import "../style/index.css";
</style>

<template>
    <div class="page-body" id="pageId">
        <h1>{{ msg }}</h1>
        <vofill-scroll :height="scrollHeight">
        </vofill-scroll>
    </div>
</template>

<script>
    import vofill from "../js/common/vofill.js";
    export default {
        name: 'HelloWorld',
        data () {
            return {
                msg: 'Welcome to Your 首页',
                scrollHeight: ""
            }
        },
        mounted() {
            let pageHeight = vofill.getBrowserInfo("pageId").Height;
            this.scrollHeight = (pageHeight - 30) + "px";
        }
    }
</script>