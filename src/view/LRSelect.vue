<style>
    @import "../style/reset.css";

    .rsl-box {
        width: 700px;
        height: 600px;
        margin-right: 100px;
        vertical-align: top;
        display: inline-block;
    }
</style>

<template>
    <div>
        <div class="rsl-box">
            <vofill-lrselect :type=1 :list="list" :sel-obj="selObj" sel-key="SelIds"></vofill-lrselect>
        </div>
        <div class="rsl-box">
            <vofill-lrselect :type=2 :list="list" :sel-obj="selObj" sel-key="SelIds"></vofill-lrselect>
        </div>
        <div class="rsl-box">
            <vofill-lrselect :type=3 :list="list2" :sel-obj="selObj" sel-key="SelIds"></vofill-lrselect>
        </div>
    </div>
</template>

<script>
    import vofillScroll from '../components/scroll'
    import vofillLrselect from '../components/lrselect'
    import vofill from "../js/common/vofill.js";

    export default {
        name: 'LRSelect',
        components: {
            vofillScroll,
            vofillLrselect
        },
        data () {
            return {
                list: [{Id: 1, Name: "选项1"}, {Id: 2, Name: "选项2"}, {Id: 3, Name: "选项3"},{Id: 4, Name: "选项4"}, {Id: 5, Name: "选项5"}, {Id: 6, Name: "选项6"}],
                list2: [{Id: 1, Name: "选项1", DeptId: 1, DeptName: "部门1"}, {Id: 2, Name: "选项2", DeptId: 1, DeptName: "部门1"},
                        {Id: 3, Name: "选项3", DeptId: 1, DeptName: "部门1"}, {Id: 4, Name: "选项4", DeptId: 1, DeptName: "部门1"},
                        {Id: 5, Name: "选项5", DeptId: 2, DeptName: "部门2"}, {Id: 6, Name: "选项6", DeptId: 2, DeptName: "部门2"}],
                selObj: {SelIds: "4,5"}
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
        },
        watch: {
        }
    }
</script>
