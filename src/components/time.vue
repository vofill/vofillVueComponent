/**
**时间选择组件
**vofill
**2020-05-05
**/

<template>
    <div class="time">
        <input type="text" :value="inpVal" :placeholder="localPlaceholder" readonly="readonly" @focus="inputFocus" @blur="inputBlur" />
        <div class="t-box1" v-show="tbShow" @mousedown="tbMD" v-if="localType==1">
            <div class="tb-item" id="tbHour">
                <div class="tbi-item" v-for="(o, i) in hourArr" :key="i" v-show="thTimeShow[0]==o">{{o}}</div>
            </div>
            <div class="tb-item" id="tbMinute">
                <div class="tbi-item" v-for="(o, i) in minArr" :key="i" v-show="thTimeShow[1]==o">{{o}}</div>
            </div>
            <div class="tb-item" id="tbSecond">
                <div class="tbi-item" v-for="(o, i) in minArr" :key="i" v-show="thTimeShow[2]==o">{{o}}</div>
            </div>
        </div>
        <div class="t-box2" v-show="tbShow" @mousedown="tbMD" v-if="localType==2">
            <div class="tb-out">
                <div class="tbo-circle"></div>
                <div class="tbo-hour" v-show="timeType==1">
                    <span :class="['tboh-scale', {'active': o == parseInt(hourMin[0])}]" v-for="(o, i) in 23" :key="i" :style="hourScaleStyle(o)" @click="hourClick(2, o)">
                        <i :style="hourScaleTextStyle(o)">{{o}}</i>
                    </span>
                    <span :class="['tboh-scale', {'active': 0 == parseInt(hourMin[0])}]" :style="hourScaleStyle(0)" @click="hourClick(2, 0)">
                        <i :style="hourScaleTextStyle(0)">00</i>
                    </span>
                    <span class="tboh-line" :style="hourLineStyle"></span>
                </div>
                <div class="tbo-min" v-show="timeType==2">
                    <span :class="['tbom-scale', {'active': o == parseInt(hourMin[1])}]" v-for="(o, i) in 59" :key="i" :style="minuteScaleStyle(o)" @click="minuteClick(o)">
                        <i :style="minuteScaleTextStyle(o)">{{o}}</i>
                    </span>
                    <span :class="['tbom-scale', {'active': 0 == parseInt(hourMin[1])}]" :style="minuteScaleStyle(0)" @click="minuteClick(0)">
                        <i :style="minuteScaleTextStyle(0)">00</i>
                    </span>
                    <span class="tbom-line" :style="minuteLineStyle"></span>
                </div>
            </div>
            <div class="tb-foot">
                <div class="tbf-item">
                    <span>时：</span><span class="tbfi-span" @click="hourClick(1, parseInt(hourMin[0]))">{{hourMin[0]}}</span>
                </div>
                <div class="tbf-item">
                    <span>分：</span><span class="tbfi-span" @click="minuteClick(parseInt(hourMin[1]))">{{hourMin[1]}}</span>
                </div>
                <div class="tbf-item">
                    <span class="tbfi-ok" @click="timeOk(2)">确定</span>
                </div>
            </div>
        </div>
        <div class="t-box3" v-show="tbShow" @mousedown="tbMD" v-if="localType==3">
            <div class="tb-out">
                <div class="tbo-circle"></div>
                <div :class="['tb-point-h', {'active': timeType == 1}]" :style="{'transform': 'rotate(' + pointHDeg + 'deg)'}"></div>
                <div :class="['tb-point-m', {'active': timeType == 2}]" :style="{'transform': 'rotate(' + pointMDeg + 'deg)'}"></div>
                <div class="tb-show-time">
                    <span :class="[{'active': timeType == 1}]" @click="timeType=1,fingerDeg=pointHDeg">{{timeArr[0]}}</span>
                    <span class="colon">:</span>
                    <span :class="[{'active': timeType == 2}]" @click="timeType=2,fingerDeg=pointMDeg">{{timeArr[1]}}</span>
                </div>
                <div class="tb-finger" :style="{'transform': 'rotate(' + fingerDeg + 'deg)'}">
                    <div class="tbf-img" @mousedown="startAdjustTime"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vofill-time",
        props: {              //prop接收传过来的参数
            "type": Number,
            "selVal": String,
            "selObj": Object,
            "selKey": String,
            "placeholder": String
        },
        data () {
            return {
                timeArr: [22, 46],
                timeType: 1,
                tbShow: false,
                fingerDeg: 0,
                pointHDeg: 0,
                pointMDeg: 0,
                tbmdFlag: false,
                isMoveFlag: false,
                thTimeShow: ["00", "00", "00"],
                hourMin: [],
                localType: this.type ? this.type : 1,
                localPlaceholder: this.placeholder && this.placeholder.length > 0 ? "--" + this.placeholder + "--" : "--请选择--"
            }
        },
        computed:{
            selValTemp: {
                get() {
                    return this.selVal;
                },
                set(val) {
                    //selValTemp改变由父组件控制
                    this.$emit("onChangeSelval", val);
                }
            },
            inpVal() {
                if(this.selObj && this.selKey) {
                    return this.selObj[this.selKey];
                } else if(this.selValTemp) {
                    return this.selValTemp;
                } else {
                    return "";
                }
            },
            hourArr() {
                let arr = [];
                for(let i = 0; i < 24; i++) {
                    arr.push(i < 10 ? "0" + i : i);
                }
                return arr;
            },
            minArr() {
                let arr = [];
                for(let i = 0; i < 60; i++) {
                    arr.push(i < 10 ? "0" + i : i);
                }
                return arr;
            },
            //时指针样式
            hourLineStyle() {
                let currHour = parseInt(this.hourMin[0]), scale = currHour < 13 ? currHour : currHour - 12, rotate = (scale - 1) * 30 - 60, width = currHour < 13 ? 78 : 48;
                return {transform:"rotate(" + rotate + "deg)", width: width + "px"}
            },
            //分钟指针样式
            minuteLineStyle() {
                let currMin = parseInt(this.hourMin[1]);
                return {transform:"rotate(" + (currMin * 6 - 90) + "deg)"}
            },
        },
        created() {
            this.getDefaultTime();
        },
        methods: {
            //获取默认时间
            getDefaultTime() {
                let currValArr = [];
                if(this.selObj && this.selKey) {
                    currValArr = this.selObj[this.selKey].split(":");
                } else if(this.selValTemp && this.selValTemp.length > 0) {
                    currValArr = this.selValTemp.split(":");
                } else {
                    let currDate = new Date();
                    currValArr = [(currDate.getHours() < 10 ? "0" + currDate.getHours() : currDate.getHours() + ""), 
                                  (currDate.getMinutes() < 10 ? "0" + currDate.getMinutes() : currDate.getMinutes() + ""),
                                  (currDate.getSeconds() < 10 ? "0" + currDate.getSeconds() : currDate.getSeconds() + "")]
                }
                if(this.localType == 1) {
                    this.$set(this.thTimeShow, 0, currValArr[0] ? currValArr[0] : "00");
                    this.$set(this.thTimeShow, 1, currValArr[1] ? currValArr[1] : "00");
                    this.$set(this.thTimeShow, 2, currValArr[2] ? currValArr[2] : "00");
                } else if(this.localType == 2) {
                    this.$set(this.hourMin, 0, currValArr[0] ? currValArr[0] : 0);
                    this.$set(this.hourMin, 1, currValArr[1] ? currValArr[1] : 0);
                }
            },
            checkDomMouseScroll() {
                //时节点鼠标滚动
                var tbHourScroll = document.getElementById('tbHour');
                this.createMouseScrollEventListener(0, tbHourScroll);
                //分节点鼠标滚动
                var tbMinScroll = document.getElementById('tbMinute');
                this.createMouseScrollEventListener(1, tbMinScroll);
                //分节点鼠标滚动
                var tbSecScroll = document.getElementById('tbSecond');
                this.createMouseScrollEventListener(2, tbSecScroll);
            },
            //创建鼠标滚轮监听
            createMouseScrollEventListener(type, domObj) {
                let obj = this;
                domObj.addEventListener('DOMMouseScroll', function(event) {
                    let delta = 0;
                    if(!event) {
                        event = window.event;
                    }
                    if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
                        delta = event.wheelDelta/120; 
                        if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
                    } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
                        delta = -event.detail/3;
                    }
                    if(delta) {
                        let currVal = 0;
                        if(delta < 0) {//向下滚动
                            currVal = obj.thTimeShow[type] - ((obj.thTimeShow[type] < (type==0 ? 23 : 59)) ? delta : 0)
                        } else {//向上滚动
                            currVal = obj.thTimeShow[type] - (obj.thTimeShow[type] > 0 ? delta : 0)
                        }
                        obj.$set(obj.thTimeShow, type, currVal < 10 ? "0" + currVal : currVal);
                        obj.timeOk(1);
                    }
                });
            },
            //input获取焦点
            inputFocus() {
                this.tbShow = true;
            },
            //input失去焦点
            inputBlur() {
                if(!this.tbmdFlag) {
                    this.tbShow = false;
                }
            },
            //下拉列表框鼠标按下事件
            tbMD() {
                this.tbmdFlag = true;
            },
            timeOk(type) {
                if(type == 1) {
                    if(this.selObj && this.selKey) {
                        this.selObj[this.selKey] = this.thTimeShow.join(":");
                        this.$emit('update',this.selObj[this.selKey],this.thTimeShow.join(":"));
                    } else if(this.selValTemp) {
                        this.selValTemp = this.thTimeShow.join(":");
                    }
                } else if(this.type == 2) {
                    if(this.selObj && this.selKey) {
                        this.selObj[this.selKey] = this.hourMin.join(":");
                        this.$emit('update',this.selObj[this.selKey],this.hourMin.join(":"));
                    } else if(this.selValTemp) {
                        this.selValTemp = this.hourMin.join(":");
                    }
                    this.timeType = 1;
                    this.tbShow = false;
                    this.tbmdFlag = false;
                }
            },
            //时刻度样式
            hourScaleStyle(num) {
                let scale = num < 13 ? (num == 0 ? 12 : num) : num - 12, rotate = scale * 30 - 90, translate = num < 13 && num > 0 ? 92 : 62;
                return {transform:"rotate(" + rotate + "deg) translate(" + translate + "px)"}
            },
            //时刻度显示样式
            hourScaleTextStyle(num) {
                let scaleText = num < 13 ? (num == 0 ? 12 : num) : num - 12, rotate = 60 - (scaleText - 1) * 30;
                return {transform:"rotate(" + rotate + "deg)"}
            },
            //时点击事件
            hourClick(type, num) {
                this.timeType = type;
                this.hourMin = [(num < 10 ? "0" + num : num), this.hourMin[1]];
            },
            //分钟刻度样式
            minuteScaleStyle(num) {
                return {transform:"rotate(" + (num * 6 - 90) + "deg) translate(82px)"}
            },
            //分钟刻度显示样式
            minuteScaleTextStyle(num) {
                return {transform:"rotate(" + (90 - num * 6) + "deg)"}
            },
            //分钟点击事件
            minuteClick(num) {
                this.timeType = 2;
                this.hourMin = [this.hourMin[0], (num < 10 ? "0" + num : num)];
            },
            //开始旋转调整时间
            startAdjustTime(e) {
                console.log("1111111111111111")
                var obj = this;
                let xx = 0,yy = 0;
                let xArr = [],yArr = [];
                xArr[0] = e.clientX/2;//获取鼠标点击屏幕时的坐标
                yArr[0] = e.clientY/2;
                
                obj.isMoveFlag = true;
                window.onmousemove = function (ee) {
                    if(obj.isMoveFlag) {
                        xArr[1] = ee.clientX/2;//获取鼠标移动时第一个点的坐标   
                        yArr[1] = ee.clientY/2;
                        var angle = Math.atan2(yArr[1] - yArr[0], xArr[1] - xArr[0]) * 180 / (Math.PI);
                        //var angle = obj.getDragAngle(ee);
                        //angle = -(angle/(Math.PI/180)-180);
                        if(obj.timeType == 1) {
                            obj.pointHDeg = obj.fingerDeg = angle;
                        } else if(obj.timeType == 2) {
                            obj.pointMDeg = obj.fingerDeg = angle;
                        }
                    }
                },
                window.onmouseup = function () {//鼠标抬起事件————用于清除鼠标移动事件
                    obj.isMoveFlag = false;
                    window.onmouseup = null;
                    window.onmousemove = null;
                }
            }
        },
        mounted() {
            if(this.localType == 1) {
                this.checkDomMouseScroll();
            }
        },
        watch: {
            inpVal(nv) {
                this.getDefaultTime();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .time {
        position: relative;
        color: var(--font-color);
    }

    .time:before {
        width: 1px;
        right: 40px;
        content: "";
        height: 100%;
        position: absolute;
        background: var(--border-color);
    }

    .time:after {
        top: 10px;
        right: 10px;
        content: "";
        width: 20px;
        height: 20px;
        position: absolute;
        background: url("../assets/time.png")
    }

    .time input {
        cursor: pointer;
    }

    .time .t-box1,
    .time .t-box2,
    .time .t-box3 {
        z-index: 10;
        width: 260px;
        height: 260px;
        margin-top: 2px;
        position: absolute;
        top: var(--input-border);
        background: var(--white);
        border: 1px solid var(--border-color);
    }

    .time .t-box1 {
        width: 300px;
        height: 40px;
        display: flex;
        border: 1px solid var(--border-color);
    }

    .t-box2 .tb-out,
    .t-box3 .tb-out {
        width: 220px;
        height: 220px;
        margin: 20px auto;
        border-radius: 50%;
        position: relative;
        border: 1px solid var(--border-color);
    }

    .tb-out .tbo-circle {
        top: 50%;
        left: 50%;
        z-index: 11;
        width: 10px;
        height: 10px;
        margin-top: -5px;
        margin-left: -5px;
        border-radius: 5px;
        position: absolute;
        background: var(--grey);
    }

    .tb-out .tb-point-h {
        top: 25%;
        left: 50%;
        width: 4px;
        height: 50px;
        margin-left: -2px;
        position: absolute;
        background: var(--grey);
        transform: rotate(0deg);
        transform-origin: bottom center;
    }

    .tb-out .tb-point-m {
        top: 18%;
        left: 50%;
        width: 2px;
        height: 65px;
        margin-left: -1px;
        position: absolute;
        background: var(--grey);
        transform: rotate(20deg);
        transform-origin: bottom center;
    }

    .tb-out .tb-point-h.active,
    .tb-out .tb-point-m.active {
        background: var(--blue);
    }

    .tb-out .tb-show-time {
        top: 50%;
        left: 50%;
        width: 140px;
        height: 80px;
        display: flex;
        font-size: 40px;
        margin-top: -40px;
        position: absolute;
        margin-left: -70px;
    }

    .tb-show-time span {
        width: 100%;
        display: block;
        cursor: pointer;
        line-height: 80px;
        text-align: center;
    }

    .tb-show-time span.colon {
        width: 30px;
        cursor: unset;
        line-height: 70px;
    }

    .tb-show-time span.active {
        color: var(--blue);
    }

    .tb-out .tb-finger {
        top: 0;
        left: 50%;
        width: 20px;
        height: 100px;
        margin-left: -10px;
        position: absolute;
        transform: rotate(0deg);
        transform-origin: bottom center;
    }

    .tb-finger .tbf-img {
        width: 20px;
        height: 20px;
        cursor: pointer;
        background: url("../assets/finger2.png");
    }

    .tb-finger .tbf-img:hover {
        background: url("../assets/finger1.png");
    }

    .t-box1 .tb-item {
        width: 100px;
        padding: 1px 0;
        border-right: 1px solid var(--border-color);
    }

    .t-box1 .tb-item.tb-ok {
        border-right: none;
    }

    .tb-item .tbi-item {
        width: 100px;
        height: 38px;
        cursor: pointer;
        line-height: 38px;
        text-align: center;
    }

    .tb-item .tbi-ok {
        cursor: pointer;
        line-height: 38px;
        text-align: center;
    }

    .time .t-box2 {
        height: 301px;
    }

    .t-box2 .tb-out .tbo-circle {
        background: var(--blue);
    }

    .t-box2 .tb-out .tbo-hour,
    .t-box2 .tb-out .tbo-min {
        top: 50%;
        left: 50%;
        margin-top: -15px;
        margin-left: -15px;
        position: absolute;
    }

    .tbo-hour .tboh-scale,
    .tbo-min .tbom-scale {
        width: 30px;
        height: 30px;
        cursor: pointer;
        position: absolute;
        border-radius: 15px;
        transform-origin: center center;
    }

    .tbo-hour .tboh-scale:hover {
        background: var(--clock-hover);
    }

    .tbo-hour .tboh-scale.active {
        color: var(--white);
        background: var(--blue);
    }

    .tboh-scale i,
    .tbom-scale i {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        position: absolute;
        transform-origin: center center;
    }

    .tbo-hour .tboh-line,
    .tbo-min .tbom-line {
        top: 15px;
        left: 15px;
        height: 1px;
        position: absolute;
        background: var(--blue);
        transform-origin: left top;
    }

    .t-box2 .tb-out .tbo-min {
        margin-top: -5px;
        margin-left: -14px;
    }

    .tbo-min .tbom-scale {
        width: 28px;
        height: 10px;
        font-size: 0;
        line-height: 10px;
    }

    .tbo-min .tbom-scale:before {
        top: 3px;
        left: 12px;
        width: 4px;
        height: 4px;
        content: "";
        z-index: 20;
        border-radius: 2px;
        position: absolute;
        pointer-events: none;
        background: var(--clock-hover);
    }

    .tbo-min .tbom-scale:after {
        left: 0;
        top: -9px;
        content: "";
        z-index: -1;
        width: 28px;
        height: 28px;
        position: absolute;
        border-radius: 14px;
        pointer-events: none;
    }

    .tbo-min .tbom-scale:hover {
        z-index: 17;
    }

    .tbo-min .tbom-scale:hover:after {
        z-index: 1;
        background: rgba(0,0,0,0.1);
    }

    .tbo-min .tbom-scale.active,
    .tbo-min .tbom-scale.active:hover {
        color: var(--blue);
    }

    .tbo-min .tbom-scale.active:before,
    .tbo-min .tbom-scale:hover:before {
        background: var(--blue);
    }

    .tbo-min .tbom-scale:nth-child(5n) {
        font-size: 14px;
    }

    .tbo-min .tbom-scale:nth-child(5n):before {
        width: 8px;
    }

    .tbom-scale i {
        z-index: 19;
        width: 28px;
        height: 10px;
        line-height: 10px;
        margin-left: 14px;
        pointer-events: none;
    }

    .tbo-min .tbom-line {
        top: 5px;
        left: 14px;
        width: 82px;
    }

    .t-box2 .tb-foot {
        height: 40px;
        display: flex;
        border-top: 1px solid var(--border-color);
    }

    .tb-foot .tbf-item {
        width: 33.3%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tbf-item .tbfi-span {
        width: 30px;
        cursor: pointer;
        color: var(--blue);
        text-align: center;
        border-bottom: 1px solid var(--blue);
    }

    .tbfi-ok {
        cursor: pointer;
    }
</style>
