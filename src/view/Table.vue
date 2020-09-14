<template>
    <div>
        <div class="search">
            <input type="text" v-model.trim="searchCont" />
            <div class="s_set">
                <div class="ss_btn" @click="ssBtn">设置表列</div>
                <div class="ss_box" v-show="ssbShow">
                    <div class="ssb_list">
                        <vofill-scroll :height="scrollHeight2">
                            <div class="ssbl-row">
                                <div class="ssblr-item" v-for="(o, i) in tableHeadKey" :key="i">
                                    <div :class="['d-checkbox', {'checked': ssbItemArr.indexOf(o)>-1}]" @click="itemClick(o)"></div>
                                    <span>{{o}}</span>
                                </div>
                            </div>
                        </vofill-scroll>
                    </div>
                    <div class="ssb-foot">
                        <div class="sslf-btns"><span class="sslfb-ok" @click="sslConfim">确定</span></div>
                        <div class="sslf-btns"><span class="sslfb-cancle" @click="sslCancle">取消</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-box">
            <vofill-table :list="tableList" @change="(da)=>{tableShowList = da}">
                <div class="th-tr" slot="thead">
                    <span v-for="(o, i) in tableHeadKey" :key="i" v-if="ssbActive.indexOf(o)>-1">{{o}}</span>
                </div>
                <vofill-scroll :height="scrollHeight" slot="tbody">
                    <div class="tb-tr" v-for="(o, i) in tableShowList" :key="i">
                        <span v-for="(oo, ii) in tableHeadKey" :key="ii" v-if="ssbActive.indexOf(oo)>-1">{{o[ii]}}</span>
                    </div>
                </vofill-scroll>
            </vofill-table>
        </div>
    </div>
</template>

<script>
    import vofillTable from '../components/table'
    import vofillScroll from '../components/scroll'
    import vofill from "../js/common/vofill.js"

    export default {
        name: 'Table',
        components: {
            vofillTable,
            vofillScroll
        },
        data () {
            return {
                scrollHeight: "600px",
                scrollHeight2: "200px",
                tableHeadKey: {Id: "序号", Name: "姓名", Sex: "性别", Unit: "单位"},
                tableList: [],
                tableAllList: [],
                tableShowList: [],
                searchCont: "",
                ssbShow: false,
                ssbItemArr: ["序号", "姓名", "性别", "单位"],
                ssbActive: ["序号", "姓名", "性别", "单位"]
            }
        },
        created() {
            this.getTableList();
        },
        mounted() {
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
            },
            ssBtn() {
                this.ssbActive = this.ssbItemArr.concat();
                this.ssbShow = true;
            },
            itemClick(name) {
                var ind = this.ssbItemArr.indexOf(name);
                if(ind > -1) {
                    this.ssbItemArr.splice(ind, 1);
                } else {
                    this.ssbItemArr.push(name);
                }
            },
            sslConfim() {
                this.ssbActive = this.ssbItemArr.concat();
                this.ssbShow = false;
            },
            sslCancle() {
                this.ssbItemArr = this.ssbActive.concat();
                this.ssbShow = false;
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

    .search .s_set {
        top: 0;
        z-index: 10;
        width: 300px;
        right: -350px;
        position: absolute;
    }

    .s_set .ss_btn {
        width: 80px;
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        border-radius: 5px;
        color: var(--white);
        background: var(--blue);
    }

    .s_set .ss_box {
        width: 240px;
        max-height: 240px;
        margin-top: 10px;
        border-radius: 5px;
        background: var(--white);
        border: 1px solid var(--border-color);
    }

    .ss_box .ssb_list {
        width: 100%;
        max-height: 200px;
    }

    .ssb_list .ssbl-row {
        width: 100%;
        height: 32px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .ssbl-row .ssblr-item {
        width: 45%;
        height: 32px;
        line-height: 32px;
        margin-left: 10px;
    }

    .ssblr-item .d-checkbox {
        width: 14px;
        height: 14px;
    }

    .ssblr-item .d-checkbox.checked::after {
        top: -7px;
    }

    .ssblr-item span {
        font-size: 14px;
        padding-left: 5px;
    }

    .ss_box .ssb-foot {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        border-top: 1px solid var(--border-color);
    }

    .ssb-foot .sslf-btns {
        width: 50%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .sslf-btns span {
        font-size: 12px;
        cursor: pointer;
        padding: 2px 12px;
        border-radius: 4px;
        color: var(--white);
    }

    .sslf-btns span.sslfb-ok {
        margin-left: 20px;
        background: var(--blue);
    }

    .sslf-btns span.sslfb-cancle {
        margin-right: 20px;
        background: var(--border-color);
    }
</style>
