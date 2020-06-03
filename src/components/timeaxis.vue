/**
**时间轴组件
**vofill
**2020-06-03
**type:1--普通时间轴
**/

<template>
    <div class="timeaxis">
        <div class="ta-list1">
            <div :class="['tsl1-item', {'active': o.Id == active}]" v-for="(o, i) in localList" :key="i">
                <div class="tsl1i-left">
                    <div class="tsl1il-date">{{o.Date}}</div>
                    <div class="tsl1il-title">{{o.Title}}</div>
                </div>
                <div class="tsl1i-line">
                    <div class="tsl1il-point" @click="active=o.Id"></div>
                </div>
                <div class="tsl1i-right">{{o.Content}}</div>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: "vofill-timeaxis",
        props: {              //prop接收传过来的参数
            type: {default: 1},
            list: Array
        },
        data () {
            return {
                active: 0,
                localType: this.type,
                localList: this.list
            }
        },
        created() {
        },
        computed:{
        },
        methods: {
        },
        watch: {
            list(nv) {
                this.localList = nv;
            }
        }
    }
</script>