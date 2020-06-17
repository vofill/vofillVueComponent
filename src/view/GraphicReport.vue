<style>
    @import "../style/reset.css";

    .chart-page .chart-row {
        width: 45% !important;
    }

</style>

<template>
    <div>
        <vofill-row class="chart-row" name="柱状图："><vofill-graphic-report :type=1></vofill-graphic-report></vofill-row>
        <vofill-row class="chart-row" name="折线图："><vofill-graphic-report :type=2></vofill-graphic-report></vofill-row>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
