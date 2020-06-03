/**
**树状结构组件
**vofill
**2020-05-24
**/

<template>
    <div class="tree-structure">
        <div class="ts-box" v-if="localType == 1">
            <ul class="tsb-ul">
                <li class="tsbu-item" v-for="(o, i) in localList" :key="i">
                    <div class="tsbui-content">
                        <span :class="['tsbuic-btn', {'hide': o.show}]" v-if="o.Child" @click="toggleChildInfo(o)"></span>
                        <span :class="['tsbuic-info', {'active': localActive==o.Id}]" @click="itemClick(o)">{{o.Name}}</span>
                    </div>
                    <vofill-tree :list="o.Child" :type=localType :active="localActive" v-if="o.Child" v-show="!o.show" @itemClickToParent="itemClick"></vofill-tree>
                </li>
            </ul>
        </div>
        <div class="ts-box" v-if="localType == 2">
            <ul class="tsb-ul2">
                <li class="tsbu2-item" v-for="(o, i) in localList" :key="i">
                    <div class="tsbu2i-content">
                        <div class="tsbu2ic-left">
                            <div :class="['tsbu2icl-toggle', {'hide': o.Show}]" @click="toggleChildInfo2(o)"></div>
                            <div :class="['tsbu2icl-check', 'd-checkbox', {'checked': (o.OperaChecked2 && o.OperaChecked2.length == o.Operate.length)}, {'checked2': (o.OperaChecked2 && o.OperaChecked2.length > 0 && o.OperaChecked2.length < o.Operate.length)}]" @click="itemCheckClick(o)"><i></i></div>
                            <div class="tsbu2icl-name">{{o.Name}}</div>
                        </div>
                        <div class="tsbu2ic-oper">
                            <div :class="['tsbu2ico-item', {'checked1': oo.Checked1}, {'checked2': o.OperaChecked2 && o.OperaChecked2.indexOf(oo.Key) > -1}]"  v-for="(oo, ii) in o.Operate" :key="ii" @click="itemClick2(oo,o)">{{oo.Value}}</div>
                        </div>
                    </div>
                    <vofill-tree :list="o.Child" :type=localType :active="localActive" v-if="o.Child" v-show="!o.Show"></vofill-tree>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import vofill from "../js/common/vofill.js";

    export default {
        name: "vofill-tree",
        props: {              //prop接收传过来的参数
            "type": {default: 1},
            "list": Array,
            "active": {default: 0}
        },
        data () {
            return {
                localActive: 0,
                localType: this.type,
                localList: this.list ? this.list : [],
            }
        },
        created() {
        },
        computed:{
        },
        methods: {
            //切换子菜单是否显示
            toggleChildInfo(item) {
                var idx = this.localList.indexOf(item)
                this.$set(this.localList[idx], 'show', !item.show)
            },
            itemClick(item) {
                this.localActive = item.Id;
                this.$emit('itemClickToParent', item);
            },
            //切换子菜单是否显示
            toggleChildInfo2(item, pid) {
                var idx = this.localList.indexOf(item)
                this.$set(this.localList[idx], 'Show', !item.Show);
            },
            //菜单选择事件
            itemCheckClick(item, pid) {
                var idx = this.localList.indexOf(item);
                var operaChecked2Temp = [];
                if(this.localList[idx].Operate && this.localList[idx].Operate.length > 0 
                    && ((!this.localList[idx].OperaChecked2)
                        || (this.localList[idx].OperaChecked2 && this.localList[idx].OperaChecked2.length < this.localList[idx].Operate.length))) {
                    this.localList[idx].Operate.forEach(o=> {operaChecked2Temp.push(o.Key);});
                }
                this.$set(this.localList[idx], 'OperaChecked2', operaChecked2Temp);
            },
            //操作项目选择事件
            itemClick2(item, pitem) {
                var idx = this.localList.indexOf(pitem);
                var operaChecked2Temp = [];
                if(pitem.OperaChecked2) {
                    operaChecked2Temp = pitem.OperaChecked2;
                    var sidx = operaChecked2Temp.indexOf(item.Key);
                    if(sidx > -1) {
                        operaChecked2Temp.splice(sidx, 1);
                    } else {
                        operaChecked2Temp.push(item.Key);
                    }
                } else {
                    operaChecked2Temp.push(item.Key);
                }
                this.$set(this.localList[idx], 'OperaChecked2', operaChecked2Temp);
            },
            //递归深度查找对象
            findItemById(type, dataList, id, pid) {
                if(!dataList) {
                    return false;
                }
                for(var i = 0; i < dataList.length; i++) {
                    if(type == 1) {
                        if(dataList[i].Id == id) {
                            dataList[i].Show = !dataList[i].Show;
                            break;
                        } else if(dataList[i].Child && dataList[i].Child.length > 0) {
                            this.findItemById(type, dataList[i].Child, id, pid);
                        }
                    } else if(type == 2) {
                        if(dataList[i].Id == id) {
                            dataList[i].Checked1 = !dataList[i].Checked1;
                            dataList[i].OperaChecked2 = [];
                            if(dataList[i].Operate && dataList[i].Operate.length > 0 && dataList[i].Checked1) {
                                dataList[i].Operate.forEach(o=> {dataList[i].OperaChecked2.push(o.Id);});
                            }
                            break;
                        } else if(dataList[i].Child && dataList[i].Child.length > 0) {
                            this.findItemById(type, dataList[i].Child, id, pid);
                        }
                    } else if(type == 3) {
                        if(dataList[i].Id == pid) {
                            if(dataList[i].OperaChecked2 && dataList[i].OperaChecked2.length > 0) {
                                let ind = dataList[i].OperaChecked2.indexOf(id);
                                if(ind > -1) {
                                    dataList[i].OperaChecked2.splice(ind, 1);
                                } else {
                                    dataList[i].OperaChecked2.push(id);
                                }
                            } else {
                                dataList[i].OperaChecked2 = [id];
                            }
                            break;
                        } else if(dataList[i].Child && dataList[i].Child.length > 0) {
                            this.findItemById(type, dataList[i].Child, id, pid);
                        }
                    }
                }

                return dataList;
            }
        },
        watch: {
            active(nv) {
                this.localActive = nv;
            },
            type(nv) {
                localType = nv;
            },
            list(nv) {
                this.localList = nv;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .tree-structure {
        width: 100%;
        color: var(--font-color);
    }

    .tree-structure .ts-box {
        width: 100%;
        height: 100%;
    }

    .ts-box .tsb-ul,
    .ts-box .tsb-ul2 {
        width: 100%;
        padding-left: 37px;
    }

    .tsb-ul .tsbu-item,
    .tsb-ul2 .tsbu2-item {
        width: 100%;
        height: 100%;
        padding: 5px;
        display: block;
    }

    .tsbu-item .tsbui-content,
    .tsbu2-item .tsbu2i-content {
        display: flex;
        flex-direction: row;
    }

    .tsbui-content .tsbuic-btn {
        width: 26px;
        height: 26px;
        display: block;
        cursor: pointer;
        margin-top: 7px;
        border-radius: 50%;
        position: relative;
        background: var(--blue);
    }

    .tsbui-content .tsbuic-btn:before {
        top: 12px;
        left: 8px;
        width: 10px;
        height: 2px;
        content: "";
        position: absolute;
        background: var(--white);
    }

    .tsbui-content .tsbuic-btn.hide:after {
        top: 8px;
        left: 12px;
        width: 2px;
        height: 10px;
        content: "";
        position: absolute;
        background: var(--white);
    }

    .tsbui-content .tsbuic-info,
    .tsbu2ic-left .tsbu2icl-name {
        width: 100%;
        height: 40px;
        display: block;
        cursor: pointer;
        padding: 0 12px;
        line-height: 40px;
        transition: all 0.5s;
    }

    .tsbui-content .tsbuic-info:hover,
    .tsbu2ic-left .tsbu2icl-name:hover {
        transform: scale(1.05, 1.05);
        background: var(--select-hover-color);
    }

    .tsbui-content .tsbuic-info.active {
        color: var(--white);
        background: var(--blue);
    }

    .tsb-ul2 .tsbu2-item {
        position: relative;
    }

    .tsb-ul2 .tsbu2-item:before {
        top: 0;
        bottom: 0;
        left: 17px;
        content: '';
        position: absolute;
        border: 1px solid var(--border-color);
    }

    .tsb-ul2 .tsbu2-item:first-child::before {
        top: -22px;
    }

    .tsb-ul2 .tsbu2-item:last-child::before {
        height: 35px;
    }

    .tsbu2i-content .tsbu2ic-left {
        width: 300px;
        display: flex;
        flex-direction: row;
    }

    .tsbu2ic-left .tsbu2icl-toggle {
        width: 26px;
        height: 26px;
        cursor: pointer;
        margin-top: 7px;
        position: relative;
        background: var(--blue);
    }

    .tsbu2ic-left .tsbu2icl-toggle:before {
        top: 12px;
        left: 8px;
        width: 10px;
        height: 2px;
        content: "";
        position: absolute;
        background: var(--white);
    }

    .tsbu2ic-left .tsbu2icl-toggle.hide:after {
        top: 8px;
        left: 12px;
        width: 2px;
        height: 10px;
        content: "";
        position: absolute;
        background: var(--white);
    }

    .tsbu2ic-left .tsbu2icl-check {
        top: 11px;
        left: 20px;
    }

    .tsbu2ic-left .tsbu2icl-check i {
        top: 8px;
        left: -18px;
        width: 16px;
        height: 2px;
        content: "";
        position: absolute;
        background: var(--border-color);
    }

    .tsbu2ic-left .tsbu2icl-name {
        width: 240px;
        margin-left: 20px;
    }

    .tsbu2ic-left .tsbu2icl-name:hover {
        margin-left: 30px;
        transform: scale(1.01, 1.01);
    }

    .tsbu2i-content .tsbu2ic-oper {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .tsbu2ic-oper .tsbu2ico-item {
        width: 108px;
        height: 40px;
        font-size: 16px;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        position: relative;
        margin-right: 30px;
        margin-bottom: 10px;
        border: 1px solid var(--border-color);
    }

    .tsbu2ic-oper .tsbu2ico-item:hover,
    .tsbu2ic-oper .tsbu2ico-item.checked2 {
        color: var(--blue);
        border: 1px solid var(--blue);
    }

    .tsbu2ic-oper .tsbu2ico-item.checked1 {
        color: var(--font-color);
        background: var(--thead-bg);
        border: 1px solid var(--grey);
    }

    .tsbu2ic-oper .tsbu2ico-item.checked1:before,
    .tsbu2ic-oper .tsbu2ico-item.checked2:before {
        width: 0;
        height: 0;
        right: 0px;
        bottom: 0px;
        content: "";
        position: absolute;
        border-top: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid var(--grey);
        border-bottom: 10px solid var(--grey);
    }

    .tsbu2ic-oper .tsbu2ico-item.checked2:before {
        border-right: 10px solid var(--blue);
        border-bottom: 10px solid var(--blue);
    }

    .tsbu2ic-oper .tsbu2ico-item.checked1:after,
    .tsbu2ic-oper .tsbu2ico-item.checked2:after {
        top: 10px;
        right: 0px;
        content: "\2714";
        color: var(--white);
        position: absolute;
    }
</style>
