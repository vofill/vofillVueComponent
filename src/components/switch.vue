/**
**按钮组件
**vofill
**2020-05-10
**typ:1--通过ID判断；2--通过名称判断；3--切换off背景色修改；4--切换按钮两边隐藏显示；5--切换按钮两边隐藏显示,同时背景色变化；
**type:6--切换按钮往上隐藏显示；7--切换按钮往上隐藏显示,同时背景色变化；8--切换按钮背景左右显示；9--切换按钮背景左右显示,同时背景色变化；
**type:10--切换按钮翻页隐藏显示；11--切换按钮翻页隐藏显示,同时背景色变化；
**/

<template>
    <div :class="['switch', {'switch-3': localType == 3 && switchFlag}, {'switch-5': localType == 5 && switchFlag}, {'switch-7': localType == 7 && switchFlag}, {'switch-8': localType == 8}, {'switch-9': localType == 9}, {'switch-10': localType == 10}, {'switch-11': localType == 11}]" @click="switchClick()">
        <i :class="[{'s-on': !switchFlag}, {'s-off': switchFlag}]" v-if="localType < 4">{{switchVal}}</i>
        <div class="s-box" v-if="localType == 4 || localType == 5">
            <i class="s-on" :style="siStyle[0]">{{localList[0].Name}}</i>
            <i class="s-off" :style="siStyle[1]">{{localList[1].Name}}</i>
        </div>
        <div class="s-box" v-if="localType == 6 || localType == 7">
            <i class="s-on" :style="siStyle2[0]">{{localList[0].Name}}</i>
            <i class="s-off" :style="siStyle2[1]">{{localList[1].Name}}</i>
        </div>
        <div :class="['s-box', {'s-left': !switchFlag}, {'s-right': switchFlag}]" v-if="localType == 8 || localType == 9">
            <i :class="['s-i', 's-on', {'active': !switchFlag}]">{{localList[0].Name}}</i>
            <i :class="['s-i', 's-off', {'active': switchFlag}]">{{localList[1].Name}}</i>
        </div>
        <div :class="['s-box', {'s-left': !switchFlag}, {'s-right': switchFlag}]" v-if="localType == 10 || localType == 11">
            <i :class="['s-i', 's-on', {'active': !switchFlag}]">{{localList[0].Name}}</i>
            <i :class="['s-i', 's-off', {'active': switchFlag}]">{{localList[1].Name}}</i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vofill-button",
        props: {              //prop接收传过来的参数
            "list": Array,
            "type": Number,
            "selVal": String,
            "selObj": Object,
            "selKey": String
        },
        data () {
            return {
                localType: this.type ? this.type : 1,
                localList: this.list ? this.list : ["ON", "OFF"]
            }
        },
        computed: {
            switchFlag() {
                let currVal = null, sf = 0;
                if(this.selObj && this.selKey) {
                    currVal = this.selObj[this.selKey];
                } else {
                    currVal = this.selVal;
                }
                if(this.localType == 1 || this.localType == 3
                    || this.localType == 4 || this.localType == 5
                    || this.localType == 6 || this.localType == 7
                    || this.localType == 8 || this.localType == 9
                    || this.localType == 10 || this.localType == 11) {
                    this.localList.forEach((o, i)=> {
                        if(o.Id == currVal) {
                            sf = i; 
                        }
                    });
                } else if(this.localType == 2) {
                    sf = this.localList.indexOf(currVal);
                }
                return sf;
            },
            switchVal() {
                if(this.localType == 1 || this.localType == 3
                    || this.localType == 4 || this.localType == 5
                    || this.localType == 6 || this.localType == 7
                    || this.localType == 8 || this.localType == 9
                    || this.localType == 10 || this.localType == 11) {
                    return this.localList[this.switchFlag].Name;
                } else if(this.localType == 2) {
                    return this.localList[this.switchFlag];
                }
            },
            siStyle() {
                if(this.switchFlag) {
                    return [{left: "-40px"}, {left: "40px"}]
                } else {
                    return [{left: "0px"}, {left: "80px"}]
                }
            },
            siStyle2() {
                if(this.switchFlag) {
                    return [{top: "-40px"}, {top: "0px"}]
                } else {
                    return [{top: "0px"}, {top: "-40px"}]
                }
            },
            siStyle3() {
                if(this.switchFlag) {
                    return {transform: "rotate(180deg)"}
                } else {
                    return {transform: "rotate(0deg)"}
                }
            }
        },
        methods: {
            switchClick() {
                let currInd = this.switchFlag == 1 ? 0 : 1;
                if(this.selObj && this.selKey) {
                    if(this.localType == 1 || this.localType == 3
                        || this.localType == 4 || this.localType == 5
                        || this.localType == 6 || this.localType == 7
                        || this.localType == 8 || this.localType == 9
                        || this.localType == 10 || this.localType == 11) {
                        this.selObj[this.selKey] = this.localList[currInd].Id;
                    } else if(this.localType == 2) {
                        this.selObj[this.selKey] = this.localList[currInd];
                    }
                } else if(this.selVal) {
                    if(this.localType == 1 || this.localType == 3
                        || this.localType == 4 || this.localType == 5
                        || this.localType == 6 || this.localType == 7
                        || this.localType == 8 || this.localType == 9
                        || this.localType == 10 || this.localType == 11) {
                        this.selVal = this.localList[currInd].Id;
                    } else if(this.localType == 2) {
                        this.selVal = this.localList[currInd];
                    }
                }
            }
        },
        watch: {
        }
    }
</script>