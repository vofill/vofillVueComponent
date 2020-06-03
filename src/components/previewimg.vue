/**
**提示框组件
**vofill
**2020-05-07
**/

<template>
    <div class="previewimg" v-if="localShow">
        <template v-if="localType==1">
            <div class="pi-image" v-for="(o, i) in localList" :key="i" v-if="localIndex==i">
                <img :src="o" />
                <div class="pii-close" @click="closePrevImgbox"></div>
                <div class="pii-prev" @click="switchImgClick(1, -1)"></div>
                <div class="pii-next" @click="switchImgClick(1, 1)"></div>
                <div class="pii-points">
                    <div class="piip-item" v-for="(oo, ii) in localList" :key="ii"><div :class="['piipi-point', {'active': localIndex==ii}]" @click="switchImgClick(2, ii)"></div></div>
                </div>
            </div>
        </template>
        <template v-if="localType==2">
            <div class="pi-image2">
                <div class="pii2-imgbox">
                    <div :class="['pii2ib-item', {'pii2ib-i1': i == (localIndex==0?localList.length -1:localIndex - 1)}, {'pii2ib-i2': i == localIndex}, {'pii2ib-i3': i == (localIndex==localList.length -1?0:localIndex + 1)}]" v-for="(o, i) in localList" :key="i"  v-show="(i == (localIndex==0?localList.length -1:localIndex - 1)) || i == localIndex || (i == (localIndex==localList.length -1?0:localIndex + 1))">
                        <img :src="o" />
                    </div>
                </div>
                <div class="pii2-close" @click="closePrevImgbox"></div>
                <div class="pii2-prev" @click="switchImgClick(1, -1)"></div>
                <div class="pii2-next" @click="switchImgClick(1, 1)"></div>
                <div class="pii2-points">
                    <div class="pii2p-item" v-for="(oo, ii) in localList" :key="ii"><div :class="['pii2pi-point', {'active': localIndex==ii}]" @click="switchImgClick(2, ii)"></div></div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "vofill-tipsbox",
        props: {              //prop接收传过来的参数
            type: {default: 1},
            index: Number,
            list: Array,
            show: {default: false},
            autoplay: {default: false}
        },
        data () {
            return {
                localType: this.type,
                localShow: this.show,
                localIndex: this.index ? this.index : 0,
                localList: this.list ? this.list : []
            }
        },
        created() {
            this._body = document.querySelector("body");
        },
        computed:{
            localAutoplay() {
                return this.autoplay;
            }
        },
        methods: {
            //打开弹出框
            openPrevImgbox() {
                if(this.localShow) {
                    this._body.classList.add("pibgMask");
                } else {
                    this._body.classList.remove("pibgMask");
                }
            },
            //关闭弹出框按钮
            closePrevImgbox() {
                this.localShow = false;
                this.stopplayImg();
                this.$emit("update:show",false);
            },
            //切换图片
            switchImgClick(type, num) {
                if(type == 1) {
                    //if((this.localIndex == 0 && num == -1)
                    //    || (this.localIndex == this.localList.length - 1 && num == 1)) {
                    //    return false;
                    //}
                    if(this.localIndex == 0 && num == -1) {
                        this.localIndex = this.localList.length - 1;
                    } else if(this.localIndex == this.localList.length - 1 && num == 1) {
                        this.localIndex = 0;
                    } else {
                        this.localIndex += num;
                    }
                } else {
                    this.localIndex = num;
                }
                this.stopplayImg();
            },
            //自动播放图片
            autoplayImg() {
                let obj = this;
                this.autoplayInterval = setInterval(function() {
                    if(obj.localIndex == obj.localList.length - 1) {
                        obj.localIndex = 0;
                    } else {
                        obj.localIndex++;
                    }
                },1000);
            },
            //停止轮播图片
            stopplayImg() {
                if(this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                }
            }
        },
        watch: {
            type(nv) {
                this.localType = nv;
            },
            show(nv) {
                this.localShow = nv;
                this.openPrevImgbox();
                if(nv && this.localAutoplay) {
                    this.autoplayImg();
                }
            },
            index(nv) {
                this.localIndex = nv;
            },
            list(nv) {
                this.localList = nv;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .previewimg {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 198;
        position: absolute;
    }

    .previewimg .pi-image,
    .previewimg .pi-image2 {
        top: 40%;
        left: 45%;
        z-index: 199;
        width: 800px;
        height: 600px;
        display: flex;
        position: absolute;
        border-radius: 5px;
        margin-top: -300px;
        margin-left: -400px;
        flex-direction: column;
        background: var(--white);
        color: var(--font-color);
    }

    .previewimg .pi-image2 {
        background: transparent;
    }

    .pi-image img,
    .pii2ib-item img {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
    }

    .pi-image .pii-close,
    .pi-image2 .pii2-close {
        top: 0px;
        right: 0px;
        width: 60px;
        height: 60px;
        z-index: 210;
        cursor: pointer;
        position: absolute;
        border-radius: 0 0 0 60px; 
        background-color: rgba(0,0,0,0.6);
    }

    .pi-image .pii-close:before,
    .pi-image2 .pii2-close:before {
        top: 24px;
        left: 20px;
        width: 30px;
        height: 2px;
        content: "";
        position: absolute;
        background: var(--white);
        transform: rotate(45deg);
    }

    .pi-image .pii-close:after,
    .pi-image2 .pii2-close:after {
        top: 10px;
        left: 34px;
        width: 2px;
        height: 30px;
        content: "";
        position: absolute;
        background: var(--white);
        transform: rotate(45deg);
    }

    .pi-image .pii-prev,
    .pi-image .pii-next,
    .pi-image2 .pii2-prev,
    .pi-image2 .pii2-next {
        top: 50%;
        left: 0px;
        width: 50px;
        z-index: 210;
        height: 100px;
        cursor: pointer;
        margin-top: -50px;
        position: absolute;
        background-color: rgba(0,0,0,0.6);
    }

    .pi-image .pii-next,
    .pi-image2 .pii2-next {
        right: 0;
        left: unset;
    }

    .pi-image .pii-prev:before,
    .pi-image .pii-next:before,
    .pi-image2 .pii2-prev:before,
    .pi-image2 .pii2-next:before {
        top: 34px;
        left: 20px;
        content: "";
        width: 30px;
        height: 30px;
        z-index: 210;
        position: absolute;
        transform: rotate(-45deg);
        border-top: 2px solid var(--white);
        border-left: 2px solid var(--white);
    }

    .pi-image .pii-next:before,
    .pi-image2 .pii2-next:before {
        left: -1px;
        transform: rotate(135deg);
    }

    .pi-image .pii-points,
    .pi-image2 .pii2-points {
        left: 10%;
        width: 80%;
        bottom: 20px;
        z-index: 210;
        height: 100px;
        display: flex;
        position: absolute;
        flex-direction: row;
    }

    .pii-points .piip-item,
    .pii2-points .pii2p-item {
        flex: 1;
        height: 100%;
        position: relative;
    }

    .piip-item .piipi-point,
    .pii2p-item .pii2pi-point {
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        cursor: pointer;
        margin-top: -5px;
        margin-left: -5px;
        border-radius: 50%;
        position: absolute;
        background: var(--font-color);
    }

    .piip-item .piipi-point.active,
    .pii2p-item .pii2pi-point.active {
        background: var(--white);
    }

    .pii2-imgbox .pii2ib-item {
        top: 0px;
        left: 0px;
        opacity: 0;
        width: 800px;
        height: 600px;
        position: absolute;
        transition: all 0.3s ease;
    }

    .pii2-imgbox .pii2ib-item.pii2ib-i1 {
        opacity: 1;
        z-index: 201;
        transform: translate3d(-400px, 0, 0) scale(0.8);
    }

    .pii2-imgbox .pii2ib-item.pii2ib-i2 {
        opacity: 1;
        z-index: 203;
        transform: translate3d(0, 0, 0) scale(1);
    }
    
    .pii2-imgbox .pii2ib-item.pii2ib-i3 {
        opacity: 1;
        z-index: 202;
        transform: translate3d(400px, 0, 0) scale(0.8);
    }
</style>