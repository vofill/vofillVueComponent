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
        <div class="hp-left">
            <div class="hpl-menu">
                <router-link v-for="(item, index) in menuItems" :key="index" tag="div" :class="['hplmi-row', `icon-${item.Class}`, {'active':menuActive==item.Id}]" @click.native="menuActive=item.Id" :to="item.Url" >
                    {{item.Name}}
                </router-link>
            </div>
        </div>
        <div class="hp-right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import vofill from "./js/common/vofill.js";
    vofill.Init();

    export default {
      name: 'App',
      data(){
          return {
              menuActive: 1,
              menuItems: [{Id: 1, Name: "首页", Url: "Index", Class:"home"}, {Id: 2, Name: "通用组件", Url: "component", Class:"component"},
                          {Id: 3, Name: "table组件", Url: "table", Class:"table"}, {Id: 4, Name: "滑块组件", Url: "slider", Class:"slider"},
                          {Id: 5, Name: "进度条组件", Url: "progressBar", Class:"progress"}, {Id: 6, Name: "左右选择组件", Url: "lrSelect", Class:"lrselect"},
                          {Id: 7, Name: "树状结构组件", Url: "tree", Class:"tree"}, {Id: 8, Name: "时间轴组件", Url: "timeaxis", Class:"timeaxis"}],
              username: "测试人员"
          }
      }
    }
</script>