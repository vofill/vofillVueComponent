<style>
    @import "/style/reset.css";
    @import "/style/global.css";
    @import "/style/index.css";
</style>

<template>
    <div id="app" class="home-page">
        <div class="hp-top">
            <div class="hpt-logo">
                <span class="hptl-pic"><img src="./assets/logo.png"></span>
                <span class="hptl-info">vofill.js</span>
            </div>
            <div class="hpt-user">
                <div class="hptu-name">{{username}}</div>
                <div class="hptu-pic"><img src="./assets/logo.png"></div>
            </div>
        </div>
        <div class="hp-left" id="hpLeft">
            <vofill-scroll :height="leftScrollHeight">
                <div class="hpl-menu">
                    <router-link v-for="(item, index) in menuItems" :key="index" tag="div" :class="['hplmi-row', `icon-${item.Class}`, {'active':menuActive==item.Id}]" @click.native="menuActive=item.Id,naviInfo=item.Name" :to="item.Url" >
                        {{item.Name}}
                    </router-link>
                </div>
            </vofill-scroll>
        </div>
        <div class="hp-right">
            <div class="hpr-navi">
                <div class="hprn-tag">
                    <span>{{naviInfo}}</span>
                </div>
            </div>
            <div class="hpr-page" id="hprPage">
                <vofill-scroll :height="pageScrollHeight">
                    <router-view></router-view>
                </vofill-scroll>
            </div>
        </div>
    </div>
</template>

<script>
    import vofillScroll from './components/scroll'
    import vofill from "./js/common/vofill.js";
    vofill.Init();

    export default {
        name: 'App',
        components: {
            vofillScroll
        },
        data(){
            return {
                leftScrollHeight: "",
                pageScrollHeight: "",
                menuActive: 1,
                naviInfo: "",
                menuItems: [{Id: 1, Name: "首页", Url: "Index", Class:"home"}, {Id: 2, Name: "通用组件", Url: "component", Class:"component"},
                            {Id: 3, Name: "table组件", Url: "table", Class:"table"}, {Id: 4, Name: "滑块组件", Url: "slider", Class:"slider"},
                            {Id: 5, Name: "进度条组件", Url: "progressBar", Class:"progress"}, {Id: 6, Name: "左右选择组件", Url: "lrSelect", Class:"lrselect"},
                            {Id: 7, Name: "树状结构组件", Url: "tree", Class:"tree"}, {Id: 8, Name: "时间轴组件", Url: "timeaxis", Class:"timeaxis"},
                            {Id: 9, Name: "图形报表组件", Url: "graphicReport", Class:"report"}, {Id: 10, Name: "拖拽组件", Url: "dragAndDrop", Class:"dragdrop"},
                            {Id: 11, Name: "测试页面", Url: "test", Class:"test"}],
                username: "测试人员"
            }
        },
        computed:{
        },
        mounted() {
            let leftHeight = vofill.getBrowserInfo("hpLeft").Height;
            this.leftScrollHeight = (leftHeight - 20) + "px";
            this.pageScrollHeight = vofill.getBrowserInfo("hprPage").Height + "px";
        }
    }
</script>