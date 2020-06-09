/**
**滚动条组件
**vofill
**2020-05-08
**/

<template>
    <div class="scroll" ref="scrollBox"  unselectable="on" onselectstart="return false;" :style="scrollHeight">
        <div class="s-container" @scroll="containerScroll" ref="scrollContainer">
            <div class="sc-view" ref="scrollViewBox">
                <slot></slot>
            </div>
        </div>
        <!-- 右侧滚动条 -->
        <div class="s-vertical-box s-bar" :style="verticalStyle" ref="verticalBox" @mousedown="vBoxDown"></div>
        <!-- 下方滚动条 -->
        <div class="s-horizontal-box s-bar" :style="horizontalStyle" ref="horizontalBox"></div>
    </div>
</template>

<script>
    import domResize from "../js/common/domResize.js";

    export default {
        name: "vofill-scroll",
        props: {              //prop接收传过来的参数
           "width": String,
           "height": String
        },
        data () {
            return {
                scrollHeight: {
                    width: this.width ? this.width : "100%",
                    height: this.height ? this.height : "600px",
                    "-moz-user-select": "none"
                },
                verticalStyle: {
                    top: 0,
                    height: "60px",
                    transform: 'translateY(0)'
                },
                horizontalStyle: {
                    left: 0,
                    width: "0px"
                },
                viewHeight: 0,
                viewWidth: 0,
                vBarPageY: 0,
                hBarPageX: 0,
                vBarTranslateY: 0,
                vMouseFlag: false
            }
        },
        computed:{
        },
        mounted() {
            this.domResizeListener();
        },
        methods: {
            /**
            * @name vBoxDown
            * @description 竖直滚动条鼠标按下
            * @author vofill
            */
            vBoxDown(event) {
                document.removeEventListener("mousemove", this.vBoxMove);
                document.removeEventListener("mouseup", this.vBoxUp);
                this.vBarPageY = event.pageY;
                this.vMouseFlag = true;
                document.addEventListener("mousemove", this.vBoxMove);
                document.addEventListener("mouseup", this.vBoxUp);
            },
            /**
            * @name vBoxUp
            * @description 竖直滚动条鼠标放开
            * @author vofill
            */
            vBoxUp(event) {
                event.preventDefault();
                event.stopPropagation()
                this.vMouseFlag = false;
            },
            /**
            * @name vBoxMove
            * @description 竖直滚动条鼠标移动
            * @author vofill
            */
            vBoxMove(event) {
                if (!this.vMouseFlag) {
                    return;
                }
                let scrollBox = this.$refs.scrollBox;
                let verticalBox = this.$refs.verticalBox;
                let scrollContainer = this.$refs.scrollContainer;
                let scrollViewBox = this.$refs.scrollViewBox;
                let num = event.pageY - this.vBarPageY;
                this.vBarPageY = event.pageY;
                // let t_top = parseFloat(this.verticalStyle.top) + num;
                /**>>>> */
                let t_top = parseFloat(this.vBarTranslateY) + num;

                let max_top =
                    scrollBox.clientHeight - parseFloat(this.verticalStyle.height);
                // 判断是否超出滚动范围
                if (t_top <= 0) {
                    t_top = 0;
                } else if (max_top <= t_top) {
                    t_top = max_top;
                }
                // this.verticalStyle.top = t_top + "px";
                /**>>>>>> */
                this.verticalStyle.transform = "translateY(" + t_top + "px)";
                this.vBarTranslateY = t_top;
                if (scrollContainer.scrollTo) {
                    scrollContainer.scrollTo(
                    this.horizontalStyle.left,
                    (t_top * scrollViewBox.clientHeight) / scrollBox.clientHeight
                );
                } else {
                    scrollContainer.scrollTop = (t_top * scrollViewBox.clientHeight) / scrollBox.clientHeight;
                }
            },
            /**
            * @name containerScroll
            * @description scroll
            */
            containerScroll() {
                let scrollContainer = this.$refs.scrollContainer;
                let scrollBox = this.$refs.scrollBox;
                let scrollViewBox = this.$refs.scrollViewBox;
                // this.verticalStyle.top =
                //   (scrollBox.clientHeight * scrollContainer.scrollTop) /
                //     scrollViewBox.clientHeight +
                //   "px";
                /**>>>>>> */
                this.verticalStyle.transform = "translateY(" + (scrollBox.clientHeight * scrollContainer.scrollTop) / scrollViewBox.clientHeight + "px)";
                this.vBarTranslateY = (scrollBox.clientHeight * scrollContainer.scrollTop) / scrollViewBox.clientHeight;
            },
            /**
            * @name setBarHeight
            * @description 获取滚动条高度
            * @author vofill
            */
            setBarHeight() {
                let scrollBox = this.$refs.scrollBox;
                let scrollViewBox = this.$refs.scrollViewBox;
                let scrollContainer = this.$refs.scrollContainer;
                // 滚动条的高度
                let rate = scrollBox.clientHeight / scrollViewBox.clientHeight;
                if (rate >= 1) {
                    this.verticalStyle.height = 0;
                } else {
                    this.verticalStyle.height = scrollBox.clientHeight * rate + "px";
                    // 计算滚动条的位置
                    // this.verticalStyle.top =
                    //   (scrollBox.clientHeight * scrollContainer.scrollTop) /
                    //     scrollViewBox.clientHeight +
                    //   "px";
                    /**>>>>>> */
                this.verticalStyle.transform = "translateY(" + (scrollBox.clientHeight * scrollContainer.scrollTop) / scrollViewBox.clientHeight + "px)";
                this.vBarTranslateY = (scrollBox.clientHeight * scrollContainer.scrollTop) / scrollViewBox.clientHeight;
                }
            },
            /**
            * @name domResizeListener
            * @description dom元素的resize方法
            * @author vofill
            *  */
            domResizeListener() {
                domResize(this.$refs.scrollViewBox, ele => {
                    if (ele) {
                    let { contentRect: cont } = ele;
                    if (cont.height !== this.viewHeight) {
                        this.viewHeight = cont.height;
                        this.verticalBarChange();
                    } else if (cont.width !== this.viewWidth) {
                    }
                    }
                });
            },
            /**
            * @name verticalVBarChange
            * @description 右侧滚动条变化事件
            */
            verticalBarChange() {
                this.setBarHeight();
            },
            /**
            * @name horizontalBarChange
            * @description 底部滚动条变化事件
            */
            horizontalBarChange() {
                console.log(this.viewWidth);
            }
        },
        watch: {
            width(nv) {
                this.scrollHeight = {width: nv, height: this.height, "-moz-user-select": "none"};
            },
            height(nv) {
                this.scrollHeight = {width: this.width, height: nv, "-moz-user-select": "none"};
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .scroll {
        height: 100%;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
    }

    .scroll .s-container {
        height: 100%;
        margin-top: 0;
        overflow: scroll;
        overflow-x: hidden;
        margin-right: -17px;
        margin-bottom: -17px;
    }

    .s-container .sc-view {
        width: 100%;
    }

    .scroll .s-vertical-box {
        width: 6px;
        right: 2px;
        border-radius: 3px;
        position: absolute;
        background: var(--border-color);
    }

    .scroll .s-horizontal-box {
        height: 6px;
        bottom: 0px;
        border-radius: 3px;
        position: absolute;
        background: var(--border-color);
    }
</style>