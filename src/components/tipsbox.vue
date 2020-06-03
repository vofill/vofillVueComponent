/**
**提示框组件
**vofill
**2020-05-07
**/

<template>
    <div class="tipsbox" v-if="localShow">
        <div class="tb-box">
            <div class="tbb-top" v-if="localType < 3">
                {{localTitle}}
                <div class="tbbt-close" @click="closeTipsbox"></div>
            </div>
            <div class="tbb-body">{{localContent}}</div>
            <div class="tbb-foot" v-if="localType < 3">
                <button class="tbbf-btn tbbfb-cancel" @click="closeTipsbox" v-show="localType==1">取消</button>
                <button class="tbbf-btn tbbfb-ok" @click="okTipsbox">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vofill-tipsbox",
        props: {              //prop接收传过来的参数
            type: Number,
            title: String,
            content: String,
            show: {default: false}
        },
        data () {
            return {
                localType: this.type ? this.type : 1,
                localShow: this.show ? this.show : false,
                localTitle: this.title && this.title.length > 0 ? this.title : " ",
                localContent: this.content && this.content.length > 0 ? this.content : " "
            }
        },
        created() {
            this._body = document.querySelector("body");
        },
        computed:{
        },
        methods: {
            //打开弹出框
            openTipsbox() {
                if(this.localShow) {
                    this._body.classList.add("tbgMask");
                    if(this.localType == 3) {
                        let obj = this;
                        setTimeout(function() {
                            obj.closeTipsbox();
                        },2000);
                    }
                } else {
                    this._body.classList.remove("tbgMask");
                }
            },
            //弹出框确定按钮
            okTipsbox() {
                this.closeTipsbox();
                if(this.localType == 2) {
                    this.$emit('clickOkTipsboxToParent');
                }
                
            },
            //关闭弹出框按钮
            closeTipsbox() {
                this.localShow = false;
                this.$emit("update:show",false);
            }
        },
        watch: {
            type(nv) {
                this.localType = nv;
            },
            show(nv) {
                this.localShow = nv;
                this.openTipsbox();
            },
            title(nv) {
                this.localTitle = nv;
            },
            content(nv) {
                this.localContent = nv;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .tipsbox {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 198;
        position: absolute;
    }

    .tipsbox .tb-box {
        top: 20%;
        left: 30%;
        z-index: 199;
        width: 400px;
        display: flex;
        position: absolute;
        border-radius: 5px;
        flex-direction: column;
        background: var(--white);
        color: var(--font-color);
    }

    .tb-box .tbb-top {
        width: 100%;
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        text-align: center;
        position: relative;
        border-bottom: 2px solid var(--border-color);
    }

    .tbb-top .tbbt-close {
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        background: url("../assets/close.png");
    }

    .tb-box .tbb-body {
        display: flex;
        line-height: 30px;
        padding: 30px 0px;
        justify-content: center;
    }

    .tb-box .tbb-foot {
        height: 60px;
        display: flex;
        flex-direction: row-reverse;
    }

    .tbb-foot .tbbf-btn {
        width: 80px;
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
        margin-right: 20px;
    }

    .tbb-foot .tbbf-btn.tbbfb-ok {
        color: var(--white);
        background: var(--blue);
    }

    .tbb-foot .tbbf-btn.tbbfb-cancel {
        border: 1px solid var(--border-color);
    }
</style>