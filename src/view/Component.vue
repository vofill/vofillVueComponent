<style>
    @import "../style/reset.css";

    .comp-page .row {
        padding-right: 10px !important;
    }

    .img-box {
        display: flex;
        flex-direction: row;
    }

    .img-box .ib-item {
        width: 100px;
        height: 100px;
        cursor: pointer;
        margin-right: 20px;
    }

    .ib-item img {
        width: 100%;
        height: 100%;
    }
</style>

<template>
    <div class="comp-page">
        <vofill-row name="按钮1：">
            <vofill-button></vofill-button>
            <vofill-button title="默认"></vofill-button>
            <vofill-button :disabled="1" title="不可操作"></vofill-button>
            <vofill-button class="green" :disabled="buttonDisabled" title="加载动画" @buttonClickToParent="uploding"></vofill-button>
            <vofill-button class="orange" :disabled="buttonDisabled" title="提示框1" @buttonClickToParent="promptBox1"></vofill-button>
            <vofill-button class="delete red" :disabled="buttonDisabled" title="提示框2" @buttonClickToParent="promptBox2"></vofill-button>
            <vofill-button class="blue" :disabled="buttonDisabled" title="提示框3" @buttonClickToParent="promptBox3"></vofill-button>
        </vofill-row>
        <vofill-row name="按钮2：">
            <vofill-button class="add blue" :disabled="buttonDisabled" title="新增" @buttonClickToParent="addUser"></vofill-button>
            <vofill-button class="update blue" :disabled="buttonDisabled" title="修改" @buttonClickToParent="addUser"></vofill-button>
            <vofill-button class="edit blue" :disabled="buttonDisabled" title="编辑" @buttonClickToParent="addUser"></vofill-button>
            <vofill-button class="detail blue" :disabled="buttonDisabled" title="详情" @buttonClickToParent="addUser"></vofill-button>
            <vofill-button class="delete blue" :disabled="buttonDisabled" title="删除" @buttonClickToParent="promptBox2"></vofill-button>
        </vofill-row>
        <vofill-row name="switch：">
            <vofill-switch :list="switchList1" :type=1 :sel-obj="selObj" sel-key="SwitchId1"></vofill-switch>
            <vofill-switch :list="switchList2" :type=2 :sel-obj="selObj" sel-key="SwitchId2"></vofill-switch>
            <vofill-switch :list="switchList1" :type=3 :sel-obj="selObj" sel-key="SwitchId3"></vofill-switch>
            <vofill-switch :list="switchList1" :type=4 :sel-obj="selObj" sel-key="SwitchId4"></vofill-switch>
            <vofill-switch :list="switchList1" :type=5 :sel-obj="selObj" sel-key="SwitchId5"></vofill-switch>
            <vofill-switch :list="switchList1" :type=6 :sel-obj="selObj" sel-key="SwitchId6"></vofill-switch>
            <vofill-switch :list="switchList1" :type=7 :sel-obj="selObj" sel-key="SwitchId7"></vofill-switch>
            <vofill-switch :list="switchList1" :type=8 :sel-obj="selObj" sel-key="SwitchId8"></vofill-switch>
            <vofill-switch :list="switchList1" :type=9 :sel-obj="selObj" sel-key="SwitchId9"></vofill-switch>
            <vofill-switch :list="switchList1" :type=10 :sel-obj="selObj" sel-key="SwitchId10"></vofill-switch>
            <vofill-switch :list="switchList1" :type=11 :sel-obj="selObj" sel-key="SwitchId11"></vofill-switch>
        </vofill-row>
        <vofill-row name="文件上传："><vofill-fileupload :list="fileList"></vofill-fileupload></vofill-row>
        <vofill-row name="图片查看1：">
            <div class="img-box">
                <div class="ib-item" v-for="(o, i) in imgList" :key="i" @click="previewImgClick(i)"><img :src="o" /></div>
            </div>
        </vofill-row>
        <vofill-row name="图片查看2：">
            <div class="img-box">
                <div class="ib-item" v-for="(o, i) in imgList" :key="i" @click="previewImgClick2(i)"><img :src="o" /></div>
            </div>
        </vofill-row>
        <vofill-preview-img :type="prevImgType" :list="imgList" :index="currIndex" :show.sync="previewImgFlag" :autoplay.sync="autoplayImgFlag"></vofill-preview-img>
        <vofill-row name="姓名：" class="must"><input type="text" /></vofill-row>
        <vofill-row name="手机号："><input type="text" /></vofill-row>
        <vofill-row name="单选下拉1："><vofill-select :list="list" :sel-obj="selObj" sel-key="SelId"></vofill-select></vofill-row>
        <vofill-row name="单选下拉2："><vofill-select :list="list2" :type=2 :sel-obj="selObj" sel-key="SelName"></vofill-select></vofill-row>
        <vofill-row name="多选下拉1："><vofill-select :list="list" :type=3 :sel-obj="selObj" sel-key="SelIds"></vofill-select></vofill-row>
        <vofill-row name="多选下拉2："><vofill-select :list="list2" :type=4 :sel-obj="selObj" sel-key="SelNames"></vofill-select></vofill-row>
        <vofill-row name="级联1：">
            <vofill-cascade :title-list="['年份', '月份', '日期']" :fir-list="cascadeFirList" :sec-list="cascadeSecList" :thd-list="cascadeThdList" :sel-obj="selObj" sel-key="CascadeVal" @notice-to-parent1="toGetSecList" @notice-to-parent2="toGetThdList" @notice-to-parent3="toChangeThdVal"></vofill-cascade>
        </vofill-row>
        <vofill-row name="级联2：">
            <vofill-cascade :title-list="['省份', '城市', '区县']" :fir-list="provinceList" :sec-list="cityList" :thd-list="countyList" :sel-obj="selObj" sel-key="AreaVal" @notice-to-parent1="toGetCityList" @notice-to-parent2="toGetCountyList" @notice-to-parent3="toChangeCountyVal"></vofill-cascade>
        </vofill-row>
        <vofill-row name="单选："><vofill-radio :list="radioList1" :sel-obj="selObj" sel-key="RadioId"></vofill-radio></vofill-row>
        <vofill-row name="单选2："><vofill-radio :list="radioList2" :type=2 :sel-obj="selObj" sel-key="RadioName"></vofill-radio></vofill-row>
        <vofill-row name="多选："><vofill-checkbox :list="checkboxList1" :sel-obj="selObj" sel-key="CheckboxIds"></vofill-checkbox></vofill-row>
        <vofill-row name="多选2："><vofill-checkbox :type=2 :list="checkboxList2" :sel-obj="selObj" sel-key="CheckboxName"></vofill-checkbox></vofill-row>
        <vofill-row name="日期："><vofill-date :type=1 :sel-obj="selObj" sel-key="Date"></vofill-date></vofill-row>
        <vofill-row name="时间1："><vofill-time :type=1 :sel-val="timeVal" @onChangeSelval="getTimeSelVal"></vofill-time></vofill-row>
        <vofill-row name="时间2："><vofill-time :type=2 :sel-obj="selObj" sel-key="Time"></vofill-time></vofill-row>
        <vofill-loading :title="loadingTitle" :show.sync="loadingFlag"></vofill-loading>
        <vofill-popup :title="popupTitle" :show.sync="popupFlag" @clickOkPopupToParent="saveInfo()">
            <vofill-row name="姓名：" class="must"><input type="text" /></vofill-row>
            <vofill-row name="手机号："><input type="text" /></vofill-row>
            <vofill-row name="单选下拉1："><vofill-select :list="list" :sel-obj="selObj" sel-key="SelId"></vofill-select></vofill-row>
            <vofill-row name="单选下拉2："><vofill-select :list="list2" :type=2 :sel-obj="selObj" sel-key="SelName"></vofill-select></vofill-row>
            <vofill-row name="姓名：" class="must"><input type="text" /></vofill-row>
            <vofill-row name="手机号："><input type="text" /></vofill-row>
            <vofill-row name="下拉1："><vofill-select :list="list" :sel-obj="selObj" sel-key="SelId"></vofill-select></vofill-row>
            <vofill-row name="下拉2："><vofill-select :list="list2" :type=2 :sel-obj="selObj" sel-key="SelName"></vofill-select></vofill-row>
            <vofill-row name="单选："><vofill-radio :list="radioList1" :sel-obj="selObj" sel-key="RadioId"></vofill-radio></vofill-row>
            <vofill-row name="单选2："><vofill-radio :list="radioList2" :type=2 :sel-obj="selObj" sel-key="RadioName"></vofill-radio></vofill-row>
            <vofill-row name="多选："><vofill-checkbox :list="checkboxList1" :sel-obj="selObj" sel-key="CheckboxIds"></vofill-checkbox></vofill-row>
            <vofill-row name="日期："><vofill-date :type=1 :sel-obj="selObj" sel-key="Date"></vofill-date></vofill-row>
            <vofill-row name="时间："><vofill-time :type=1 :sel-obj="selObj" sel-key="Time"></vofill-time></vofill-row>
        </vofill-popup>
        <vofill-tipsbox :type="tipsboxType" :title="tipsboxTitle" :content="tipsboxContent" :show.sync="tipsboxFlag"></vofill-tipsbox>
        <vofill-tipsbox :type="tipsboxType" :title="tipsboxTitle" :content="tipsboxContent" :show.sync="tipsboxFlag" @clickOkTipsboxToParent="deleteData()"></vofill-tipsbox>
    </div>
</template>

<script>
    import vofillRow from '../components/row'
    import vofillSelect from '../components/select'
    import vofillRadio from '../components/radio'
    import vofillCheckbox from '../components/checkbox'
    import vofillDate from '../components/date'
    import vofillTime from '../components/time'
    import vofillLoading from '../components/loading'
    import vofillPopup from '../components/popup'
    import vofillScroll from '../components/scroll'
    import vofillTipsbox from '../components/tipsbox'
    import vofillButton from '../components/button'
    import vofillSwitch from '../components/switch'
    import vofillCascade from '../components/cascade'
    import vofillFileupload from '../components/fileupload'
    import vofillPreviewImg from '../components/previewimg'
    import vofill from "../js/common/vofill.js";

    export default {
        name: 'Componet',
        components: {
            vofillRow,
            vofillSelect,
            vofillRadio,
            vofillCheckbox,
            vofillDate,
            vofillTime,
            vofillLoading,
            vofillPopup,
            vofillScroll,
            vofillTipsbox,
            vofillButton,
            vofillSwitch,
            vofillCascade,
            vofillFileupload,
            vofillPreviewImg
        },
        data () {
            return {
                scrollWidth: "600px",
                loadingFlag: false,
                loadingTitle: "数据加载中",
                popupFlag: false,
                popupTitle: "新增人员",
                tipsboxType: 1,
                tipsboxFlag: false,
                tipsboxTitle: "",
                tipsboxContent: "",
                buttonDisabled: 0,
                switchList1: [{"Id": 1, Name: "ON"}, {"Id": 2, Name: "OFF"}],
                switchList2: ["男", "女"],
                timeVal: "23:40",
                list: [{Id: 1, Name: "下拉选项1"}, {Id: 2, Name: "下拉选项2"}, {Id: 3, Name: "下拉选项3"},
                       {Id: 4, Name: "下拉选项4"}, {Id: 5, Name: "下拉选项5"}, {Id: 6, Name: "下拉选项6"}],
                list2: ["下拉选项1", "下拉选项2", "下拉选项3", "下拉选项4", "下拉选项5", "下拉选项6", "下拉选项7"],
                radioList1: [{Id: 1, Name: "单选1"}, {Id: 2, Name: "单选2"}, {Id: 3, Name: "单选3"}],
                radioList2: ["单选1", "单选2", "单选3", "单选4"],
                checkboxList1: [{Id: 1, Name: "多选1"}, {Id: 2, Name: "多选2"}, {Id: 3, Name: "多选3"}, {Id: 11, Name: "多选11"}],
                checkboxList2: ["多选1", "多选2", "多选3", "多选4"],
                cascadeFirList: [2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],
                cascadeSecList: [],
                cascadeThdList: [],
                provinceList: [],
                cityList: [],
                countyList: [],
                fileList: [],
                imgList: ["https://tianwenfei.com:8443/shopFile/huntShop/Image/9f0486d6-fb38-254e-8056-4d0dc3e4e11a.jpg",
                          "https://tianwenfei.com:8443/shopFile/huntShop/Image/2947fc3e-2375-242a-c6c2-02f8b0c7eef5.jpg",
                          "https://tianwenfei.com:8443/shopFile/huntShop/Image/674784ff-5e4b-fb09-23d1-6585cf69139f.jpg",
                          "https://tianwenfei.com:8443/shopFile/huntShop/Image/cdf9b108-179a-15d5-4934-850a708e4e15.jpg",
                          "https://tianwenfei.com:8443/shopFile/huntShop/Image/451138dd-65a8-cbd3-f471-0efff5dc1907.jpg",
                          //"https://tianwenfei.com:8443/shopFile/huntShop/Image/12周彩超.jpg",
                          "https://tianwenfei.com:8443/shopFile/huntShop/Image/ff809211-1d57-8067-a735-1f17561da677.png"],
                prevImgType: 0,
                previewImgFlag: false,
                autoplayImgFlag: true,
                currIndex: 0,
                selObj: {SelId: "2", SelName: "下拉选项3", RadioId: "1", RadioName: "单选2", CheckboxIds: "11,2", CheckboxName: "多选2,多选3",
                         Date: "2020-05-04", Time: "21:52", SwitchId1: "1", SwitchId2: "男", SwitchId3: "1", SwitchId4: "1", SwitchId5: "1",
                         SwitchId6: "1", SwitchId7: "1", SwitchId8: "1", SwitchId9: "1", SwitchId10: "1", SwitchId11: "1", CascadeVal: [2020, 5, 13], AreaVal: [],
                         SelIds: "1,2,3", SelNames: "下拉选项1,下拉选项2,下拉选项3"}
            }
        },
        created() {
            //this.getData();
            this.getCascadeList(1);
            this.getCascadeList(2);
        },
        mounted() {
        },
        methods: {
            addUser() {
                this.popupFlag = true;
                this.popupTitle = "新增人员";
            },
            promptBox1() {
                this.tipsboxType = 1;
                this.tipsboxFlag = true;
                this.tipsboxTitle = "提示";
                this.tipsboxContent = "请填写姓名！";
            },
            promptBox2() {
                this.tipsboxType = 2;
                this.tipsboxFlag = true;
                this.tipsboxTitle = "警告";
                this.tipsboxContent = "确定删除选中数据？";
            },
            promptBox3() {
                this.tipsboxType = 3;
                this.tipsboxFlag = true;
                this.tipsboxTitle = "提示";
                this.tipsboxContent = "请填写姓名！";
            },
            deleteData() {
                console.log("删除数据")
            },
            uploding() {
                var obj = this;
                this.loadingFlag = true;
                this.loadingTitle = "保存数据中";
                setTimeout(function() {
                    obj.loadingFlag = false;
                },5000);
            },
            getData() {
                var obj = this;
                setTimeout(function() {
                    obj.loadingFlag = false;
                },10000);
                setTimeout(function() {
                    //obj.popupFlag = false;
                },15000);
            },
            saveInfo() {
                console.log(this.selObj);
            },
            getTimeSelVal(val) {
                this.timeVal = val;
            },
            getCascadeList(type) {
                if(type == 1) {
                    this.cascadeSecList = [], this.cascadeThdList = [];
                    if(this.selObj.CascadeVal[1] && this.selObj.CascadeVal[1] > 0) {
                        this.cascadeSecList = [1,2,3,4,5,6,7,8,9,10,11,12];
                        if(this.selObj.CascadeVal[2] && this.selObj.CascadeVal[2] > 0) {
                            let temp = new Date(this.selObj.CascadeVal[0], this.selObj.CascadeVal[1], 0);
                            let lastDay = temp.getDate();
                            for(var i = 1; i < lastDay + 1; i++) {
                                this.cascadeThdList.push(i);
                            }
                        }
                    }
                } else if(type == 2) {
                    var obj = this;
                    obj.provinceList = [];
                    obj.cityList = [];
                    obj.countyList = [];
                    this.$http.get('static/city.json').then(res => {
                        //此处的res对象包含了json的文件信息和数据，我们需要的json数据存在于body属性中
                        obj.areaList = res.body;
                        obj.areaList.forEach(o=>{
                            obj.provinceList.push(o.Name);
                            //根据省份获取城市列表
                            if(obj.selObj.AreaVal[1] && obj.selObj.AreaVal[1].length > 0 && obj.selObj.AreaVal[1] == o.Name) {
                                o.City.forEach(oo=> {
                                    obj.cityList.push(oo.Name);
                                    //根据城市获取区县列表
                                    if(obj.selObj.AreaVal[2] && obj.selObj.AreaVal[2].length > 0 && obj.selObj.AreaVal[2] == oo.Name) {
                                        oo.County.forEach(ooo => {
                                            obj.countyList.push(ooo.Name);
                                        });
                                    }
                                });
                            }
                        });
                    })
                }
            },
            toGetSecList(id) {
                this.firLevelId = id;
                this.cascadeThdList = [];
                this.$set(this.selObj.CascadeVal, 0, id);
                this.$set(this.selObj.CascadeVal, 1, "");
                this.$set(this.selObj.CascadeVal, 2, "");
                this.cascadeSecList = [1,2,3,4,5,6,7,8,9,10,11,12];
            },
            toGetThdList(id) {
                let temp = new Date(this.firLevelId, id, 0);
                let lastDay = temp.getDate();
                this.cascadeThdList = [];
                this.$set(this.selObj.CascadeVal, 1, id);
                this.$set(this.selObj.CascadeVal, 2, "");
                for(var i = 1; i < lastDay + 1; i++) {
                    this.cascadeThdList.push(i);
                }
            },
            toChangeThdVal(id) {
                this.$set(this.selObj.CascadeVal, 2, id);
            },
            toGetCityList(name) {
                let obj = this;
                obj.firLevelName = name;
                obj.cityList = [];
                obj.countyList = [];
                obj.$set(obj.selObj.AreaVal, 0, name);
                obj.$set(obj.selObj.AreaVal, 1, "");
                obj.$set(obj.selObj.AreaVal, 2, "");
                //根据省份获取城市列表
                let province = obj.areaList.find(o=>o.Name==name);
                province.City.forEach(o=> {
                    obj.cityList.push(o.Name);
                });
            },
            toGetCountyList(name) {
                let obj = this;
                obj.countyList = [];
                obj.$set(this.selObj.AreaVal, 1, name);
                obj.$set(this.selObj.AreaVal, 2, "");
                //根据城市获取区县列表
                let province = obj.areaList.find(o=>o.Name==obj.firLevelName);
                let city = province.City.find(o=>o.Name==name);
                city.County.forEach(o=> {
                    obj.countyList.push(o.Name);
                });
            },
            toChangeCountyVal(name) {
                this.$set(this.selObj.AreaVal, 2, name);
            },
            previewImgClick(index) {
                this.previewImgFlag = true;
                this.prevImgType = 1;
                //this.autoplayImgFlag = true;
                this.currIndex = index;
            },
            previewImgClick2(index) {
                this.previewImgFlag = true;
                this.prevImgType = 2;
                this.autoplayImgFlag = true;
                this.currIndex = index;
            }
        },
        watch: {
            "selObj.SelId": {
                handler: function() {
                    console.log("下拉框1：", this.selObj.SelId);
                }
            },
            "selObj.SelName": {
                handler: function() {
                    console.log("下拉框2：", this.selObj.SelName);
                }
            },
            "selObj.RadioId": {
                handler: function() {
                    console.log("单选框1：", this.selObj.RadioId);
                }
            },
            "selObj.RadioName": {
                handler: function() {
                    console.log("单选框2：", this.selObj.RadioName);
                }
            },
            "selObj.CheckboxIds": {
                handler: function() {
                    console.log("多选框1：", this.selObj.CheckboxIds);
                }
            },
            "selObj.CheckboxName": {
                handler: function() {
                    console.log("多选框2：", this.selObj.CheckboxName);
                }
            },
            "selObj.Date": {
                handler: function() {
                    console.log("日期：", this.selObj.Date);
                }
            },
            "selObj.Time": {
                handler: function() {
                    console.log("时间2：", this.selObj.Time);
                }
            },
            "selObj.CascadeVal": {
                handler: function() {
                    console.log("级联1：", this.selObj.CascadeVal);
                }
            },
            "selObj.AreaVal": {
                handler: function() {
                    console.log("级联2：", this.selObj.AreaVal);
                }
            },
            fileList(nv) {
                console.log("文件：", nv)
            },
            autoplayImgFlag(nv) {
                console.log("是否自动播放", nv)
            }
            
        }
    }
</script>
