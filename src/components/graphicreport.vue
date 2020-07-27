/**
**图形报表组件
**vofill
**2020-06-02
**/

<template>
    <div class="graphicreport" :id="generateId">
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
            generateId() {
                return "vofillChart_" + this.localType
            }
        },
        mounted() {
             // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(document.getElementById('vofillChart_' + this.localType))
            if(this.localType == 1) {//柱状图
                this.drawBarGraph();
            } else if(this.localType == 2) {//柱状图2
                this.drawBarGraph2();
            } else if(this.localType == 3) {//平滑折线图
                this.drawBrokenLine();
            } else if(this.localType == 4) {//折点折线图
                this.drawBrokenLine2();
            } else if(this.localType == 5) {//定制饼图
                this.drawCustomizedPie();
            }
            
        },
        methods: {
            //柱状图
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
            //柱状图
            drawBarGraph2() {
                var obj = this;
                // 绘制柱状图表
                obj.myChart.setOption({
                    title: {//标题组件，包含主标题和副标题
                        text: '年度报告',
                        show: false,
                        textStyle: {
                            fontSize: 16,
                            color: "#485778",
                            fontWeight: "normal"
                        }
                    },
                    legend: {},
                    tooltip: {},//提示框组件
                    dataset: {
                        source: [
                            ['product', '2012', '2013', '2014', '2015'],
                            ['件杂货', 41.1, 30.4, 65.1, 53.3],
                            ['散杂货', 24.1, 67.2, 79.5, 86.4],
                            ['集装箱', 86.5, 92.1, 85.7, 83.1]
                        ]
                    },
                    xAxis: [//设置X轴
                        {type: 'category', gridIndex: 0}
                    ],
                    yAxis: [
                        {gridIndex: 0}
                    ],
                    grid: [
                        {bottom: '5%'}
                    ],
                    series: [
                        {
                            type: 'bar',
                            seriesLayoutBy: 'row',
                            itemStyle:{
                                normal:{
                                    color:'#3981e3', //折点颜色
                                    lineStyle:{
                                        color:'#3981e3' //折线颜色
                                    }
                                }
                            }
                        },
                        {
                            type: 'bar',
                            seriesLayoutBy: 'row',
                            itemStyle:{
                                normal:{
                                    color:'#4aa55d', //折点颜色
                                    lineStyle:{
                                        color:'#4aa55d' //折线颜色
                                    }
                                }
                            }
                        },
                        {
                            type: 'bar',
                            seriesLayoutBy: 'row',
                            itemStyle:{
                                normal:{
                                    color:'#d2322d', //折点颜色
                                    lineStyle:{
                                        color:'#d2322d' //折线颜色
                                    }
                                }
                            }
                        }
                    ]
                });
            },
            //折线图
            drawBrokenLine() {
                var obj = this;
                // 绘制柱状图表
                obj.myChart.setOption({
                    title: {//标题组件，包含主标题和副标题
                        text: '年度报告',
                        show: false,
                        textStyle: {
                            fontSize: 16,
                            color: "#485778",
                            fontWeight: "normal"
                        }
                    },
                    legend: {},
                    tooltip: {},//提示框组件
                    dataset: {
                    },
                    xAxis: {//设置X轴
                        type: 'category',
                        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line',
                            smooth: true,
                            //symbol: 'circle',     //折点设定为实心点
                            //symbolSize: 20,   //设定实心点的大小
                            itemStyle:{
                                normal:{
                                    color:'#3981e3', //折点颜色
                                    lineStyle:{
                                        color:'#3981e3' //折线颜色
                                    }
                                }
                            },
                            markPoint: {     //显示一定区域内的最大值和最小值
                                data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                                ]
                            }
                        },
                        {
                            data: [330, 500, 605, 750, 1400, 1200, 1500],
                            type: 'line',
                            smooth: true,
                            itemStyle:{
                                normal:{
                                    color:'#4aa55d', //折点颜色
                                    lineStyle:{
                                        color:'#4aa55d' //折线颜色
                                    }
                                }
                            }
                        }
                    ]
                });
            },
            //折线图
            drawBrokenLine2() {
                var obj = this;
                // 绘制柱状图表
                obj.myChart.setOption({
                    title: {//标题组件，包含主标题和副标题
                        text: '折线图堆叠',
                        show: false,
                        textStyle: {
                            fontSize: 16,
                            color: "#485778",
                            fontWeight: "normal"
                        }
                    },
                    legend: {
                        data: ['钢材', '汽车', '水泥', '重金属', '电缆']
                    },
                    tooltip: {//提示框组件
                        trigger: 'axis'
                    },
                    dataset: {
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {//工具栏组件
                        feature: {
                            //saveAsImage: {} //图片下载保存
                        }
                    },
                    xAxis: {//设置X轴
                        type: 'category',
                        boundaryGap: false,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '钢材',
                            type: 'line',
                            stack: '总量',
                            itemStyle:{
                                normal:{
                                    color:'#3981e3', //折点颜色
                                    lineStyle:{
                                        color:'#3981e3' //折线颜色
                                    }
                                }
                            },
                            data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 150, 200]
                        },
                        {
                            name: '汽车',
                            type: 'line',
                            stack: '总量',
                            itemStyle:{
                                normal:{
                                    color:'#ffba2a', //折点颜色
                                    lineStyle:{
                                        color:'#ffba2a' //折线颜色
                                    }
                                }
                            },
                            data: [220, 182, 191, 234, 290, 330, 310, 120, 180, 210, 60, 58]
                        },
                        {
                            name: '水泥',
                            type: 'line',
                            stack: '总量',
                            itemStyle:{
                                normal:{
                                    color:'#88c132', //折点颜色
                                    lineStyle:{
                                        color:'#88c132' //折线颜色
                                    }
                                }
                            },
                            data: [150, 232, 201, 154, 190, 330, 410, 188, 220, 360, 150, 246]
                        },
                        {
                            name: '重金属',
                            type: 'line',
                            stack: '总量',
                            itemStyle:{
                                normal:{
                                    color:'#4aa55d', //折点颜色
                                    lineStyle:{
                                        color:'#4aa55d' //折线颜色
                                    }
                                }
                            },
                            data: [320, 332, 301, 334, 390, 330, 320, 170, 230, 150, 100, 120]
                        },
                        {
                            name: '电缆',
                            type: 'line',
                            stack: '总量',
                            itemStyle:{
                                normal:{
                                    color:'#d2322d', //折点颜色
                                    lineStyle:{
                                        color:'#d2322d' //折线颜色
                                    }
                                }
                            },
                            data: [820, 932, 901, 934, 1290, 1330, 1320, 1000, 860, 720, 300, 1500]
                        }
                    ]
                });
            },
            //定制饼图
            drawCustomizedPie() {
                
            }
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
        width: 100%;
        height: 400px;
    }
</style>