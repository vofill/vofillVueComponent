/**
**日期选择组件
**vofill
**2020-05-04
**/

<template>
    <div class="date">
        <input type="text" :value="inpVal" :placeholder="localPlaceholder" readonly="readonly" @focus="inputFocus" @blur="inputBlur" />
        <div class="d-list" v-show="dlShow" @mousedown="dlMD">
            <div class="dl-yy-mm">
                <i class="i-icon prev-yy" @click="prevYYClick()"></i>
                <i class="i-icon prev-mm" @click="prevMMClick()"></i>
                <i class="curr-mm"><span @click="getYYOrMMClick()">{{currDate[0]}}-{{currDate[1]}}</span></i>
                <i class="i-icon next-mm" @click="nextMMClick()"></i>
                <i class="i-icon next-yy" @click="nextYYClick()"></i>
            </div>
            <div class="dl-week">
                <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
            </div>
            <div class="dl-day">
                <div class="dld-item" v-for="(o, i) in monthDays" :key="i"><i :class="[{'active': o[0]==1&&parseInt(currDate[2])==o[1]}, {'light': o[0]!=1}]" @click="selDay(o)">{{o[1]}}</i></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vofill-date",
        props: {              //prop接收传过来的参数
            "type": Number,
            "selVal": String,
            "selObj": Object,
            "selKey": String,
            "placeholder": String
        },
        data () {
            return {
                modelType: 1,
                currDate: [],
                monthDays: [],
                dlShow: false,
                dlmdFlag: false,
                localType: this.type ? this.type : 1,
                localPlaceholder: this.placeholder && this.placeholder.length > 0 ? "--" + this.placeholder + "--" : "--请选择--"
            }
        },
        created() {
            this.getCurrDate();
        },
        computed:{
            inpVal() {
                if(this.selObj && this.selKey) {
                    return this.selObj[this.selKey];
                } else {
                    return this.selVal;
                }
            }
        },
        methods: {
            getCurrDate() {
                if(this.inpVal.length > 0) {
                    this.currDate = this.inpVal.split("-");
                } else {
                    let date = new Date();
                    let currYear = date.getFullYear();
                    let currMonth = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                    let currDay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                    this.currDate = [currYear, currMonth, currDay];
                }
                this.getMonthDays();
            },
            getMonthDays() {
                var cf = new Date(this.currDate[0] + "-" + this.currDate[1] + "-01");//当月第一天
                var ce = new Date(this.currDate[0], (this.currDate[1]), 0).getDate();//当月最后一天
                var cw = cf.getDay();//当月第一天是周几
                var lastMonthEndDay = 0;//上个月最后一天
                if(parseInt(this.currDate[1]) == 1) {
                    lastMonthEndDay = 31
                } else {
                    lastMonthEndDay = (new Date(new Date(this.currDate[0] + "-" + this.currDate[1] + "-01").getTime()-1000*60*60*24)).getDate();
                }
                this.monthDays = [];
                if(cw == 0) {
                    for(var i = 5; i > -1; i--) {
                        this.monthDays.push([0, lastMonthEndDay-i]);
                    }
                } else {
                    for(var i = cw - 2; i > -1; i--) {
                        this.monthDays.push([0, lastMonthEndDay-i]);
                    }
                }
                for(var i = 1; i < ce + 1; i++) {
                    this.monthDays.push([1, i]);
                }
                var currDays = this.monthDays.length;
                for(var i = 1; i < 43 - currDays; i++) {
                    this.monthDays.push([2, i]);
                }
            },
            //input获取焦点
            inputFocus() {
                this.dlShow = true;
            },
            //input失去焦点
            inputBlur() {
                if(!this.dlmdFlag) {
                    this.dlShow = false;
                }
            },
            //下拉列表框鼠标按下事件
            dlMD() {
                this.dlmdFlag = true;
            },
            //上一年切换事件
            prevYYClick() {
                this.currDate[0] = this.currDate[0] - 1;
                this.getMonthDays();
            },
            //上一月切换事件
            prevMMClick() {
                var currMonth = parseInt(this.currDate[1]);
                if(currMonth == 1) {
                    this.currDate[0] = this.currDate[0] - 1;
                    this.currDate[1] = "12";
                } else {
                    this.currDate[1] = currMonth < 11 ? "0" + (currMonth - 1) : currMonth - 1
                }
                this.getMonthDays();
            },
            //年份、月份选择事件
            getYYOrMMClick() {
                console.log("1111111")
            },
            //下一月切换事件
            nextMMClick() {
                var currMonth = parseInt(this.currDate[1]);
                if(currMonth == 12) {
                    this.currDate[0] = this.currDate[0] + 1;
                    this.currDate[1] = "01";
                } else {
                    this.currDate[1] = currMonth < 9 ? "0" + (currMonth + 1) : currMonth + 1
                }
                this.getMonthDays();
            },
            //下一年切换事件
            nextYYClick() {
                this.currDate[0] = this.currDate[0] + 1;
                this.getMonthDays();
            },
            //日期选择
            selDay(day) {
                if(day[0] == 0) {
                    if(parseInt(this.currDate[1])==1) {
                        this.currDate[0] = this.currDate[0] - 1;
                        this.currDate[1] = "12";
                    } else {
                        let lastMonth = parseInt(this.currDate[1]) - 1;
                        this.currDate[1] = lastMonth < 10 ? "0" + lastMonth : lastMonth;
                    }
                } else if(day[0] == 2) {
                    if(parseInt(this.currDate[1])==12) {
                        this.currDate[0] = this.currDate[0] + 1;
                        this.currDate[1] = "01";
                    } else {
                        let nextMonth = parseInt(this.currDate[1]) + 1;
                        this.currDate[1] = nextMonth < 10 ? "0" + nextMonth : nextMonth;
                    }
                }
                this.currDate[2] = day[1] < 10 ? "0" + day[1] : day[1];
                let currDay = this.currDate.join("-");
                this.selObj[this.selKey] = currDay;
                //this.$emit('change',this.selObj[this.selKey],currDay);
                this.dlShow = false;
                this.dlmdFlag = false;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .date{
        position: relative;
        color: var(--font-color);
    }

    .date:before {
        width: 1px;
        right: 40px;
        content: "";
        height: 100%;
        position: absolute;
        background: var(--input-border-color);
    }

    .date:after {
        top: 10px;
        right: 10px;
        content: "";
        width: 20px;
        height: 20px;
        position: absolute;
        background: url("../assets/date.png")
    }

    .date input {
        cursor: pointer;
    }

    .date .d-list {
        z-index: 10;
        width: 100%;
        height: auto;
        margin-top: 2px;
        position: absolute;
        top: var(--input-border);
        background: var(--white);
        border: 1px solid var(--input-border-color);
    }

    .d-list .dl-yy-mm {
        height: 40px;
        display: flex;
        line-height: 40px;
        text-align: center;
    }

    .dl-yy-mm .i-icon {
        width: 40px;
        height: 40px;
        position: relative;
    }

    .dl-yy-mm .i-icon.prev-yy:before,
    .dl-yy-mm .i-icon.prev-yy:after,
    .dl-yy-mm .i-icon.prev-mm:before,
    .dl-yy-mm .i-icon.next-mm:before,
    .dl-yy-mm .i-icon.next-yy:before,
    .dl-yy-mm .i-icon.next-yy:after {
        top: 14px;
        right: 0px;
        content: "";
        width: 10px;
        height: 10px;
        cursor: pointer;
        position: absolute;
        transform: rotate(-45deg);
        border-top: 2px solid var(--font-color);
        border-left: 2px solid var(--font-color);
    }

    .dl-yy-mm .i-icon.prev-yy:after,
    .dl-yy-mm .i-icon.next-yy:after {
        top: 16px;
        width: 6px;
        height: 6px;
    }

    .dl-yy-mm .i-icon.next-mm:before,
    .dl-yy-mm .i-icon.next-yy:before,
    .dl-yy-mm .i-icon.next-yy:after {
        left: 0px;
        transform: rotate(135deg);
    }

    .dl-yy-mm .i-icon.prev-yy:hover:before,
    .dl-yy-mm .i-icon.prev-yy:hover:after,
    .dl-yy-mm .i-icon.prev-mm:hover:before,
    .dl-yy-mm .i-icon.next-mm:hover:before,
    .dl-yy-mm .i-icon.next-yy:hover:before,
    .dl-yy-mm .i-icon.next-yy:hover:after {
        border-top: 2px solid var(--blue);
        border-left: 2px solid var(--blue);
    }

    .dl-yy-mm .curr-mm {
        width: 100%;
    }

    .curr-mm span {
        padding: 10px;
        cursor: pointer;
    }

    .d-list .dl-week {
        width: 100%;
        height: 40px;
        display: flex;
    }

    .dl-week span {
        width: 100%;
        line-height: 40px;
        text-align: center;
    }

    .dl-day .dld-item {
        width: 14.28%;
        line-height: 40px;
        text-align: center;
        display: inline-block;
    }

    .dld-item i {
        width: 30px;
        height: 30px;
        display: block;
        cursor: pointer;
        line-height: 30px;
        border-radius: 50%;
        margin: 5px auto 0px;
    }

    .dld-item i.active,
    .dld-item i:hover {
        color: var(--white);
        background: var(--blue);
    }

    .dld-item i.light {
        color: var(--placeholder-color);
    }
</style>