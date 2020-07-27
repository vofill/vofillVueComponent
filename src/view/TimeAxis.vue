<template>
    <div>
        <div class="time-axis1">
            <div class="ta-title">时间轴组件一</div>
            <vofill-time-axis :type=1 :list="dataList"></vofill-time-axis>
        </div>
        <div class="time-axis2">
            <div class="ta-title">时间轴组件二</div>
            <vofill-time-axis :type=2 :list="dataList"></vofill-time-axis>
        </div>
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
                dataList: [{Id: 1, Title: "这是一个标题", Content: "这是具体内容", Date: "2020-06-03", Image: "https://bim.jsvrt.com/shopFile/huntShop/Image/9f0486d6-fb38-254e-8056-4d0dc3e4e11a.jpg"},
                            {Id: 2, Title: "这是一个标题", Content: "这是具体内容", Date: "2020-06-03", Image: "https://bim.jsvrt.com/shopFile/huntShop/Image/2947fc3e-2375-242a-c6c2-02f8b0c7eef5.jpg"},
                            {Id: 3, Title: "这是一个标题", Content: "这是具体内容这是具体内容", Date: "2020-06-03", Image: "https://bim.jsvrt.com/shopFile/huntShop/Image/674784ff-5e4b-fb09-23d1-6585cf69139f.jpg"},
                            {Id: 4, Title: "这是一个标题", Content: "这是具体内容", Date: "2020-06-03", Image: "https://bim.jsvrt.com/shopFile/huntShop/Image/cdf9b108-179a-15d5-4934-850a708e4e15.jpg"},
                            {Id: 5, Title: "这是一个标题", Content: "这是具体内容", Date: "2020-06-03", Image: "https://bim.jsvrt.com/shopFile/huntShop/Image/451138dd-65a8-cbd3-f471-0efff5dc1907.jpg"}]
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .time-axis1 .ta-title,
    .time-axis2 .ta-title {
        width: 100%;
        height: 80px;
        font-size: 20px;
        line-height: 80px;
        padding-left: 200px;
        color: var(--font-color);
    }
</style>
