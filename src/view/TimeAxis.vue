<template>
    <div class="page-body" id="pageId">
        <h1>{{ msg }}</h1>
        <vofill-scroll :height="scrollHeight">
            <div class="time-axis1">
                <div class="ta-title">时间轴组件一</div>
                <vofill-time-axis :type=1 :list="dataList"></vofill-time-axis>
            </div>
        </vofill-scroll>
    </div>
</template>

<script>
    import vofillTimeAxis from '../components/timeaxis'
    import vofillScroll from '../components/scroll'
    import vofill from "../js/common/vofill.js";

    export default {
        name: 'Table',
        components: {
            vofillTimeAxis,
            vofillScroll
        },
        data () {
            return {
                msg: 'Welcome to Your 时间轴组件页',
                scrollHeight: "780px",
                dataList: [{Id: 1, Title: "这是一个标题", Content: "这是具体内容", Date: "2020-06-03"}, {Id: 2, Title: "这是一个标题", Content: "这是具体内容", Date: "2020-06-03"},
                            {Id: 3, Title: "这是一个标题", Content: "这是具体内容这是具体内容", Date: "2020-06-03"}, {Id: 4, Title: "这是一个标题", Content: "这是具体内容", Date: "2020-06-03"},
                            {Id: 5, Title: "这是一个标题", Content: "这是具体内容", Date: "2020-06-03"}]
            }
        },
        created() {
        },
        mounted() {
            let pageHeight = vofill.getBrowserInfo("pageId").Height;
            this.scrollHeight = (pageHeight - 30) + "px";
        },
        methods: {
        },
        watch: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .time-axis1 .ta-title {
        width: 100%;
        height: 80px;
        font-size: 20px;
        line-height: 80px;
        padding-left: 200px;
        color: var(--font-color);
    }
</style>
