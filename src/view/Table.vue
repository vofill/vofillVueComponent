<template>
    <div class="page-body" id="pageId">
        <h1>{{ msg }}</h1>
        <vofill-scroll :height="pageScrollHeight">
            <div class="search">
                <input type="text" v-model.trim="searchCont" />
            </div>
            <div class="table-box">
                <vofill-table :list="tableList" @change="(da)=>{tableShowList = da}">
                    <div class="th-tr" slot="thead">
                        <span v-for="(o, i) in tableHeadKey" :key="i">{{o}}</span>
                    </div>
                    <vofill-scroll :height="scrollHeight" slot="tbody">
                        <div class="tb-tr" v-for="(o, i) in tableShowList" :key="i">
                            <span v-for="(oo, ii) in tableHeadKey" :key="ii">{{o[ii]}}</span>
                        </div>
                    </vofill-scroll>
                </vofill-table>
            </div>
        </vofill-scroll>
    </div>
</template>

<script>
    import vofillTable from '../components/table'
    import vofillScroll from '../components/scroll'
    import vofill from "../js/common/vofill.js";

    export default {
        name: 'Table',
        components: {
            vofillTable,
            vofillScroll
        },
        data () {
            return {
                msg: 'Welcome to Your table页',
                scrollHeight: "600px",
                pageScrollHeight: "",
                tableHeadKey: {Id: "序号", Name: "姓名", Sex: "性别", Unit: "单位"},
                tableList: [],
                tableAllList: [],
                tableShowList: [],
                searchCont: ""
            }
        },
        created() {
            this.getTableList();
        },
        mounted() {
            let pageHeight = vofill.getBrowserInfo("pageId").Height;
            this.pageScrollHeight = (pageHeight - 30) + "px";
            console.log(this.pageScrollHeight)
        },
        methods: {
            getTableList() {
                this.tableAllList = this.tableList = [{Id: 1, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 2, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 3, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 4, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 5, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 6, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 7, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 8, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 9, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 10, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 11, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 12, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 13, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 14, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 15, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 16, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 17, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 18, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 19, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 20, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 21, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 22, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 23, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 24, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 25, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 26, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 27, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 28, Name: "张三", Sex: "男", Unit: "单位"},
                            {Id: 29, Name: "张三", Sex: "男", Unit: "单位"}, {Id: 30, Name: "张三", Sex: "男", Unit: "单位"}];
            }
        },
        watch: {
            tableShowList(nv) {
                //console.log("========", nv)
            },
            searchCont(nv) {
                if(nv.length > 0) {
                    this.tableList = [];
                    this.tableAllList.forEach(o=>{
                        if(o.Name.indexOf(nv) > -1) {
                            this.tableList.push(o);
                        }
                    });
                } else {
                   this.tableList = this.tableAllList;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .table-box {
        width: 800px;
        height: 700px;
    }

    .search {
        width: 450px;
        height: 40px;
        margin: 20px;
        position: relative;
    }

    .search input {
        padding-left: 12px;
        border: var(--input-border);
    }

    .search:after {
        top: 10px;
        right: 10px;
        content: "";
        width: 20px;
        height: 20px;
        position: absolute;
        background: url("../assets/search.png")
    }
</style>
