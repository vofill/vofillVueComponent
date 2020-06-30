<style>
    @import "../style/reset.css";

    .chart-page {
        display: flex;
        flex-warp:warp; /*CSS3样式，bai支持duwebkit，ms*/
        -ms-flex-wrap: wrap;/*IE9以及一下zhi不支持*/
        -webkit-flex-wrap: wrap;
    }

    .chart-page .chart-row {
        width: 45% !important;
    }

</style>

<template>
    <div class="chart-page">
        <vofill-row class="chart-row" name="柱状图："><vofill-graphic-report :type=1></vofill-graphic-report></vofill-row>
        <vofill-row class="chart-row" name="柱状图："><vofill-graphic-report :type=2></vofill-graphic-report></vofill-row>
        <vofill-row class="chart-row" name="平滑折线图："><vofill-graphic-report :type=3></vofill-graphic-report></vofill-row>
        <vofill-row class="chart-row" name="折点折线图："><vofill-graphic-report :type=4></vofill-graphic-report></vofill-row>
        <vofill-row class="chart-row" name="饼图："><vofill-graphic-report :type=5></vofill-graphic-report></vofill-row>
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
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
        },
        watch: {
        }
    }
</script>