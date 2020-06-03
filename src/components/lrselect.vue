/**
**左右选择组件
**vofill
**2020-05-18
**/

<template>
    <div class="lrselect">
        <div class="lrs-search">
            <div class="lrss-left"><input type="text" v-model.trim="leftSearchCont" /></div>
            <div class="lrss-center"></div>
            <div class="lrss-right"><input type="text" v-model.trim="rightSearchCont" /></div>
        </div>
        <div class="lrs-body">
            <div class="lrsb-left">
                <div class="lrsbl-title">待选({{unSelectedList.length}})</div>
                <div class="lrsbl-list">
                    <vofill-scroll :height="scrollHeight">
                        <template v-if="localType == 1">
                            <div :class="['lrsbll-item1', {'active': leftActive.indexOf(o.Id)>-1}]" v-for="(o, i) in unSelectedList" :key="i" @click="itemClick(1, o.Id)" v-show="leftSearchCont.length == 0 || o.Name.indexOf(leftSearchCont) > -1">{{o.Name}}</div>
                        </template>
                        <template v-if="localType == 2">
                            <div class="lrsbll-item2" v-for="(o, i) in unSelectedList" :key="i" v-show="leftSearchCont.length == 0 || o.Name.indexOf(leftSearchCont) > -1">
                                <span>{{o.Name}}</span>
                                <div :class="['d-checkbox', {'checked': leftActive.indexOf(o.Id)>-1}]" @click="itemClick(1, o.Id)" ></div>
                            </div>
                        </template>
                    </vofill-scroll>
                </div>
                
            </div>
            <div class="lrsb-center">
                <div class="lrsbc-box">
                    <div class="lrsbcb-btns"><div :class="['lrsbcbb-btn', 'lrsbcbb-right', {'active': leftActive.length > 0}]" @click="moveItem(1)"></div></div>
                    <div class="lrsbcb-btns"><div :class="['lrsbcbb-btn', 'lrsbcbb-left', {'active': rightActive.length > 0}]" @click="moveItem(2)"></div></div>
                </div>
            </div>
            <div class="lrsb-right">
                <div class="lrsbr-title">已选({{selectedList.length}})<i class="lrsbl-clear" @click="clearSelected()">清空</i></div>
                <div class="lrsbl-list">
                </div>
                <vofill-scroll :height="scrollHeight">
                    <template v-if="localType == 1">
                        <div :class="['lrsbr-item1', {'active': rightActive.indexOf(o.Id)>-1}]" v-for="(o, i) in selectedList" :key="i" @click="itemClick(2, o.Id)" v-show="rightSearchCont.length == 0 || o.Name.indexOf(rightSearchCont) > -1">{{o.Name}}</div>
                    </template>
                    <template v-if="localType == 2">
                        <div class="lrsbr-item2" v-for="(o, i) in selectedList" :key="i" v-show="rightSearchCont.length == 0 || o.Name.indexOf(rightSearchCont) > -1">
                            <span>{{o.Name}}</span>
                            <div :class="['d-checkbox', {'checked': rightActive.indexOf(o.Id)>-1}]" @click="itemClick(2, o.Id)" ></div>
                        </div>
                    </template>
                </vofill-scroll>
            </div>
        </div>
        
    </div>
</template>

<script>
    import vofillScroll from './scroll'
    import vofill from "../js/common/vofill.js";

    export default {
        name: "vofill-lrselect",
        components: {
            vofillScroll
        },
        props: {              //prop接收传过来的参数
            "list": Array,
            "type": Number,
            "selVal": String,
            "selObj": Object,
            "selKey": String
        },
        data () {
            return {
                active: this.selObj && this.selKey ? (this.selObj[this.selKey].split(",")).map(Number) : [],
                leftActive: [],
                rightActive: [],
                scrollHeight: "450",
                leftSearchCont: "",
                rightSearchCont: "",
                localList: this.list ? this.list : [{Id: 1, Name: "选项1"}, {Id: 2, Name: "选项2"}, {Id: 3, Name: "选项3"},{Id: 4, Name: "选项4"}, {Id: 5, Name: "选项5"}, {Id: 6, Name: "选项6"}],
                localType: this.type ? this.type : 1
            }
        },
        computed:{
            unSelectedList() {
                return this.localList.filter(o=>this.active.indexOf(o.Id) < 0);
            },
            selectedList() {
                return this.localList.filter(o=>this.active.indexOf(o.Id) > -1);
            }
        },
        methods: {
            //多选框选中事件
            itemClick(t, id) {
                if(t == 1) {
                    let ind = this.leftActive.indexOf(id);
                    if(ind > -1) {
                        this.leftActive.splice(ind, 1);
                    } else {
                        this.leftActive.push(id);
                    }
                } else{
                    let ind = this.rightActive.indexOf(id);
                    if(ind > -1) {
                        this.rightActive.splice(ind, 1)
                    } else {
                        this.rightActive.push(id);
                    }
                }
            },
            //数据移动
            moveItem(t) {
                var arrTemp = [];
                if(t == 1) {
                    arrTemp = this.active.concat(this.leftActive);
                    this.leftActive = [];
                } else {
                    arrTemp = vofill.mergeArray(this.active, this.rightActive);
                    this.rightActive = [];
                }
                this.active = arrTemp;
                this.leftSearchCont = this.rightSearchCont = "";
            },
            //清空已选数据
            clearSelected() {
                this.active = [];
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .lrselect {
        width: 100%;
        padding: 0 20px;
        color: var(--font-color);
    }

    .lrselect .lrs-search {
        width: 100%;
        height: 60px;
        display: flex;
    }

    .lrs-search .lrss-left,
    .lrs-search .lrss-right {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .lrs-search .lrss-left:after,
    .lrs-search .lrss-right:after {
        top: 20px;
        right: 10px;
        content: "";
        width: 20px;
        height: 20px;
        position: absolute;
        background: url("../assets/search.png")
    }

    .lrss-left input,
    .lrss-right input {
        width: 100%;
        margin-top: 10px;
    }

    .lrs-search .lrss-center,
    .lrs-body .lrsb-center {
        width: 200px;
        height: 100%;
    }

    .lrselect .lrs-body {
        width: 100%;
        height: 100%;
        display: flex;
    }

    .lrs-body .lrsb-left,
    .lrs-body .lrsb-right {
        width: 100%;
        height: 500px;
        border-radius: 5px;
        border: 1px solid var(--border-color);
    }

    .lrs-body .lrsb-center {
        height: 500px;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center; /*定义body的里的元素水平居中*/
    }

    .lrsb-left .lrsbl-title,
    .lrsb-right .lrsbr-title {
        width: 100%;
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
        position: relative;
        background: var(--thead-bg);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .lrsbr-title .lrsbl-clear {
        top: 8px;
        right: 8px;
        width: 40px;
        height: 20px;
        cursor: pointer;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        position: absolute;
        color: var(--white);
        background: var(--red);
    }

    .lrsb-left .lrsbl-list,
    .lrsb-left .lrsbr-list {
        height: 460px;
    }

    .lrsb-left .lrsbll-item1,
    .lrsb-right .lrsbr-item1,
    .lrsb-left .lrsbll-item2,
    .lrsb-right .lrsbr-item2 {
        width: 285px;
        height: 32px;
        margin: 0 auto;
        padding: 0 10px;
        cursor: pointer;
        overflow: hidden;
        line-height: 32px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .lrsbll-item1.active,
    .lrsbll-item1:hover,
    .lrsbr-item1.active,
    .lrsbr-item1:hover {
        color: var(--white);
        background: var(--blue);
    }

    .lrsb-center .lrsbc-box {
        width: 100%;
        height: 40%;
        display: flex;
        flex-flow: column;
    }

    .lrsbc-box .lrsbcb-btns {
        width: 100%;
        height: 50%;
    }

    .lrsbcb-btns .lrsbcbb-btn {
        width: 60px;
        height: 30px;
        cursor: pointer;
        margin: 40% auto;
        position: relative;
        border: 1px solid var(--border-color);
    }

    .lrsbcb-btns .lrsbcbb-btn:before {
        top: 6px;
        left: 16px;
        width: 12px;
        height: 12px;
        content: "";
        position: absolute;
        border-left: double 4px;
        transform: rotate(225deg);
        border-bottom: double 4px;
    }

    .lrsbcb-btns .lrsbcbb-btn.lrsbcbb-left:before {
        left: 25px;
        transform: rotate(45deg);
    }

    .lrsbcb-btns .lrsbcbb-btn:hover,
    .lrsbcb-btns .lrsbcbb-btn.active {
        color: var(--blue);
        border: 1px solid var(--blue);
    }

    .lrsb-left .lrsbll-item2,
    .lrsb-right .lrsbr-item2 {
        cursor: unset;
        line-height: unset;
    }

    .lrsbll-item2 span,
    .lrsbr-item2 span {
        width: 240px;
        height: 32px;
        overflow: hidden;
        line-height: 32px;
        line-height: 32px;
        white-space: nowrap;
        display: inline-block;
        text-overflow: ellipsis;
    }

    .lrsbll-item2 .d-checkbox,
    .lrsbr-item2 .d-checkbox {
        top: -7px;
    }
</style>
