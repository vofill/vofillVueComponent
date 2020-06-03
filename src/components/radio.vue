/**
**单选框选择组件
**vofill
**2020-05-04
**/

<template>
    <div class="radio">
        <template v-if="localList.length>0">
            <template v-if="localType == 1"><div :class="['r-item', {'active': active==o.Id}]" v-for="(o, i) in localList" :key="i" @click="radioClick(o.Id)">{{o.Name}}</div></template>
            <template v-if="localType == 2"><div :class="['r-item', {'active': active==o}]" v-for="(o, i) in localList" :key="i" @click="radioClick(o)">{{o}}</div></template>
        </template>
    </div>
</template>

<script>
    export default {
        name: "vofill-radio",
        props: {              //prop接收传过来的参数
            "list": Array,
            "type": Number,
            "selVal": String,
            "selObj": Object,
            "selKey": String
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
                    return this.selObj[this.selKey];
                } else {
                    return this.selVal;
                } 
            }
        },
        methods: {
            //单选框选中事件
            radioClick(id) {
                this.selObj[this.selKey] = id;
                this.$emit('change',this.selObj[this.selKey],id);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .radio {
        width: 100%;
        display: flex;
        color: var(--font-color);
    }

    .radio .r-item {
        cursor: pointer;
        position: relative;
        padding-left: 40px;
        margin-right: 20px;
        display: inline-block;
        height: var(--input-height);
        line-height: var(--input-height);
    }

    .radio .r-item:before {
        top: 10px;
        left: 6px;
        content: "";
        width: 18px;
        height: 18px;
        position: absolute;
        border-radius: 50%;
        border: 2px solid var(--border-color);
    }

    .radio .r-item.active:before,
    .radio .r-item:hover:before {
        border: 2px solid var(--blue);
    }

    .radio .r-item.active:after {
        top: 16px;
        left: 12px;
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        border-radius: 50%;
        background: var(--blue);
    }
</style>
