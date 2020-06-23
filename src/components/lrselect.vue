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
                        <template v-if="localType == 3">
                            <div class="lrsbll-item3">
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
                localList: this.list ? this.list : [],
                localType: this.type ? this.type : 1
            }
        },
        computed:{
            unSelectedList() {
                var tempList = this.localList.filter(o=>this.active.indexOf(o.Id) < 0);
                if(this.localType == 1 || this.localType == 2) {
                    return tempList;
                } else if(this.localType == 3) {
                    var tempList2 = vofill.groupby(tempList, function(item){
                                    return [item.DeptId];
                                });
                    return tempList2;
                }
            },
            selectedList() {
                var tempList = this.localList.filter(o=>this.active.indexOf(o.Id) > -1);
                if(this.localType == 1 || this.localType == 2) {
                    return tempList;
                } else if(this.localType == 3) {
                    var tempList2 = vofill.groupby(tempList, function(item){
                                    return [item.DeptId];
                                });
                    return tempList2;
                }
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