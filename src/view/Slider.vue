<style>
    @import "../style/reset.css";

    .row {
        padding-top: 30px !important;
    }

    .row .slider {
        margin-top: 10px;
    }
</style>

<template>
    <div>
        <h1>{{ msg }}</h1>
        <vofill-scroll :height="scrollHeight">
            
            <div style="width: 100%; height: 60px; font-size: 40px; line-height: 60px; text-align: center;">竖状滑块</div>
            <vofill-row style="height: 300px;">
                <vofill-slider class="vert-div" :type=4 :sel-val="selValArr[0]" :total-val="totalVal"></vofill-slider>
                <vofill-slider class="vert-div blue" :type=4 :sel-val="selValArr[1]" :total-val="totalVal"></vofill-slider>
                <vofill-slider class="vert-div green2" :type=4 :sel-val="selValArr[2]" :total-val="totalVal"></vofill-slider>
                <vofill-slider class="vert-div yellow" :type=4 :sel-val="selValArr[3]" :total-val="totalVal"></vofill-slider>
                <vofill-slider class="vert-div orange" :type=4 :sel-val="selValArr[4]" :total-val="totalVal"></vofill-slider>
                <vofill-slider class="vert-div blue" :type=5 :sel-val="selValArr[1]" :total-val="totalVal"></vofill-slider>
                <vofill-slider class="vert-div green2" :type=5 :sel-val="selValArr[2]" :total-val="totalVal"></vofill-slider>
                <vofill-slider class="vert-div yellow" :type=5 :sel-val="selValArr[3]" :total-val="totalVal"></vofill-slider>
                <vofill-slider class="vert-div orange" :type=5 :sel-val="selValArr[4]" :total-val="totalVal"></vofill-slider>
            </vofill-row>
            <div style="width: 100%; height: 60px; font-size: 40px; line-height: 60px; text-align: center;">横状滑块</div>
            <vofill-row name="默认："><vofill-slider :type=1 :sel-val="selValArr[0]" :total-val="totalVal"></vofill-slider></vofill-row>
            <vofill-row name="蓝色："><vofill-slider class="blue" :type=1 :sel-val="selValArr[1]" :total-val="totalVal"></vofill-slider></vofill-row>
            <vofill-row name="绿色："><vofill-slider class="green2" :type=1 :sel-val="selValArr[2]" :total-val="totalVal"></vofill-slider></vofill-row>
            <vofill-row name="黄色："><vofill-slider class="yellow" :type=1 :sel-val="selValArr[3]" :total-val="totalVal"></vofill-slider></vofill-row>
            <vofill-row name="橘红色："><vofill-slider class="orange" :type=1 :sel-val="selValArr[4]" :total-val="totalVal"></vofill-slider></vofill-row>
            <vofill-row name="反向蓝色："><vofill-slider class="blue" :type=2 :sel-val="selValArr[1]" :total-val="totalVal"></vofill-slider></vofill-row>
            <vofill-row name="反向绿色："><vofill-slider class="green2" :type=2 :sel-val="selValArr[2]" :total-val="totalVal"></vofill-slider></vofill-row>
            <vofill-row name="反向黄色："><vofill-slider class="yellow" :type=2 :sel-val="selValArr[3]" :total-val="totalVal"></vofill-slider></vofill-row>
            <vofill-row name="反向橘红色："><vofill-slider class="orange" :type=2 :sel-val="selValArr[4]" :total-val="totalVal"></vofill-slider></vofill-row>
        </vofill-scroll>
    </div>
</template>

<script>
    import vofillScroll from '../components/scroll'
    import vofillRow from '../components/row'
    import vofillSlider from '../components/slider'

    export default {
        name: 'Componet',
        components: {
            vofillScroll,
            vofillRow,
            vofillSlider
        },
        data () {
            return {
                msg: 'Welcome to Your 滑块组件页',
                totalVal: "100",
                scrollHeight: "760px",
                selValArr: ["20", "30", "40", "50", "60"]
            }
        },
        watch: {
        }
    }
</script>
