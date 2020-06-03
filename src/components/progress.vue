/**
**进度条组件
**vofill
**2020-05-14
**/

<template>
    <div class="progress">
        <template v-if="localType == 1 || localType == 8 || localType == 9">
            <div :class="['p-bar1', {'p-bar1-gradient': localType == 8}, {'p-bar1-gradient-animation': localType == 9}]">
                <div class="pb1-bg" :style="finishStyle1">
                    <span></span>
                </div>
                <div class="pb1-val" :style="finishValStyle1">已完成：{{currVal}}%</div>
            </div>
        </template>
        <template v-else-if="localType == 2">
            <div class="p-bar2">
                <div class="pb2-bg" :style="finishStyle1"></div>
                <div class="pb2-val" :style="finishValStyle1">已完成：{{currVal}}%</div>
            </div>
        </template>
        <template v-else-if="localType == 3">
            <div class="p-bar2 p-bar2-animation">
                <div class="pb2-bg" :style="finishStyle1"></div>
                <div class="pb2-val" :style="finishValStyle1">已完成：{{currVal}}%</div>
            </div>
        </template>
        <template v-else-if="localType == 4">
            <div class="p-bar3">
                <div class="pb3-bg" :style="finishStyle3"></div>
                <div class="pb3-val">{{currVal}}%</div>
            </div>
            <div style="font-size: 14px; text-align: center;">该方式只支持Chrome浏览器</div>
        </template>
        <template v-else-if="localType == 5 || localType == 6 || localType == 7">
            <div :class="['p-bar4', {'p-bar4-crude': localType == 6}, {'p-bar4-fine': localType == 7}]">
                <div class="pb4-bg1" :style="finishStyle4[0]"></div>
                <div class="pb4-bg2" :style="finishStyle4[1]"></div>
                <div class="pb4-bg3" v-if="localType == 6 || localType == 7"></div>
                <div class="pb4-val">{{currVal}}%</div>
            </div>
        </template>
        <template v-else-if="localType == 10">
            <div class="p-bar5">
                <canvas id="pb-canvas">当前浏览器不支持canvas 请升级！</canvas>
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
                currVal: 0,
                currPercent: 0,
                localType: this.type ? this.type : 1,
                localHadVal: this.selVal ? this.selVal : 0,
                localTotalVal: this.totalVal ? this.totalVal : 0
            }
        },
        created() {
        },
        computed:{
            finishStyle1() {
                return {width: (this.currPercent * 100) + "%"}
            },
            finishValStyle1() {
                return {left: (this.currPercent * 100 - 3.3) + "%"}
            },
            finishStyle3() {
                return {background: "conic-gradient(var(--blue) 0%, var(--blue) " + (this.currPercent * 100) +  "%, var(--slider-bg) 0%, var(--slider-bg) 100%)"}
            },
            finishStyle4() {
                var transform1 = 0, styleTemp = {};
                if(this.currPercent <= 0.5) {
                    transform1 = 0;
                    styleTemp = {transform: "rotate(" + (180 + 360  * this.currPercent) + "deg)", background: "var(--slider-bg)"};
                } else {
                    styleTemp = {transform: "rotate(" + (360  * this.currPercent) + "deg)", background: "var(--blue)"};
                }
                return [{transform: "rotate(" + transform1 + "deg)"}, styleTemp];
            }
        },
        methods: {
            //定时更新进度值
            updateProgressVal() {
                let obj = this;
                obj.currVal = 0;
                if(this.localType == 10) {
                } else {
                    var timer = setInterval(function () {
                        if(obj.currVal < obj.localHadVal){
                            obj.currVal += 1;
                            obj.currPercent = vofill.changeDecimal(2, (obj.currVal/obj.localTotalVal));
                        } else {
                            clearInterval(timer);
                        }
                    },100);
                }
                
            },
            //开始用画布(canvas)画水波进度
            drawCanvasBar() {
                var canvas = document.getElementById("pb-canvas");
                this.ctx  = canvas.getContext("2d");
                this.Sin = Math.sin;
                this.Cos = Math.cos;
                this.Sqrt = Math.sqrt, this.Pow = Math.pow, this.PI = Math.PI, this.Round = Math.round;
                this.oW = canvas.width = 200;
                this.oH = canvas.height = 200;
                // 线宽
                var lineWidth = 2;
                // 大半径
                this.r = (this.oW / 2);
                this.cR = this.r - 10 * lineWidth;
                this.ctx.beginPath();
                this.ctx.lineWidth = lineWidth;
                // 水波动画初始参数
                this.axisLength = 2 * this.r - 16 * lineWidth;  // this.Sin 图形长度
                this.unit = this.axisLength / 9; // 波浪宽
                this.range = 0.4 // 浪幅
                this.nowrange = this.range; 
                this.xoffset = 8 * lineWidth; // x 轴偏移量
                this.data = this.localHadVal / 100;  // 数据量
                this.sp = 0; // 周期偏移量
                this.nowdata = 0;
                this.waveupsp = 0.001; // 水波上涨速度
                // 圆动画初始参数
                var arcStack = [];  // 圆栈
                var bR = this.r - 8 * lineWidth;
                var soffset = -(this.PI/2); // 圆动画起始位置
                var circleLock = true; // 起始动画锁
                // 获取圆动画轨迹点集
                for(var i = soffset; i < soffset + 2 * this.PI; i += 1 / ( 8 * this.PI)) {
                    arcStack.push([this.r + bR * this.Cos(i), this.r + bR * this.Sin(i)]);
                }
                // 圆起始点
                var cStartPoint = arcStack.shift(); 
                this.ctx.strokeStyle = "#ffffff";
                this.ctx.moveTo(cStartPoint[0], cStartPoint[1]);
                // 开始渲染
                this.render();
            },
            //渲染canvas
            render () {
                var obj = this;
                obj.ctx.clearRect(0, 0, obj.oW, obj.oH);
                //最外面淡黄色圈
                obj.drawCircle();
                //灰色圆圈
                obj.grayCircle();
                //橘黄色进度圈
                obj.orangeCircle();
                //裁剪中间水圈
                obj.clipCircle();
                //控制波幅
                obj.data = obj.localHadVal / 100;
                
                if (obj.data >= 0.85) {
                    if (obj.nowrange > obj.range / 4) {
                        var t = obj.range * 0.01;
                        obj.nowrange -= t; 
                    }
                } else if (obj.data <= 0.1) {
                    if (obj.nowrange < obj.range*1.5) {
                        var t = obj.range * 0.01;
                        obj.nowrange += t; 
                    }
                } else {
                    if (obj.nowrange <= obj.range) {
                        var t = obj.range * 0.01;
                        obj.nowrange += t; 
                    }
                    if (obj.nowrange >= obj.range) {
                        var t = obj.range * 0.01;
                        obj.nowrange -= t;
                    }
                }
                if((obj.data - obj.nowdata) > 0) {
                    obj.nowdata += obj.waveupsp;
                }
                if((obj.data - obj.nowdata) < 0){
                    obj.nowdata -= obj.waveupsp
                }
                obj.sp += 0.07;
                // 开始水波动画
                obj.drawSine();
                // 写字
                obj.drawText();
                obj.rafTimer = window.requestAnimationFrame(obj.render);
            },
            //画外圆环
            drawCircle() {
                this.ctx.beginPath();
                this.ctx.lineWidth = 15;
                this.ctx.strokeStyle = '#3981e3';
                this.ctx.arc(this.r, this.r, this.cR + 7, 0, 2 * Math.PI);
                this.ctx.stroke();
                this.ctx.restore();
            },
            //内圆环背景
            grayCircle(){
                this.ctx.beginPath();
                this.ctx.lineWidth = 6;
                this.ctx.strokeStyle = '#eeeeee';
                this.ctx.arc(this.r, this.r, this.cR-5, 0, 2 * Math.PI);
                this.ctx.stroke();
                this.ctx.restore();
                this.ctx.beginPath();
            },
            //内圆环进度
            orangeCircle(){
                this.ctx.beginPath();
                this.ctx.strokeStyle = '#3981e3';
                //使用这个使圆环两端是圆弧形状
                this.ctx.lineCap = 'round';
                this.ctx.arc(this.r, this.r, this.cR-5, 0 * (Math.PI / 180.0) - (Math.PI / 2),(this.nowdata * 360) * (Math.PI / 180.0) - (Math.PI / 2));
                this.ctx.stroke();
                this.ctx.save()
            },
            clipCircle(){
                this.ctx.beginPath();
                this.ctx.arc(this.r, this.r, this.cR-15, 0, 2 * Math.PI,false);
                this.ctx.clip();
            },
            //画水波纹
            drawSine () {
                this.ctx.beginPath();
                this.ctx.save();
                var Stack = []; // 记录起始点和终点坐标
                for (var i = this.xoffset; i <= this.xoffset + this.axisLength; i+=20/this.axisLength) {
                    var x = this.sp + (this.xoffset + i) / this.unit;
                    var y = this.Sin(x) * this.nowrange;
                    var dx = i;
                    var dy = 2*this.cR*(1-this.nowdata) + (this.r - this.cR) - (this.unit * y);
                    this.ctx.lineTo(dx, dy);
                    Stack.push([dx,dy])
                }
                // 获取初始点和结束点
                var startP = Stack[0]
                var endP = Stack[Stack.length - 1]
                this.ctx.lineTo(this.xoffset + this.axisLength, this.oW);
                this.ctx.lineTo(this.xoffset, this.oW);
                this.ctx.lineTo(startP[0], startP[1])
                this.ctx.fillStyle = "#3981e3";
                this.ctx.fill();
                this.ctx.restore();
            },
            drawText () {
                this.ctx.globalCompositeOperation = 'source-over';
                //var size = 0.2*this.cR;
                //this.ctx.font = 'bold ' + size + 'px Microsoft Yahei';
                //var fonty = this.r + size/2;
                //var fontx = this.r - size * 0.8;
                this.ctx.font = '30px Microsoft Yahei';
                var currValTemp = (this.nowdata.toFixed(2)*100).toFixed(0);
                this.ctx.fillStyle = "#ffffff";
                this.ctx.textAlign = 'center';
                this.ctx.fillText(currValTemp+ "%", this.r+5,this. r+5);
                if(currValTemp >= this.localHadVal) {
                    window.cancelAnimationFrame(this.rafTimer);
                }
            }

        },
        mounted() {
            if(this.localType == 10) {
                this.drawCanvasBar();
            } else {
                this.updateProgressVal();
            }
        },
        wacth: {
            type(nv) {
                this.localType = nv;
            },
            selVal(nv) {
                this.localHadVal = nv;
                this.updateProgressVal();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .progress {
        width: 100%;
        height: 100%;
    }

    .progress .p-bar1,
    .progress .p-bar2,
    .progress .p-bar7 {
        width: 100%;
        height: 20px;
        border-radius: 5px;
        position: relative;
        background: var(--slider-bg);
    }

    .p-bar1 .pb1-bg {
        width: 20%;
        height: 20px;
        border-radius: 5px;
        transition: all 0.5s;
    }

    .p-bar1.p-bar1-gradient .pb1-bg,
    .p-bar1.p-bar1-gradient-animation .pb1-bg {
        background: -webkit-linear-gradient(left, var(--blue) , var(--orange)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, var(--blue) , var(--orange)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, var(--blue) , var(--orange)); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, var(--blue) , var(--orange)); /* 标准的语法 */
    }

    .p-bar1.p-bar1-gradient-animation .pb1-bg {
        position: relative;
    }

    .p-bar1.p-bar1-gradient-animation .pb1-bg span {
        top: 0;
        left: 0;
        width: 100%;
        height: 64px;
        opacity: 0.5;
        display: block;
        position: absolute;
        border-radius: 16px;
        background: url("../assets/progress-animation1.png") 0 0;
        animation: gradient 1000ms linear infinite;
        -o-animation: gradient 1000ms linear infinite;
        -moz-animation: gradient 1000ms linear infinite;
        -webkit-animation: gradient 1000ms linear infinite;
    }

    @keyframes gradient {
        0% {
            background-position: -110px 0;
        }
        100% {
            background-position: 0 0;
        }
    }

    .p-bar1 .pb1-val,
    .p-bar2 .pb2-val {
        top: -30px;
        left: -3.3%;
        width: 100px;
        height: 20px;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        border-radius: 5px;
        position: absolute;
        transition: all 0.5s;
        background: var(--white);
        border: 1px solid var(--border-color);
    }

    .p-bar1 .pb1-val:before,
    .p-bar1 .pb1-val:after,
    .p-bar2 .pb2-val:before,
    .p-bar2 .pb2-val:after, {
        width: 0;
        height: 0;
        top: 18px;
        left: 41px;
        content: '';
        border: 8px solid;
        position: absolute;
        border-color:  var(--border-color) transparent transparent;
    }

    .p-bar1 .pb1-val:after,
    .p-bar2 .pb2-val:after {
        top: 17px;
        border-color:  var(--white) transparent transparent;
    }

    .blue .pb1-bg {
        background: var(--blue);
    }

    .yellow .pb1-bg {
        background: var(--yellow);
    }

    .orange .pb1-bg {
        background: var(--orange);
    }

    .green .pb1-bg {
        background: var(--green);
    }

    .green2 .pb1-bg {
        background: var(--green2);
    }

    .progress .p-bar2 {
        box-shadow: 0 0 5px 0px #ddd inset;
    }

    .p-bar2 .pb2-bg {
        color:#fff;
        width: 100%;
        height: 100%;
        text-align: center;
        border-radius: 5px;
        transition: all 0.5s;
        display: inline-block;
    }

    .p-bar2.p-bar2-animation .pb2-bg {
        animation: static 1000ms linear infinite;
        -o-animation: static 1000ms linear infinite;
        -moz-animation: static 1000ms linear infinite;
        -webkit-animation: static 1000ms linear infinite;
    }

    @keyframes static {
        0% {
            background-position: -60px 0;
        }
        100% {
            background-position: 0 0;
        }
    }

    .blue .pb2-bg  {
        background: var(--blue); /* Old browsers */
        background: -moz-linear-gradient(45deg, var(--blue) 33%, #7db9e8 34%, #7db9e8 59%, var(--blue) 60%); /* FF3.6+ */
        background: -webkit-gradient(linear, left bottom, right top, color-stop(33%,var(--blue)), color-stop(34%,#7db9e8), color-stop(59%,#7db9e8), color-stop(60%,var(--blue))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(45deg, var(--blue) 33%,#7db9e8 34%,#7db9e8 59%,var(--blue) 60%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(45deg, var(--blue) 33%,#7db9e8 34%,#7db9e8 59%,var(--blue) 60%); /* Opera 11.10+ */
        background: -ms-linear-gradient(45deg, var(--blue) 33%,#7db9e8 34%,#7db9e8 59%,var(--blue) 60%); /* IE10+ */
        background: linear-gradient(45deg, var(--blue) 33%,#7db9e8 34%,#7db9e8 59%,var(--blue) 60%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='var(--blue)', endColorstr='var(--blue)',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        background-size: 60px 30px;
    }

    .yellow .pb2-bg  {
        background: var(--yellow); /* Old browsers */
        background: -moz-linear-gradient(45deg, var(--yellow) 33%, #7db9e8 34%, #7db9e8 59%, var(--yellow) 60%); /* FF3.6+ */
        background: -webkit-gradient(linear, left bottom, right top, color-stop(33%,var(--yellow)), color-stop(34%,#7db9e8), color-stop(59%,#7db9e8), color-stop(60%,var(--yellow))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(45deg, var(--yellow) 33%,#7db9e8 34%,#7db9e8 59%,var(--yellow) 60%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(45deg, var(--yellow) 33%,#7db9e8 34%,#7db9e8 59%,var(--yellow) 60%); /* Opera 11.10+ */
        background: -ms-linear-gradient(45deg, var(--yellow) 33%,#7db9e8 34%,#7db9e8 59%,var(--yellow) 60%); /* IE10+ */
        background: linear-gradient(45deg, var(--yellow) 33%,#7db9e8 34%,#7db9e8 59%,var(--yellow) 60%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='var(--yellow)', endColorstr='var(--yellow)',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        background-size: 60px 30px;
    }
    
    .orange .pb2-bg  {
        background: var(--orange); /* Old browsers */
        background: -moz-linear-gradient(45deg, var(--orange) 33%, #7db9e8 34%, #7db9e8 59%, var(--orange) 60%); /* FF3.6+ */
        background: -webkit-gradient(linear, left bottom, right top, color-stop(33%,var(--orange)), color-stop(34%,#7db9e8), color-stop(59%,#7db9e8), color-stop(60%,var(--orange))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(45deg, var(--orange) 33%,#7db9e8 34%,#7db9e8 59%,var(--orange) 60%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(45deg, var(--orange) 33%,#7db9e8 34%,#7db9e8 59%,var(--orange) 60%); /* Opera 11.10+ */
        background: -ms-linear-gradient(45deg, var(--orange) 33%,#7db9e8 34%,#7db9e8 59%,var(--orange) 60%); /* IE10+ */
        background: linear-gradient(45deg, var(--orange) 33%,#7db9e8 34%,#7db9e8 59%,var(--orange) 60%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='var(--orange)', endColorstr='var(--orange)',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        background-size: 60px 30px;
    }

    .green .pb2-bg  {
        background: var(--green); /* Old browsers */
        background: -moz-linear-gradient(45deg, var(--green) 33%, #7db9e8 34%, #7db9e8 59%, var(--green) 60%); /* FF3.6+ */
        background: -webkit-gradient(linear, left bottom, right top, color-stop(33%,var(--green)), color-stop(34%,#7db9e8), color-stop(59%,#7db9e8), color-stop(60%,var(--green))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(45deg, var(--green) 33%,#7db9e8 34%,#7db9e8 59%,var(--green) 60%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(45deg, var(--green) 33%,#7db9e8 34%,#7db9e8 59%,var(--green) 60%); /* Opera 11.10+ */
        background: -ms-linear-gradient(45deg, var(--green) 33%,#7db9e8 34%,#7db9e8 59%,var(--green) 60%); /* IE10+ */
        background: linear-gradient(45deg, var(--green) 33%,#7db9e8 34%,#7db9e8 59%,var(--green) 60%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='var(--green)', endColorstr='var(--green)',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        background-size: 60px 30px;
    }
    
    .green2 .pb2-bg  {
        background: var(--green2); /* Old browsers */
        background: -moz-linear-gradient(45deg, var(--green2) 33%, #7db9e8 34%, #7db9e8 59%, var(--green2) 60%); /* FF3.6+ */
        background: -webkit-gradient(linear, left bottom, right top, color-stop(33%,var(--green2)), color-stop(34%,#7db9e8), color-stop(59%,#7db9e8), color-stop(60%,var(--green2))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(45deg, var(--green2) 33%,#7db9e8 34%,#7db9e8 59%,var(--green2) 60%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(45deg, var(--green2) 33%,#7db9e8 34%,#7db9e8 59%,var(--green2) 60%); /* Opera 11.10+ */
        background: -ms-linear-gradient(45deg, var(--green2) 33%,#7db9e8 34%,#7db9e8 59%,var(--green2) 60%); /* IE10+ */
        background: linear-gradient(45deg, var(--green2) 33%,#7db9e8 34%,#7db9e8 59%,var(--green2) 60%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='var(--green2)', endColorstr='var(--green2)',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        background-size: 60px 30px;
    }

    .progress .p-bar3,
    .progress .p-bar4 {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        position: relative;
        background: var(--slider-bg);
    }

    .p-bar3 .pb3-bg {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }

    .progress .p-bar4 {
        background: var(--blue);
    }

    .p-bar4 .pb4-bg1,
    .p-bar4 .pb4-bg2 {
        width: 200px;
        height: 200px;
        position: absolute;
        clip: rect(0px,100px,200px,0px); /*这个clip属性用来绘制半圆，在clip的rect范围内的内容显示出来，使用clip属性，元素必须是absolute的 */
        border-radius: 100px;
        background: var(--slider-bg);
    }

    .p-bar4 .pb4-bg3 {
        top: 50%;
        left: 50%;
        border-radius: 50%;
        position: absolute;
        background:var(--white);
    }

    .p-bar4.p-bar4-crude .pb4-bg3 {
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
    }

    .p-bar4.p-bar4-fine .pb4-bg3 {
        width: 160px;
        height: 160px;
        margin-top: -80px;
        margin-left: -80px;
    }

    .p-bar3 .pb3-val,
    .p-bar4 .pb4-val {
        top: 50%;
        left: 50%;
        width: 80px;
        height: 80px;
        font-size: 30px;
        line-height: 80px;
        text-align: center;
        margin-top: -40px;
        margin-left: -40px;
        position: absolute;
        color: var(--white);
    }

    .p-bar4.p-bar4-crude .pb4-val,
    .p-bar4.p-bar4-fine .pb4-val {
        color: var(--blue);
    }
    
    .progress .p-bar5 {
        display: flex;
        align-items: center;
        flex-flow: column wrap;
        justify-content: center;
    }
</style>
