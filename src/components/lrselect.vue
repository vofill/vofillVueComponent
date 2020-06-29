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
                            <div :class="['lrsbll-item1', {'active': leftActive.indexOf(o.Id)>-1}]" v-for="(o, i) in unSelectedList" :key="i" @click="itemClick(1, 0, o.Id)" v-show="leftSearchCont.length == 0 || o.Name.indexOf(leftSearchCont) > -1">{{o.Name}}</div>
                        </template>
                        <template v-if="localType == 2">
                            <div class="lrsbll-item2" v-for="(o, i) in unSelectedList" :key="i" v-show="leftSearchCont.length == 0 || o.Name.indexOf(leftSearchCont) > -1">
                                <span>{{o.Name}}</span>
                                <div :class="['d-checkbox', {'checked': leftActive.indexOf(o.Id)>-1}]" @click="itemClick(1, 0, o.Id)"></div>
                            </div>
                        </template>
                        <template v-if="localType == 3">
                            <div class="lrsbll-item3" v-for="(o, i) in unSelectedList" :key="i">
                                <span :class="[{'hide': o[0].ShowFlag}, {'open': !o[0].ShowFlag}]" @click="showGroupItem(1, o[0].Id)">{{o[0].DeptName}}</span>
                                <div :class="['d-checkbox', {'checked': (leftActive[i] && leftActive[i].length == o.length)}]" @click="groupItemAllCheck(1, i)"></div>
                                <div class="lrsblli-group" v-show="!o[0].ShowFlag">
                                    <div class="lrsbll-item3 lrsbll-sub" v-for="(oo, ii) in o" :key="ii" v-show="leftSearchCont.length == 0 || oo.Name.indexOf(leftSearchCont) > -1">
                                        <span>{{oo.Name}}</span>
                                        <div :class="['d-checkbox', {'checked': leftActive[i] && leftActive[i].indexOf(oo.Id)>-1}]" @click="itemClick(3, i, oo.Id)"></div>
                                    </div>
                                </div>
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
                <div class="lrsbr-list">
                    <vofill-scroll :height="scrollHeight">
                        <template v-if="localType == 1">
                            <div :class="['lrsbr-item1', {'active': rightActive.indexOf(o.Id)>-1}]" v-for="(o, i) in selectedList" :key="i" @click="itemClick(2, 0, o.Id)" v-show="rightSearchCont.length == 0 || o.Name.indexOf(rightSearchCont) > -1">{{o.Name}}</div>
                        </template>
                        <template v-if="localType == 2">
                            <div class="lrsbr-item2" v-for="(o, i) in selectedList" :key="i" v-show="rightSearchCont.length == 0 || o.Name.indexOf(rightSearchCont) > -1">
                                <span>{{o.Name}}</span>
                                <div :class="['d-checkbox', {'checked': rightActive.indexOf(o.Id)>-1}]" @click="itemClick(2, 0, o.Id)" ></div>
                            </div>
                        </template>
                        <template v-if="localType == 3">
                            <div class="lrsbrl-item3" v-for="(o, i) in selectedList" :key="i">
                                <span :class="[{'hide': o[0].ShowFlag}, {'open': !o[0].ShowFlag}]" @click="showGroupItem(2, o[0].Id)">{{o[0].DeptName}}</span>
                                <div :class="['d-checkbox', {'checked': (rightActive[i] && rightActive[i].length == o.length)}]" @click="groupItemAllCheck(2, i)"></div>
                                <div class="lrsbrli-group" v-show="!o[0].ShowFlag">
                                    <div class="lrsbrl-item3" v-for="(oo, ii) in o" :key="ii" v-show="rightSearchCont.length == 0 || oo.Name.indexOf(rightSearchCont) > -1">
                                        <span>{{oo.Name}}</span>
                                        <div :class="['d-checkbox', {'checked': rightActive[i] && rightActive[i].indexOf(oo.Id)>-1}]" @click="itemClick(4, i, oo.Id)"></div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </vofill-scroll>
                </div>
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
            itemClick(t, index, id) {
                if(t == 1) {//无子父级待选数据选择事件
                    let ind = this.leftActive.indexOf(id);
                    if(ind > -1) {
                        this.leftActive.splice(ind, 1);
                    } else {
                        this.leftActive.push(id);
                    }
                } else if(t == 2) {//无子父级已选数据选择事件
                    let ind = this.rightActive.indexOf(id);
                    if(ind > -1) {
                        this.rightActive.splice(ind, 1)
                    } else {
                        this.rightActive.push(id);
                    }
                } else if(t == 3) {//有子父级待选数据选择事件
                    if(this.leftActive[index]) {
                        let ind = this.leftActive[index].indexOf(id);
                        if(ind > -1) {
                            this.leftActive[index].splice(ind, 1);
                        } else {
                            this.leftActive[index].push(id);
                        }
                    } else {
                        this.$set(this.leftActive, index, []);
                        this.leftActive[index].push(id);
                    }
                } else if(t == 4) {//有子父级已选数据选择事件
                    if(this.rightActive[index]) {
                        let ind = this.rightActive[index].indexOf(id);
                        if(ind > -1) {
                            this.rightActive[index].splice(ind, 1);
                        } else {
                            this.rightActive[index].push(id);
                        }
                    } else {
                        this.$set(this.rightActive, index, []);
                        this.rightActive[index].push(id);
                    }
                }
            },
            //数据移动
            moveItem(t) {
                var arrTemp = [];
                if(t == 1) {
                    if(this.localType == 1 || this.localType == 2) {
                        arrTemp = this.active.concat(this.leftActive);
                    } else if(this.localType == 3) {
                        if(this.leftActive.length > 0) {
                            this.leftActive.forEach(o=> {
                                if(o.length > 0) {
                                    arrTemp = [];
                                    arrTemp = this.active.concat(o);
                                    this.active = arrTemp;
                                }
                            });
                        }
                    }
                    this.leftActive = [];
                } else {
                    if(this.localType == 1 || this.localType == 2) {
                        arrTemp = vofill.mergeArray(this.active, this.rightActive);
                    } else if(this.localType == 3) {
                        if(this.rightActive.length > 0) {
                            this.rightActive.forEach(o=> {
                                if(o.length > 0) {
                                    arrTemp = [];
                                    arrTemp = vofill.mergeArray(this.active, o);
                                    this.active = arrTemp;
                                }
                            });
                        }
                    }
                    this.rightActive = [];
                }
                this.active = arrTemp;
                this.leftSearchCont = this.rightSearchCont = "";
            },
            //清空已选数据
            clearSelected() {
                this.active = [];
            },
            //子级显示隐藏事件
            showGroupItem(type, id) {
                if(type == 1) {//待选框
                    this.groupItemDataDeal(this.unSelectedList, id);
                } else if(type == 2) {//已选框
                    this.groupItemDataDeal(this.selectedList, id);
                }
            },
            groupItemDataDeal(dataList, id) {
                dataList.forEach((o, i)=> {
                    o.forEach((oo, ii) => {
                        if(oo.Id == id) {
                            if(oo.ShowFlag) {
                                this.$set(oo, "ShowFlag", false);
                            } else {
                                this.$set(oo, "ShowFlag", true);
                            }
                        }
                    });
                });
            },
            //子级全选事件
            groupItemAllCheck(type, index) {
                if(type == 1) {
                    if(this.leftActive[index] && this.leftActive[index].length > 0) {
                        this.$set(this.leftActive, index, []);
                    } else {
                        this.$set(this.leftActive, index, []);
                        this.unSelectedList[index].forEach(o => {
                            this.leftActive[index].push(o.Id);
                        });
                    }
                } else if(type == 2) {
                    if(this.rightActive[index] && this.rightActive[index].length > 0) {
                        this.$set(this.rightActive, index, []);
                    } else {
                        this.$set(this.rightActive, index, []);
                        this.selectedList[index].forEach(o => {
                            this.rightActive[index].push(o.Id);
                        });
                    }
                }
            }
        }
    }
</script>