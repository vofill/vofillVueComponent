/**
**加载动画组件
**vofill
**2020-05-05
**/

<template>
    <div class="loading" v-if="localShow">
        <div class="l-box">
            <div class="top"></div>
            <div class="bottom"></div>
            <div class="line"></div>
        </div>
        <div class="title">{{localTitle}}</div>
    </div>
</template>

<script>
    export default {
        name: "vofill-loading",
        props: {
            title: String,
            show: {default: false}
        },
        data () {
            return {
                localShow: this.show ? this.show : false,
                localTitle: this.title && this.title.length > 0 ? this.title : "加载中"
            }
        },
        created() {
            this._body = document.querySelector("body");
        },
        computed:{
        },
        methods: {
            openLoading() {
                if(this.localShow) {
                    this._body.classList.add("lbgMask");
                } else {
                    this._body.classList.remove("lbgMask");
                }
            }
        },
        watch: {
            show(nv, ov) {
                this.localShow = nv;
                this.openLoading();
            },
            title(nv) {
                this.localTitle = nv;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .loading {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 198;
        position: absolute;
    }

    .loading .l-box {
        top: 30%;
        left: 40%;
        z-index: 199;
        width: 160px;
        height: 160px;
        position: absolute;
        margin: -80px 0px 0px -80px;
        animation: loader 3s cubic-bezier(0.7, 0, 0.2, 1) infinite;
    }

    @keyframes loader {
        90% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(180deg);
        }
    }

    .l-box .top {
        width: 4px;
        height: 0px;
        transform-origin: 50% 100%;
        animation: top 3s linear infinite;
        border-top: 80px solid var(--blue); 
        border-left: 80px solid transparent;
        border-right: 80px solid transparent;
    }

    @keyframes top {
        90% {
            transform: scale(0);
        }
        100% {
            transform: scale(0);
        }
    }

    .l-box .bottom {
        width: 4px;
        height: 0px;
        transform: scale(0);
        transform-origin: 50% 100%;
        animation: bottom 3s linear infinite;
        border-right: 80px solid transparent;
        border-left: 80px solid transparent;
        border-bottom: 80px solid var(--blue);
    }

    @keyframes bottom {
        10% {
            transform: scale(0);
        }
        90% {
            transform: scale(1);
        }
        100% {
            transform: scale(1);
        }
    }
    .l-box .line {
        top: 78px;
        left: 78px;
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 4px solid var(--blue);
        animation: line 3s linear infinite;
    }

    @keyframes line {
        10% {
            height: 80px;
        }
        100% {
            height: 80px;
        }
    }

    .loading .title {
        top: 30%;
        left: 40%;
        z-index: 200;
        width: 160px;
        height: 40px;
        font-size: 30px;
        line-height: 40px;
        text-align: center;
        position: absolute;
        color: var(--white);
        margin: -20px 0px 0px -80px;
    }
</style>