<style>
    @import "../style/reset.css";

    .rsl-box {
        width: 700px;
        height: 600px;
        margin-right: 100px;
        vertical-align: top;
        display: inline-block;
    }
</style>

<template>
    <div class="page-body" id="pageId">
        <h1>{{ msg }}</h1>
        <vofill-scroll :height="scrollHeight">
            <div class="rsl-box">
                <vofill-lrselect :type=1 :sel-obj="selObj" sel-key="SelIds"></vofill-lrselect>
            </div>
            <div class="rsl-box">
                <vofill-lrselect :type=2 :sel-obj="selObj" sel-key="SelIds"></vofill-lrselect>
            </div>
        </vofill-scroll>
    </div>
</template>

<script>
    import vofillScroll from '../components/scroll'
    import vofillLrselect from '../components/lrselect'
    import vofill from "../js/common/vofill.js";

    export default {
        name: 'LRSelect',
        components: {
            vofillScroll,
            vofillLrselect
        },
        data () {
            return {
                msg: 'Welcome to Your 左右选择页',
                scrollHeight: "",
                scrollWidth: "600px",
                selObj: {SelIds: "4,5,6"}
            }
        },
        created() {
        },
        mounted() {
            let pageHeight = vofill.getBrowserInfo("pageId").Height;
            this.scrollHeight = (pageHeight - 30) + "px";
        },
        methods: {
        },
        watch: {
        }
    }
</script>
