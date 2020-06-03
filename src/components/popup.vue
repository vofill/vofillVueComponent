/**
**弹出页面组件
**vofill
**2020-05-07
**/

<template>
    <div class="popup" v-if="localShow">
        <div class="p-box">
            <div class="pb-top">
                {{localTitle}}
                <div class="pbt-close" @click="closePopup"></div>
            </div>
            <vofill-scroll :height="scrollHeight">
                <div class="pb-body">
                    <slot></slot>
                </div>
            </vofill-scroll>
            <div class="pb-foot">
                <button class="pbf-btn pbfb-cancel" @click="closePopup">取消</button>
                <button class="pbf-btn pbfb-ok" @click="okPopup">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    import vofillScroll from './scroll'

    export default {
        name: "vofill-popup",
        components: {
            vofillScroll
        },
        props: {              //prop接收传过来的参数
            title: String,
            show: {default: false}
        },
        data () {
            return {
                scrollHeight: "460px",
                localShow: this.show ? this.show : false,
                localTitle: this.title && this.title.length > 0 ? this.title : " "
            }
        },
        created() {
            this._body = document.querySelector("body");
        },
        computed:{
        },
        methods: {
            //打开弹出框
            openPopup() {
                if(this.localShow) {
                    this._body.classList.add("pbgMask");
                } else {
                    this._body.classList.remove("pbgMask");
                }
            },
            //弹出框确定按钮
            okPopup() {
                this.closePopup();
                this.$emit('clickOkPopupToParent');
            },
            //关闭弹出框按钮
            closePopup() {
                this.localShow = false;
                this.$emit("update:show",false);
            }
        },
        watch: {
            show(nv) {
                this.localShow = nv;
                this.openPopup();
            },
            title(nv) {
                this.localTitle = nv;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .popup {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 150;
        position: absolute;
    }

    .p-box {
        top: 50%;
        left: 42%;
        width: 600px;
        z-index: 160;
        display: flex;
        min-height: 400px;
        max-height: 600px;
        position: absolute;
        flex-direction: column;
        background: var(--white);
        color: var(--font-color);
        margin: -400px 0px 0px -300px;
    }

    .p-box .pb-top {
        width: 100%;
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        text-align: center;
        position: relative;
        border-bottom: 2px solid var(--border-color);
    }

    .pb-top .pbt-close {
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        background: url("../assets/close.png");
    }

    .p-box .pb-body {
        flex: 1;
        padding: 10px 30px 0px 10px;
    }

    .p-box .pb-foot {
        height: 80px;
        display: flex;
        flex-direction: row-reverse;
        border-top: 1px solid var(--border-color);
    }

    .pb-foot .pbf-btn {
        width: 80px;
        height: 40px;
        cursor: pointer;
        margin-top: 20px;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
        margin-right: 20px;
    }

    .pb-foot .pbf-btn.pbfb-ok {
        color: var(--white);
        background: var(--blue);
    }

    .pb-foot .pbf-btn.pbfb-cancel {
        border: 1px solid var(--border-color);
    }
</style>