/**
**多选框选择组件
**vofill
**2020-05-04
**/

<template>
    <div class="checkbox">
        <template v-if="localList.length>0">
            <template v-if="localType == 1"><div :class="['c-item', {'active': active.indexOf(o.Id)>-1}]" v-for="(o, i) in localList" :key="i" @click="checkboxClick(o.Id)">{{o.Name}}</div></template>
            <template v-if="localType == 2"><div :class="['c-item', {'active': active.indexOf(o)>-1}]" v-for="(o, i) in localList" :key="i" @click="checkboxClick(o)">{{o}}</div></template>
        </template>
    </div>
</template>

<script>
    export default {
        name: "vofill-checkbox",
        props: {              //prop接收传过来的参数
            "list": Array,
            "type": Number,
            "selVal": String,
            "selObj": Object,
            "selKey": String,
        },
        data () {
            return {
                localList: this.list,
                localType: this.type ? this.type : 1
            }
        },
        computed:{
            active() {
                if(this.selObj && this.selKey) {
                    if(this.localType == 1) {
                        return (this.selObj[this.selKey].split(",")).map(Number);
                    } else if(this.localType == 2) {
                        return this.selObj[this.selKey].split(",");
                    }
                } else if(this.selVal) {
                    if(this.localType == 1) {
                        return (this.selVal.split(",")).map(Number);
                    } else if(this.localType == 2) {
                        return this.selVal.split(",");
                    }
                } else {
                    return "";
                }
            }
        },
        methods: {
            //多选框选中事件
            checkboxClick(id) {
                let ind = this.active.indexOf(id);
                if(ind > -1) {
                    this.active.splice(ind, 1)
                } else {
                    this.active.push(id);
                }
                let checked = this.active.length > 0 ? this.active.toString() : "";
                if(this.selObj && this.selKey) {
                    this.selObj[this.selKey] = checked;
                    this.$emit('change',this.selObj[this.selKey],checked);
                } else if(this.selVal) {
                    this.selVal = checked;
                    this.$emit('change',this.selVal,checked);
                }
            }
        },
        wacth: {
            list(nv) {
                this.localList = nv;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .checkbox {
        width: 100%;
        display: flex;
        color: var(--font-color);
    }

    .checkbox .c-item {
        cursor: pointer;
        position: relative;
        padding-left: 40px;
        margin-right: 20px;
        display: inline-block;
        height: var(--input-height);
        line-height: var(--input-height);
    }

    .checkbox .c-item:before {
        top: 12px;
        left: 8px;
        content: "";
        width: 14px;
        height: 14px;
        position: absolute;
        border: 2px solid var(--border-color);
    }

    .checkbox .c-item.active:before,
    .checkbox .c-item:hover:before {
        border: 2px solid var(--blue);
    }

    .checkbox .c-item.active:after {
        top: 0px;
        left: 11px;
        content: "\2714";
        color: var(--blue);
        position: absolute;
    }
</style>
