<style>
    @import "../style/reset.css";

    .progress-bar .row {
        margin-top: 20px;
    }

    .progress-bar .row .progress {
        margin-top: 10px;
    }

    .pie-progress {
        display: flex;
    }

    .pie-progress .row.vr-progress {
        width: 18%;
        flex-wrap: wrap;
        margin-left: 20px;
    }
</style>

<template>
    <div class="progress-bar">
        <vofill-row name="进度条1："><vofill-progress class="blue" :type=1 :sel-val="selValArr[0]" :total-val="totalVal"></vofill-progress></vofill-row>
        <vofill-row name="进度条2："><vofill-progress class="green" :type=1 :sel-val="selValArr[1]" :total-val="totalVal"></vofill-progress></vofill-row>
        <vofill-row name="进度条3："><vofill-progress class="blue" :type=2 :sel-val="selValArr[2]" :total-val="totalVal"></vofill-progress></vofill-row>
        <vofill-row name="进度条4："><vofill-progress class="yellow" :type=3 :sel-val="selValArr[3]" :total-val="totalVal"></vofill-progress></vofill-row>
        <vofill-row name="进度条5："><vofill-progress :type=8 :sel-val="selValArr[4]" :total-val="totalVal"></vofill-progress></vofill-row>
        <vofill-row name="进度条6："><vofill-progress :type=9 :sel-val="selValArr[5]" :total-val="totalVal"></vofill-progress></vofill-row>
        <div class="pie-progress">
            <vofill-row class="vr-progress" name="进度条7："><vofill-progress :type=4 :sel-val="selValArr[0]" :total-val="totalVal"></vofill-progress></vofill-row>
            <vofill-row class="vr-progress" name="进度条8："><vofill-progress class="blue" :type=5 :sel-val="selValArr[1]" :total-val="totalVal"></vofill-progress></vofill-row>
            <vofill-row class="vr-progress" name="进度条9："><vofill-progress class="blue" :type=6 :sel-val="selValArr[2]" :total-val="totalVal"></vofill-progress></vofill-row>
            <vofill-row class="vr-progress" name="进度条10："><vofill-progress class="blue" :type=7 :sel-val="selValArr[3]" :total-val="totalVal"></vofill-progress></vofill-row>
            <vofill-row class="vr-progress" name="进度条11："><vofill-progress class="blue" :type=10 :sel-val="selValArr[4]" :total-val="totalVal"></vofill-progress></vofill-row>
        </div>
    </div>
</template>

<script>
    import vofillScroll from '../components/scroll'
    import vofillRow from '../components/row'
    import vofillProgress from '../components/progress'
    import vofill from "../js/common/vofill.js";

    export default {
        name: 'Componet',
        components: {
            vofillScroll,
            vofillRow,
            vofillProgress
        },
        data () {
            return {
                totalVal: "100",
                selValArr: ["20", "30", "40", "50", "60", "70", "80"]
            }
        },
        mounted() {
        },
        watch: {
        }
    }
</script>
