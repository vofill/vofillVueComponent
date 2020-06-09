<style>
    @import "../style/reset.css";

    .chart-page {
        width: 100%;
        height: 100%;
    }

    .chart-page .chart-row {
        width: 45% !important;
    }

</style>

<template>
    <div class="chart-page" id="pageId">
        <h1>{{ msg }}</h1>
        <vofill-scroll :height="scrollHeight">
            <vofill-row class="chart-row" name="柱状图："><vofill-graphic-report :type=1></vofill-graphic-report></vofill-row>
            <vofill-row class="chart-row" name="折线图："><vofill-graphic-report :type=2></vofill-graphic-report></vofill-row>
        </vofill-scroll>
    </div>
</template>

<script>
    import vofillRow from '../components/row'
    import vofillScroll from '../components/scroll'
    import vofillGraphicReport from '../components/graphicreport'
    import vofill from "../js/common/vofill.js";

    export default {
        name: 'Table',
        components: {
            vofillRow,
            vofillScroll,
            vofillGraphicReport
        },
        data () {
            return {
                msg: 'Welcome to Your 图形报表组件页',
                scrollHeight: "780px"
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
