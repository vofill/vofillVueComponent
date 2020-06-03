/**
**滑块组件
**vofill
**2020-05-13
**/

<template>
    <div style="height: 100%;">
        <template v-if="localType == 1 || localType == 2">
            <div :class="['slider', {'s-reverse': localType == 2}]" id="slider">
                <div :class="['sx-range', {'sx-reverse': localType == 2}]" :style="sxrStyle"></div>
                <div class="sxl-block" :style="sxlbStyle" id="sxlBlock" @mousedown="startLXDrag" @mouseover="sxlbMoveIn" @mouseout="sxlbMoveOut">
                    <div class="sxlb-val" v-show="sxlBlockShow">当前值：{{leftHadVal}}</div>
                </div>
            </div>
        </template>
        <template v-else-if="localType == 4 || localType == 5">
            <div :class="['vert-slider', {'vs-reverse': localType == 5}]" id="vertSlider">
                <div :class="['vsx-range', {'vsx-reverse': localType == 5}]" :style="vsxrStyle"></div>
                <div class="vsxl-block" :style="vsxlbStyle" id="vsxlBlock" @mousedown="vstartLXDrag" @mouseover="sxlbMoveIn" @mouseout="sxlbMoveOut">
                    <div class="vsxlb-val" v-show="sxlBlockShow">当前值：{{topHadVal}}</div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import vofill from "../js/common/vofill.js";

    export default {
        name: "vofill-slider",
        props: {              //prop接收传过来的参数
            "type": Number,
            "selVal": String,
            "totalVal": String
        },
        data () {
            return {
                localTotalVal: this.totalVal ? this.totalVal : 0,
                bolckleftHadVal: 0,
                bolckTotalVal: 0,
                bolckTopHadVal: 0,
                bolckToVtalVal: 0,
                sxlBlockShow: false,
                localType: this.type ? this.type : 1
            }
        },
        created() {
        },
        computed:{
            sxrStyle() {
                let currVal = vofill.changeDecimal(3, (this.bolckleftHadVal / this.bolckTotalVal));
                currVal = currVal * 100;
                return {width: currVal + "%"}
            },
            sxlbStyle() {
                let currVal = vofill.changeDecimal(3, ((this.bolckleftHadVal - 8) / this.bolckTotalVal));
                currVal = currVal * 100;
                return {left: currVal + "%"}
            },
            leftHadVal() {
                let currVal = vofill.changeDecimal(3, (this.bolckleftHadVal / this.bolckTotalVal));
                return Math.round(currVal * this.localTotalVal);
            },
            vsxrStyle() {
                let currVal = vofill.changeDecimal(3, (this.bolckTopHadVal / this.bolckToVtalVal));
                currVal = currVal * 100;
                return {height: currVal + "%"}
            },
            vsxlbStyle() {
                let currVal = vofill.changeDecimal(3, ((this.bolckTopHadVal - 8) / this.bolckToVtalVal));
                currVal = currVal * 100;
                return {bottom: currVal + "%"}
            },
            topHadVal() {
                let currVal = vofill.changeDecimal(3, (this.bolckTopHadVal / this.bolckToVtalVal));
                return Math.round(currVal * this.localTotalVal);
            }
        },
        methods: {
            sxlbMoveIn() {
                this.sxlBlockShow = true;
            },
            sxlbMoveOut() {
                this.sxlBlockShow = false;
            },
            //鼠标按下开始横向拖动
            startLXDrag(event) {
                let obj = this, isMoveFlag = true, currClientX = event.clientX, currbolckleftHadVal = obj.bolckleftHadVal;
                window.onmousemove = function (ee) {
                    if(isMoveFlag) {
                        if(obj.leftHadVal > 0 && (ee.clientX - currClientX) < 0) {
                            obj.bolckleftHadVal = currbolckleftHadVal + ee.clientX - currClientX;
                        } else if(obj.leftHadVal < obj.localTotalVal && (ee.clientX - currClientX) > 0) {
                            obj.bolckleftHadVal = currbolckleftHadVal + ee.clientX - currClientX;
                        }
                    }
                },
                window.onmouseup = function () {//鼠标抬起事件————用于清除鼠标移动事件
                    isMoveFlag = false;
                    window.onmouseup = null;
                    window.onmousemove = null;
                }
            },
            //鼠标按下竖向拖动
            vstartLXDrag(event) {
                let obj = this, isMoveFlag = true, currClientY = event.clientY, currbolckTopHadVal = obj.bolckTopHadVal;
                window.onmousemove = function (ee) {
                    if(isMoveFlag) {
                        if(obj.topHadVal > 0 && (ee.clientY - currClientY) > 0) {
                            obj.bolckTopHadVal = currbolckTopHadVal - (ee.clientY - currClientY);
                        } else if(obj.topHadVal < obj.localTotalVal && (ee.clientY - currClientY) < 0) {
                            obj.bolckTopHadVal = currbolckTopHadVal - (ee.clientY - currClientY);
                        }
                    }
                },
                window.onmouseup = function () {//鼠标抬起事件————用于清除鼠标移动事件
                    isMoveFlag = false;
                    window.onmouseup = null;
                    window.onmousemove = null;
                }
            }
        },
        mounted() {
            let sliderObj = document.getElementById('slider'),
                sxlBlockObj = document.getElementById('sxlBlock'),
                vSliderObj = document.getElementById('vertSlider'),
                vsxlBlockObj = document.getElementById('vsxlBlock');
            this.bolckleftHadVal = sliderObj.offsetWidth * parseFloat(this.selVal) / parseFloat(this.localTotalVal);
            this.bolckTotalVal = sliderObj.offsetWidth;
            this.bolckTopHadVal = vSliderObj.offsetHeight * parseFloat(this.selVal) / parseFloat(this.localTotalVal);
            this.bolckToVtalVal = vSliderObj.offsetHeight;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .vert-div {
        height: 100%;
        margin-right: 50px;
        display: inline-block;
    }

    .slider,
    .vert-slider {
        width: 100%;
        height: 20px;
        border-radius: 5px;
        position: relative;
        background: var(--slider-bg);
    }

    .slider .sx-range {
        height: 20px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .blue .slider .sx-range,
    .blue .slider.s-reverse,
    .blue .vert-slider .vsx-range,
    .blue .vert-slider.vs-reverse {
        background: var(--blue);
    }

    .green2 .slider .sx-range,
    .green2 .slider.s-reverse,
    .green2 .vert-slider .vsx-range,
    .green2 .vert-slider.vs-reverse {
        background: var(--green2);
    }

    .yellow .slider .sx-range,
    .yellow .slider.s-reverse,
    .yellow .vert-slider .vsx-range,
    .yellow .vert-slider.vs-reverse {
        background: var(--yellow);
    }

    .orange .slider .sx-range,
    .orange .slider.s-reverse,
    .orange .vert-slider .vsx-range,
    .orange .vert-slider.vs-reverse {
        background: var(--orange);
    }

    .slider .sx-range.sx-reverse,
    .vert-slider .vsx-range.vsx-reverse {
        background: var(--slider-bg);
    }

    .slider .sxl-block,
    .vert-slider .vsxl-block {
        top: -7px;
        width: 16px;
        height: 34px;
        cursor: pointer;
        background: #fff;
        border-radius: 5px;
        position: absolute;
        border: 1px solid var(--border-color);
    }

    .sxl-block .sxlb-val,
    .vsxl-block .vsxlb-val {
        top: -30px;
        left: -43px;
        width: 100px;
        height: 20px;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        border-radius: 5px;
        position: absolute;
        background: var(--white);
        border: 1px solid var(--border-color);
    }

    .sxl-block .sxlb-val:before,
    .sxl-block .sxlb-val:after,
    .vsxl-block .vsxlb-val:before,
    .vsxl-block .vsxlb-val:after {
        width: 0;
        height: 0;
        top: 18px;
        left: 41px;
        content: '';
        border: 8px solid;
        position: absolute;
        border-color:  var(--border-color) transparent transparent;
    }

    .sxl-block .sxlb-val:after,
    .vsxl-block .vsxlb-val:after {
        top: 17px;
        border-color:  var(--white) transparent transparent;
    }

    .vert-slider {
        width: 20px;
        height: 100%;
    }

    .vert-slider .vsx-range {
        bottom: 0;
        width: 20px;
        position: absolute;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .vert-slider .vsxl-block {
        top: unset;
        left: -7px;
        width: 34px;
        height: 16px;
    }

    .vsxl-block .vsxlb-val {
       left: -34px; 
    }
</style>