/**
**下拉框选择组件
**vofill
**2020-05-03
**/

<template>
    <div class="select">
        <input type="text" :value="inpVal" :placeholder="localPlaceholder" readonly="readonly" @focus="inputFocus" @blur="inputBlur" />
        <div class="s-list" v-show="slShow" @mousedown="slMD">
            <vofill-scroll>
                <template v-if="localList.length == 0">
                    <div class="sl-item">暂无数据</div>
                </template>
                <template v-else>
                    <template v-if="localType == 1"><div :class="['sl-item', {'active': o.Id==active}]" v-for="(o, i) in localList" :key="i" @click="itemClick(o.Id, o.Name)">{{o.Name}}</div></template>
                    <template v-else-if="localType == 2"><div :class="['sl-item', {'active': o==active}]" v-for="(o, i) in localList" :key="i" @click="itemClick(o, o)">{{o}}</div></template>
                    <template v-else-if="localType == 3">
                        <div class="sl-item" v-for="(o, i) in localList" :key="i" >
                            <div :class="['d-checkbox', {'checked': active.indexOf(o.Id)>-1}]" @click="itemClick(o.Id, o.Name)"></div>
                            <span>{{o.Name}}</span>
                        </div>
                    </template>
                    <template v-else-if="localType == 4">
                        <div class="sl-item" v-for="(o, i) in localList" :key="i" >
                            <div :class="['d-checkbox', {'checked': active.indexOf(o)>-1}]" @click="itemClick(o, o)"></div>
                            <span>{{o}}</span>
                        </div>
                    </template>
                </template>
            </vofill-scroll>
            <div class="sl-btns" v-if="localType == 3 || localType == 4">
                <div class="slb-ok" @click="itemsOkClick">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import vofillScroll from './scroll'

    export default {
        name: "vofill-select",
        components: {
            vofillScroll
        },
        props: {              //prop接收传过来的参数
            "list": Array,
            "type": Number,
            "selVal": String,
            "selObj": Object,
            "selKey": String,
            "placeholder": String
        },
        data () {
            return {
                slShow: false,
                slmdFlag: false,
                localList: this.list ? this.list : [],
                localType: this.type ? this.type : 1,
                localPlaceholder: this.placeholder && this.placeholder.length > 0 ? "--" + this.placeholder + "--" : "--请选择--"
            }
        },
        computed:{
            inpVal() {
                if(this.selObj && this.selKey) {
                    if(this.localType == 1) {
                        return (this.localList.find(o=>o.Id==this.active)).Name
                    } else if(this.localType == 2) {
                        return this.active;
                    } else if(this.localType == 3) {
                        var vals = "";
                        var hadSeledArr = this.localList.filter(o=>this.active.indexOf(o.Id) > -1);
                        hadSeledArr.forEach(o => {
                            vals += vals.length == 0 ? o.Name : "," + o.Name;
                        });
                        return vals;
                    } else if(this.localType == 4) {
                        return this.active;
                    }
                } else if(this.selVal) {
                    return this.selVal;
                } else {
                    return "";
                }
            },
            active() {
                if(this.selObj && this.selKey) {
                    if(this.localType == 3) {
                        return (this.selObj[this.selKey].split(",")).map(Number);
                    } else if(this.localType == 4) {
                        return this.selObj[this.selKey].split(",");
                    } else {
                        return this.selObj[this.selKey];
                    }
                } else {
                    if(this.localType == 3) {
                        return (this.selVal.split(",")).map(Number);
                    } else {
                        return this.selVal;
                    }
                } 
            }
        },
        methods: {
            //input获取焦点
            inputFocus() {
                this.slShow = true;
            },
            //input失去焦点
            inputBlur() {
                if(!this.slmdFlag) {
                    this.slShow = false;
                }
            },
            //下拉列表框鼠标按下事件
            slMD() {
                this.slmdFlag = true;
            },
            //选择项选中事件
            itemClick(id, name) {
                if(this.localType == 1 || this.localType == 2) {
                    this.selObj[this.selKey] = id;
                    if(this.selObj && this.selKey) {
                        this.$emit('change',this.selObj[this.selKey],id);
                    } else if(this.selVal) {
                        this.$emit('change:selVal',id);
                    }
                    this.slShow = false;
                    this.slmdFlag = false;
                    this.$emit('select-item-click', id);
                } else if(this.localType == 3 || this.localType == 4) {
                    var ind = this.active.indexOf(id);
                    if(ind > -1) {
                        this.active.splice(ind, 1);
                    } else {
                        this.active.push(id);
                    }
                    this.selObj[this.selKey] = this.active.join(",");
                }
            },
            //多选确定事件
            itemsOkClick() {
                this.slShow = false;
                this.slmdFlag = false;
            }
        },
        watch: {
            list(nv) {
                this.localList = nv;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .select{
        position: relative;
        color: var(--font-color);
    }

    .select:before {
        width: 1px;
        right: 40px;
        content: "";
        height: 100%;
        position: absolute;
        background: var(--input-border-color);
    }

    .select:after {
        top: 17px;
        right: 15px;
        content: "";
        position: absolute;
        border-top: 5px solid var(--blue);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }

    .select input {
        cursor: pointer;
    }

    .select .s-list {
        z-index: 10;
        width: 100%;
        height: auto;
        margin-top: 2px;
        position: absolute;
        top: var(--input-border);
        background: var(--white);
        border: 1px solid var(--input-border-color);
    }

    .s-list .sl-item {
        width: 100%;
        height: 32px;
        cursor: pointer;
        line-height: 32px;
        padding-left: 16px;
    }

    .s-list .sl-item:hover {
        background: var(--select-hover-color);
    }

    .s-list .sl-item.active {
        color: var(--white);
        background: var(--blue);
    }

    .s-list .scroll {
        max-height: 160px;
    }

    .sl-item .d-checkbox:before {
        top: 5px;
    }

    .s-list .sl-btns {
        width: 100%;
        height: 32px;
        border-top: 1px solid var(--border-color);
    }

    .sl-btns .slb-ok {
        width: 50px;
        height: 20px;
        font-size: 10px;
        cursor: pointer;
        margin-top: 6px;
        margin-left: 30px;
        line-height: 20px;
        text-align: center;
        color: var(--white);
        background: var(--blue);
    }
</style>
