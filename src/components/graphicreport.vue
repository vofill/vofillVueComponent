/**
**图形报表组件
**vofill
**2020-06-02
**/

<template>
    <div class="graphicreport" id="vofillChart">
    </div>
</template>

<script>
    export default {
        name: "vofill-graphicreport",
        props: {
            type: {default: 1}
        },
        data () {
            return {
                localType: this.type
            }
        },
        created() {
        },
        computed:{
        },
        mounted() {
             // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(document.getElementById('vofillChart'))
            if(this.localType == 1) {//柱状图
                this.drawBarGraph();
            } else if(this.localType == 2) {//折线图
                this.drawBrokenLine();
            }
            
        },
        methods: {
            drawBarGraph() {
                var obj = this;
                var dataXAxis = ["周一","周二","周三","周四","周五","周六","周日"];
                var dataYAxis = [220, 182, 191, 234, 290, 330, 310];
                // 绘制柱状图表
                obj.myChart.setOption({
                    title: {//标题组件，包含主标题和副标题
                        text: '每周销售报告',
                        show: false,
                        textStyle: {
                            fontSize: 16,
                            color: "#485778",
                            fontWeight: "normal"
                        }
                    },
                    tooltip: {},//提示框组件
                    xAxis: {//设置X轴
                        data: dataXAxis,
                        axisLabel: {//坐标轴刻度标签的相关设置
                            inside: false,//刻度标签是否朝内，默认朝外
                            textStyle: {//设置字体样式
                                color: '#485778'
                            }
                        },
                        axisTick: {//坐标轴刻度相关设置
                            show: false//是否显示坐标轴刻度
                        },
                        axisLine: {//坐标轴轴线相关设置
                            show: false//是否显示坐标轴轴线
                        },
                        z: 10//X 轴组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#485778'
                            }
                        }
                    },
                    dataZoom: [//用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响
                        {
                            type: 'inside'
                        }
                    ],
                    series: [
                        { // 阴影部分
                            type: 'bar',//图标类型
                            itemStyle: {//图形样式
                                color: 'rgba(0,0,0,0.05)'
                            },
                            barGap: '-100%',//不同系列的柱间距离，为百分比（如 '30%'，表示柱子宽度的 30%）
                            barCategoryGap: '40%',//同一系列的柱间距离，默认为类目间距的20%，可设固定值
                            data: [400, 400, 400, 400, 400, 400, 400],//数据
                            animation: false//是否开启动画
                        },
                        {
                            type: 'bar',
                            itemStyle: {
                                color: new obj.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'}
                                    ]
                                )
                            },
                            emphasis: {//高亮的图形样式和标签样式。
                                itemStyle: {
                                    color: new obj.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                            data: dataYAxis
                        }
                    ]
                });

                var zoomSize = 6;
                obj.myChart.on('click', function (params) {
                    obj.myChart.dispatchAction({
                        type: 'dataZoom',
                        startValue: dataXAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                        endValue: dataXAxis[Math.min(params.dataIndex + zoomSize / 2, dataYAxis.length - 1)]
                    });
                });
            },
        },
        watch: {
            type(nv) {
                this.localType = nv;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .graphicreport {
        width: 400px;
        height: 400px;
    }
</style>