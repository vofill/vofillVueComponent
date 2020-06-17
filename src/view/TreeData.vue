<style>
    @import "../style/reset.css";

    .row-temp>.r-val>.tree-structure>.ts-box>.tsb-ul2>.tsbu2-item:first-child:before {
        top: 20px;
    }
</style>

<template>
    <div>
        <vofill-row name="树状结构1："><vofill-tree :list="treeData" @itemClickToParent="getItemInfo"></vofill-tree></vofill-row>
        <vofill-row class="row-temp" name="树状结构2："><vofill-tree :list="menuData" :type=2 @itemClickToParent="getItemInfo"></vofill-tree></vofill-row>
    </div>
</template>

<script>
    import vofillRow from '../components/row'
    import vofillScroll from '../components/scroll'
    import vofillTree from '../components/tree'
    import vofill from "../js/common/vofill.js";

    export default {
        name: 'Componet',
        components: {
            vofillRow,
            vofillScroll,
            vofillTree
        },
        data () {
            return {
                treeData: [],
                menuData: [],
                selObj: {SelId: "2"}
            }
        },
        created() {
            this.getTreeData();
        },
        mounted() {
        },
        methods: {
            getTreeData() {
                const obj = this;
                var data = [{Id: 1, PId: 0, Name: "数据1"}, {Id: 2, PId: 1, Name: "数据1-1"}, {Id: 3, PId: 1, Name: "数据1-2"},
                            {Id: 4, PId: 2, Name: "数据1-1-1"}, {Id: 5, PId: 2, Name: "数据1-1-2"}, {Id: 6, PId: 2, Name: "数据1-1-3"},
                            {Id: 7, PId: 3, Name: "数据1-2-1"}, {Id: 8, PId: 3, Name: "数据1-2-2"}, {Id: 9, PId: 0, Name: "数据2"},
                            {Id: 10, PId: 9, Name: "数据2-1"}, {Id: 11, PId: 10, Name: "数据2-1-1"}, {Id: 12, PId: 11, Name: "数据2-1-1-1"}];
                obj.treeData = vofill.listToTree(data, "Id", "PId", "Child");
                this.$http.get('static/menu.json').then(res => {
                    //此处的res对象包含了json的文件信息和数据，我们需要的json数据存在于body属性中
                    obj.menuData = res.body;
                })
            },
            getItemInfo(item) {
                console.log(item);
            }
        },
        watch: {
        }
    }
</script>
