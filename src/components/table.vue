/**
**table组件
**vofill
**2020-05-05
**/

<template>
    <div class="table">
        <div class="t-head">
            <slot name="thead"></slot>
        </div>
        
        <div class="t-body">
            <template v-if="localList.length == 0">
                <div class="tb-tr">
                    <span class="s-none">暂无数据</span>
                </div>
            </template>
            <template v-else>
                <slot name="tbody"></slot>
            </template>
        </div>
        
        <div class="t-foot">
            <div class="tf-left">
                当前第{{currNumIndex[0]}}-{{currNumIndex[1]}}条，总共{{list.length}}条，每页显示<span @mouseover="tflSpanMoveIn" @mouseout="tflSpanMoveOut">{{showSize}}条
                    <div :class="['tfl-size', {'none': !sizeArrShow}]">
                        <div :class="['tfls-item', {'active': showSize==o}]" v-for="(o, i) in sizeArr" :key="i" @click="sizeClick(o)">{{o}}</div>
                    </div>
                </span>
            </div>
            <div class="tf-right">
                <div class="tfr-page tfrp-prev" @click="pageChange(1, -1)"></div>
                <div :class="['tfr-page', {'active': pageIndex==o}]" v-for="(o, i) in pageNums" :key="i" @click="pageChange(2, o)">{{o}}</div>
                <div class="tfr-page tfrp-next" @click="pageChange(1, 1)"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vofill-table",
        props: {              //prop接收传过来的参数
            "list": Array
        },
        data () {
            return {
                showSize: 10,
                pageIndex: 1,
                localList: [],
                sizeArrShow: false,
                sizeArr: [5,10,20,50,100]
            }
        },
        computed:{
            //计算当前显示的序号
            currNumIndex(){
                if(this.list.length == 0) {
                    return [0,0];
                } else {
                    let si = (this.pageIndex - 1) * this.showSize + 1, ei = this.pageIndex * this.showSize;
                    ei = Math.min(this.list.length,ei);
                    return [si,ei];
                }
            },
            //数据的总页码
            pageTotal(){
                return Math.ceil(this.list.length/this.showSize);
            },
            //table需要显示的页码
            pageNums() {
                let pageNumArr = null;
                if(this.pageTotal < 10) {
                    pageNumArr = this.pageTotal;
                } else {
                    if(this.pageIndex < 5 || this.pageIndex > this.pageTotal-4) {
                        pageNumArr = [1,2,3,4,"...",this.pageTotal-3,this.pageTotal-2,this.pageTotal-1,this.pageTotal];
                    } else {
                        pageNumArr = [1,"...",this.pageIndex-2,this.pageIndex-1,this.pageIndex,this.pageIndex+1,this.pageIndex+2,"...",this.pageTotal];
                    }
                }
                return pageNumArr;
            }
        },
        created() {
            this.setTableList();
        },
        methods: {
            setTableList() {
                this.localList = this.list.filter((o, i)=> i > (this.currNumIndex[0] - 2) && i < this.currNumIndex[1]);
            },
            //选择每页显示的数量
            tflSpanMoveIn() {
                this.sizeArrShow = true;
            },
            tflSpanMoveOut() {
                this.sizeArrShow = false;
            },
            //选择显示数量事件
            sizeClick(size) {
                this.showSize = size;
                this.pageIndex = 1;
                this.tflSpanMoveOut();
            },
            //页码切换
            pageChange(type, num) {
                if(type == 1) {
                    if((this.pageIndex > 1 && num == -1) || (this.pageIndex < this.pageTotal && num == 1)) {
                        this.pageIndex += num;
                    }
                } else if(type == 2) {
                    if(parseInt(num)) {
                        this.pageIndex = num;
                    }
                }
                this.setTableList();
            }

        },
        watch: {
            localList(nv){
                this.$emit('change', nv);
                immediate: true;
            },
            list(nv) {
                this.setTableList();
            },
            showSize(nv) {
                this.setTableList();
            }
        },
        mounted(){
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .table {
        height: 100%;
        display: flex;
        align-items: stretch;
        flex-direction: column;
        color: var(--font-color);
    }

    .table .t-head {
        height: 50px;
    }

    .t-body {
        flex: 1;
    }

    .t-head .th-tr,
    .t-body .tb-tr {
        display: flex;
        margin: 0 20px;
        line-height: 50px;
        background: var(--grey);
    }

    .t-body .tb-tr {
        background: var(--white);
    }

    .th-tr span,
    .tb-tr span {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0px 10px 0px 20px;
    }

    .tb-tr span.s-none {
        text-align: center;
    }

    .tb-tr:nth-child(2n){
        background: var(--thead-bg);
    }

    .table .t-foot {
        height: 51px;
        display: flex;
        border-top: 1px solid var(--border-color);
    }

    .t-foot .tf-left {
        width: 360px;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
    }

    .tf-left span {
        cursor: pointer;
        padding: 14px 0px;
        position: relative;
        transition: all 0.5s;
    }

    .tf-left span:hover {
        padding: 14px 20px;
        color: var(--blue);
    }

    .tf-left span:hover:after {
        top: 22px;
        right: 10px;
        content: "";
        position: absolute;
        border-bottom: solid 5px;
        border-left: solid 5px transparent;
        border-right: solid 5px transparent;
    }

    .tf-left span .tfl-size {
        top: -140px;
        right: 6px;
        width: 60px;
        line-height: 30px;
        position: absolute;
        color: var(--font-color);
        background: var(--white);
        border: 1px solid var(--border-color);
    }

    .tf-left span .tfl-size.none {
        display: none;
    }

    .tfl-size .tfls-item {
        cursor: pointer;
        text-align: center;
    }

    .tfl-size .tfls-item.active,
    .tfl-size .tfls-item:hover {
        color: var(--blue);
    }

    .t-foot .tf-right {
        flex: 1;
        display: flex;
        padding-right: 20px;
        justify-content: flex-end;
    }

    .tf-right .tfr-page {
        width: 32px;
        height: 32px;
        cursor: pointer;
        margin-top: 9px;
        margin-left: 4px;
        line-height: 30px;
        text-align: center;
        border: 1px solid var(--border-color);
    }

    .tf-right .tfr-page:hover,
    .tf-right .tfr-page.active {
        color: var(--white);
        background: var(--blue);
    }

    .tf-right .tfr-page.tfrp-prev,
    .tf-right .tfr-page.tfrp-next {
        position: relative;
    }

    .tf-right .tfr-page.tfrp-prev:before,
    .tf-right .tfr-page.tfrp-next:before {
        top: 9px;
        left: 12px;
        width: 8px;
        height: 8px;
        content: "";
        position: absolute;
        border-left: double 4px;
        transform: rotate(45deg);
        border-bottom: double 4px;
    }

    .tf-right .tfr-page.tfrp-next:before {
        left: 6px;
        transform: rotate(225deg);
    }

    .tf-right .tfr-page.tfrp-prev:hover,
    .tf-right .tfr-page.tfrp-next:hover {
        background: transparent;
        color: var(--font-color);
        border: 1px solid var(--blue);
    }

    .tf-right .tfr-page.tfrp-prev:hover:before,
    .tf-right .tfr-page.tfrp-next:hover:before {
        border-left: double 4px var(--blue);
        border-bottom: double 4px var(--blue);
    }
display: flex;
</style>
