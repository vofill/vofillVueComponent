/**
**组件拖拽实现动态页面配置功能组件
**vofill
**2020-09-14
**/

<template>
    <div class="dragdrop">
        <!-- 头部tabs切换按钮、生成表单按钮 -->
        <div class="dd-top-btn">
            <div class="ddtb-tabs">
                <div :class="['ddtbt-item', {'active' : ddtbTabType == 1}]" @click="ddtbTabType=1">行列布局</div>
                <div :class="['ddtbt-item', {'active' : ddtbTabType == 2}]" @click="ddtbTabType=2">表单布局</div>
            </div>
            <div class="ddtb-btns">
                <div class="ddbtb-btn" @click="generateJsonData()">生成json</div>
                <div class="ddbtb-btn" @click="generateHtmlCode(3)">生成页面代码</div>
            </div>
        </div>
        <!-- 表单组件选择模块 -->
        <div class="dd-left" id="ddLeft">
            <vofill-scroll :height="scrollHeight">
                <div :class="['ddl-item', `ddli-${o.Icon}`]" v-for="(o, i) in formItemList" :key="i" v-show="o.Type==ddtbTabType">
                    <span>{{o.Name}}</span>
                    <i class="ddli-add" @click="addDDLItem(o)"></i>
                </div>
            </vofill-scroll>
        </div>
        <div class="dd-right">
            <vofill-scroll :height="scrollHeight">
                <div class="ddr-box">
                    <!-- 表单设计模块 -->
                    <div class="ddrb-form" ref="dbrb-form">
                        <div class="ddrbf-row" v-for="(o, i) in formData" :key="i">
                            <div :class="['ddrbfr-col', {'active': oo.Key == colKey}]" v-for="(oo, ii) in o.Components" :key="ii" @click="selectColumn(o, oo)">
                                <template v-if="oo.Type == 'input'">
                                    <vofill-row :name="oo.Name + '：'" :class="{'must':oo.Required}"><input type="text" disabled="disabled" /></vofill-row>
                                </template>
                                <template v-else-if="oo.Type == 'textarea'">
                                    <vofill-row :name="oo.Name + '：'" :class="{'must':oo.Required}"><textarea type="text" disabled="disabled"></textarea></vofill-row>
                                </template>
                                <template v-else-if="oo.Type == 'radio'">
                                    <vofill-row :name="oo.Name + '：'" :class="{'must':oo.Required}">
                                        <vofill-radio :list="oo.Options" :sel-obj="settingData" sel-key="DefaultRadioVal"></vofill-radio>
                                    </vofill-row>
                                </template>
                                <template v-else-if="oo.Type == 'checkbox'">
                                    <vofill-row :name="oo.Name + '：'" :class="{'must':oo.Required}">
                                        <vofill-checkbox :list="oo.Options" :sel-obj="settingData" sel-key="DefaultCheckboxVal"></vofill-checkbox>
                                    </vofill-row>
                                </template>
                                <template v-else-if="oo.Type == 'select'">
                                    <vofill-row :name="oo.Name + '：'" :class="{'must':oo.Required}">
                                        <vofill-select :list="oo.Options" :sel-obj="settingData" sel-key="DefaultSelectVal"></vofill-select>
                                    </vofill-row>
                                </template>
                                <template v-else-if="oo.Type == 'time'">
                                    <vofill-row :name="oo.Name + '：'" :class="{'must':oo.Required}">
                                        <vofill-time :type=2 :sel-obj="settingData" sel-key="DefaultTimeVal"></vofill-time>
                                    </vofill-row>
                                </template>
                                <template v-else-if="oo.Type == 'date'">
                                    <vofill-row :name="oo.Name + '：'" :class="{'must':oo.Required}">
                                        <vofill-date :type=1 :sel-obj="settingData" sel-key="DefaultDateVal"></vofill-date>
                                    </vofill-row>
                                </template>
                                <template v-else-if="oo.Type == 'button'">
                                    <vofill-button :class="['blue', {'add': btnTypeActive==1}, {'edit': btnTypeActive==2}, {'update': btnTypeActive==3}, {'detail': btnTypeActive==4}, {'delete': btnTypeActive==5} ]" :title="settingData.Name"></vofill-button>
                                </template>
                                <div class="ddrbfrc-btns">
                                    <div class="ddrbfrcb-btn ddrbfrcb-left" title="左移"
                                      @click.stop="colOperate(1, o, oo)"></div>
                                    <div class="ddrbfrcb-btn ddrbfrcb-right" title="右移"
                                      @click.stop="colOperate(2, o, oo)"></div>
                                    <div class="ddrbfrcb-btn ddrbfrcb-up" title="上移"
                                      @click.stop="colOperate(3, o, oo)"></div>
                                    <div class="ddrbfrcb-btn ddrbfrcb-down" title="下移"
                                      @click.stop="colOperate(4, o, oo)"></div>
                                    <div class="ddrbfrcb-btn ddrbfrcb-del" title="删除"
                                      @click.stop="colOperate(5, o, oo)"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 组件属性设置模块 -->
                    <div class="ddrb-setting" v-show="settingData.ShowFlag">
                        <vofill-row name="名称："><input type="text" v-model="settingData.Name"/></vofill-row>
                        <template v-if="settingData.Type == 'button'">
                            <vofill-row name="按钮类型：">
                                <div class="ddrbs-radio">
                                    <div :class="['ddrbsr-item', {'active': btnTypeActive == item.Id}]" v-for="(item, index) in btnTypeList" :key="index" @click="settingData.BtnType = btnTypeActive = item.Id">{{item.Name}}</div>
                                </div>
                            </vofill-row>
                        </template>
                        <template v-else>
                            <vofill-row name="是否必填：">
                                <vofill-switch :list="requiredSwitchList" :type=1 :sel-obj="settingData" sel-key="Required"></vofill-switch>
                            </vofill-row>
                            <template v-if="settingData.Type == 'radio' || settingData.Type == 'checkbox' || settingData.Type == 'select'">
                                <vofill-row name="选项：">
                                    <div class="ddrbs-list-box">
                                        <div class="sdlb-item" v-for="(o, i) in settingData.Options" :key="i">
                                            <div class="sdlbi-input"><input type="text" v-model="o.Name" /></div>
                                            <div v-if="i == 0" class="sdlbi-btn add" @click="updateOption(1, 0)"></div>
                                            <div v-if="i > 0" class="sdlbi-btn del" @click="updateOption(2, i)"></div>
                                        </div>
                                    </div>
                                </vofill-row>
                            </template>
                        </template>
                    </div>
                </div>
            </vofill-scroll>
        </div>
        <!-- 表单控件转换JSON格式显示 -->
        <vofill-popup :title="popupTitle" :show.sync="popupFlag">
            <div>{{showCodeData}}</div>
            <!-- <div v-html="showCodeData"></div> -->
            <!-- <pre id="jsonId" style="width:100%;height:100%"></pre> -->
        </vofill-popup>
    </div>
</template>

<script>
    import vofillScroll from '@/components/scroll';
    import vofillRow from '@/components/row';
    import vofillRadio from '@/components/radio';
    import vofillSwitch from '@/components/switch';
    import vofillPopup from '@/components/popup';
    import vofillCheckbox from '@/components/checkbox';
    import vofillSelect from '@/components/select';
    import vofillTime from '@/components/time'
    import vofillDate from '@/components/date'
    import vofillButton from '@/components/button'
    import vofill from "@/js/common/vofill.js";

    export default {
        name: "vofill-dragdrop",
        components: {
            vofillScroll,
            vofillRow,
            vofillRadio,
            vofillSwitch,
            vofillPopup,
            vofillCheckbox,
            vofillSelect,
            vofillTime,
            vofillDate,
            vofillButton
        },
        props: {              //prop接收传过来的参数
        },
        data () {
            return {
                scrollHeight: "",
                ddtbTabType: 1,
                rowKey: "",
                colKey: "",
                formItemList: [{Id: 1, Type: 1, Icon: "oneRowOneCol", Name: "一行一列"},
                                {Id: 2, Type: 1, Icon: "oneRowTwoCol", Name: "一行两列"},
                                {Id: 3, Type: 1, Icon: "oneRowThreeCol", Name: "一行三列"},
                                {Id: 4, Type: 2, Icon: "input", Name: "单行文本"},
                                {Id: 5, Type: 2, Icon: "textarea", Name: "多行文本"},
                                {Id: 6, Type: 2, Icon: "radio", Name: "单选框"},
                                {Id: 7, Type: 2, Icon: "checkbox", Name: "多选框"},
                                {Id: 8, Type: 2, Icon: "select", Name: "下拉选择"},
                                {Id: 9, Type: 2, Icon: "time", Name: "时间选择"},
                                {Id: 10, Type: 2, Icon: "date", Name: "日期选择"},
                                {Id: 11, Type: 2, Icon: "button", Name: "按钮"}],
                formData: [],
                settingData: {ShowFlag: false, Name: "", DefaultSelVal: "1"},
                requiredSwitchList: [{"Id": 0, Name: "否"}, {"Id": 1, Name: "是"}],
                showCodeData: "",
                popupFlag: false,
                popupTitle: "",
                btnTypeList: [{Id: 1, Name: "新增"},
                              {Id: 2, Name: "修改"},
                              {Id: 3, Name: "编辑"},
                              {Id: 4, Name: "详情"},
                              {Id: 5, Name: "删除"}],
                btnTypeActive: 1
            }
        },
        mounted() {
            this.scrollHeight = vofill.getBrowserInfo("ddLeft").Height + "px";
        },
        methods: {
            //添加行布局、表单组件
            addDDLItem(data) {
                if(data.Type == 1) {//新增行
                    let rowData = {
                        Key: "row_" + vofill.generateGuid(),
                        Index: this.formData.length + 1,
                        Name: "",
                        Type: data.Icon,
                        Width: "100px",
                        height: "40px",
                        Components: []
                    };
                    if(data.Icon == "oneRowOneCol") {//新增一行一列
                        rowData.Name = "一行一列";
                        let colData = this.createColData(1);
                        rowData.Components.push(colData);
                    } else if(data.Icon == "oneRowTwoCol") {//新增一行两列
                        rowData.Name = "一行两列";
                        for(let i = 1; i < 3; i++) {
                            let colData = this.createColData(i);
                            rowData.Components.push(colData);
                        }
                    } else if(data.Icon == "oneRowThreeCol") {//新增一行三列
                        rowData.Name = "一行三列";
                        for(let i = 1; i < 4; i++) {
                            let colData = this.createColData(i);
                            rowData.Components.push(colData);
                        }
                    }
                    this.formData.push(rowData);
                } 
                else {//添加表单控件
                    let name = "";
                    let option = [];
                    switch (data.Icon) {
                        case "input":
                            name = "单行文本";
                        break;
                        case "textarea":
                            name = "多行文本";
                        break;
                        case "radio":
                            name = "单选框";
                            option = [{Id: 1, Name: "选项1"},
                                      {Id: 2, Name: "选项2"}];
                        break;
                        case "checkbox":
                            name = "多选框";
                            option = [{Id: 1, Name: "选项1"},
                                      {Id: 2, Name: "选项2"},
                                      {Id: 3, Name: "选项3"}];
                        break;
                        case "select":
                            name = "下拉选择";
                            option = [{Id: 1, Name: "选项1"},
                                      {Id: 2, Name: "选项2"},
                                      {Id: 3, Name: "选项3"}];
                        break;
                        case "time":
                            name = "时间选择";
                        break;
                        case "date":
                            name = "日期选择";
                        break;
                        case "button":
                            name = "按钮";
                        break;
                        default:
                            name = "";
                        break;
                    }
                    this.formData.forEach((item, ind) => {
                        if(item.Key == this.rowKey) {
                            item.Components.forEach((childItem, childInd) => {
                                if(childItem.Key == this.colKey) {
                                    this.settingData = childItem;
                                    this.settingData.Type = data.Icon;
                                    this.setFileds(1);
                                    this.$set(this.formData[ind].Components[childInd], 'Type', data.Icon);
                                    this.$set(this.formData[ind].Components[childInd], 'Name', name);
                                    this.$set(this.formData[ind].Components[childInd], 'Options', option);
                                }
                            });
                        }
                    });
                }
            },
            //创建组件数据
            createColData(index) {
                let compData = {
                    Key: "col_" + vofill.generateGuid(),//唯一标识
                    Index: index,//在行中的排序
                    Type: "",//控件类型
                    Name: "",//控件名称
                    Icon: "",//控件图标
                    BtnType: 1,//按钮类型
                    Width: "100px",//控件宽度
                    DefaultVal: "",//控件默认值
                    Required: false,//控件是否必填
                    DataType: "",//数据类型
                    Placeholder: "",//提示信息
                    Options: [],//选择项
                    Rules: [//验证规则
                        {Type: "String",
                        Message: ""}
                    ]
                }
                return compData;
            },
            //列选中事件
            selectColumn(rowData, colData) {
                this.rowKey = rowData.Key;
                this.colKey = colData.Key;
                this.settingData = colData;
                console.log(this.settingData)
                if(colData.Name.length > 0) {
                    this.setFileds(2);
                    this.settingData.ShowFlag = true;
                } else {
                    this.settingData.ShowFlag = false;
                }
            },
            //初始化属性
            setFileds(type) {
                this.settingData.ShowFlag = true;
                if(this.settingData.Type == "radio") {//如果是单选框控件，给单选框一个默认字段值
                    this.settingData.DefaultVal = type == 1 ? "1" : this.settingData.DefaultVal;
                    this.settingData.DefaultRadioVal = this.settingData.DefaultVal;
                }
                if(this.settingData.Type == "checkbox") {//如果是多选框空控件，给多选框一个默认字段值
                    this.settingData.DefaultVal = type == 1 ? "1" : this.settingData.DefaultVal;
                    this.settingData.DefaultCheckboxVal = this.settingData.DefaultVal;
                }
                if(this.settingData.Type == "select") {//如果是下拉框空控件，给下拉框一个默认字段值
                    this.settingData.DefaultVal = type == 1 ? "1" : this.settingData.DefaultVal;
                    this.settingData.DefaultSelectVal = this.settingData.DefaultVal;
                }
                if(this.settingData.Type == "time" || this.settingData.Type == "date") {//如果是时间、日期控件，需要初始化当前时间和日期
                    let dateTemp = new Date();
                    let year = dateTemp.getFullYear();
                    let month = dateTemp.getMonth() + 1;
                    let day = dateTemp.getDate();
                    let hour = dateTemp.getHours();
                    let min = dateTemp.getMinutes();
                    let sec = dateTemp.getSeconds();
                    if(this.settingData.Type == "time") {
                        let tempVal = (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min);
                        this.settingData.DefaultVal = type == 1 ? tempVal : this.settingData.DefaultVal;
                        this.settingData.DefaultTimeVal = this.settingData.DefaultVal;
                    }
                    if(this.settingData.Type == "date") {
                        let tempVal = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
                        this.settingData.DefaultVal = type == 1 ? tempVal : this.settingData.DefaultVal;
                        this.settingData.DefaultDateVal = this.settingData.DefaultVal;
                    }
                }
            },
            //将设计的表单生成JSON
            generateJsonData() {
                // console.log(this.formData);
                // this.showCodeData = JSON.parse(JSON.stringify(this.formData));
                
                // this.popupFlag = true;
                // this.popupTitle = "查看JSON";
                // this.preDocObj = document.getElementById("jsonId");
                // this.showCodeData = JSON.stringify(this.formData)
                // this.preDocObj.innerHTML = this.showCodeData;
            },
            //生成HTML页面代码
            generateHtmlCode(type) {
                // console.log(this.$refs["dbrb-form"]);
                var radioStr = "";//单选框代码字符串
                var checkBoxStr = "";//多选框代码字符串
                var selctStr = "";//下拉框代码字符串
                if(type == 1) {//生成设计器的表单代码
                    var codeStr = '<template>';
                    codeStr += '<div class="ddrb-form" ref="dbrb-form">';
                    if(this.formData.length > 0) {
                        codeStr += '<div class="ddrbf-row" v-for="(o, i) in formData" :key="i">';
                            codeStr += '<div :class="[\'ddrbfr-col\', {\'active\': oo.Key == colKey}]" v-for="(oo, ii) in o.Components" :key="ii" @click="selectColumn(o, oo)">';
                                codeStr += '<template v-if="oo.Type == \'input\'">';
                                    codeStr += '<vofill-row :name="oo.Name + \'：\'" :class="{\'must\':oo.Required}"><input type="text" disabled="disabled" /></vofill-row>';
                                codeStr += '</template>';
                                codeStr += '<template v-else-if="oo.Type == \'textarea\'">';
                                    codeStr += '<vofill-row :name="oo.Name + \'：\'" :class="{\'must\':oo.Required}"><textarea type="text" disabled="disabled"></textarea></vofill-row>';
                                codeStr += '</template>';
                                codeStr += '<template v-else-if="oo.Type == \'radio\'">';
                                    codeStr += '<vofill-row :name="oo.Name + \'：\'" :class="{\'must\':oo.Required}">';
                                        codeStr += '<vofill-radio :list="oo.Options" :sel-obj="settingData" sel-key="DefaultRadioVal"></vofill-radio>';
                                    codeStr += '</vofill-row>';
                                codeStr += '</template>';
                                codeStr += '<template v-else-if="oo.Type == \'checkbox\'">';
                                    codeStr += '<vofill-row :name="oo.Name + \'：\'" :class="{\'must\':oo.Required}">';
                                        codeStr += '<vofill-checkbox :list="oo.Options" :sel-obj="settingData" sel-key="DefaultCheckboxVal"></vofill-checkbox>';
                                    codeStr += '</vofill-row>';
                                codeStr += '</template>';
                                codeStr += '<template v-else-if="oo.Type == \'select\'">';
                                    codeStr += '<vofill-row :name="oo.Name + \'：\'" :class="{\'must\':oo.Required}">';
                                        codeStr += '<vofill-select :list="oo.Options" :sel-obj="settingData" sel-key="DefaultSelectVal"></vofill-select>';
                                    codeStr += '</vofill-row>';
                                codeStr += '</template>';
                                codeStr += '<template v-else-if="oo.Type == \'time\'">';
                                    codeStr += '<vofill-row :name="oo.Name + \'：\'" :class="{\'must\':oo.Required}">';
                                        codeStr += '<vofill-time :type=2 :sel-obj="settingData" sel-key="DefaultTimeVal"></vofill-time>';
                                    codeStr += '</vofill-row>';
                                codeStr += '</template>';
                                codeStr += '<template v-else-if="oo.Type == \'date\'">';
                                    codeStr += '<vofill-row :name="oo.Name + \'：\'" :class="{\'must\':oo.Required}">';
                                        codeStr += '<vofill-date :type=1 :sel-obj="settingData" sel-key="DefaultDateVal"></vofill-date>';
                                    codeStr += '</vofill-row>';
                                codeStr += '</template>';
                                codeStr += '<template v-else-if="oo.Type == \'button\'">';
                                    codeStr += '<vofill-button :class="[\'blue\', {\'add\': settingData.BtnType==\'1\'}, {\'edit\': settingData.BtnType==\'2\'}, {\'update\': settingData.BtnType==\'3\'}, {\'detail\': settingData.BtnType==\'4\'}, {\'delete\': settingData.BtnType==\'5\'} ]" :title="settingData.Name"></vofill-button>';
                                codeStr += '</template>';
                            codeStr += '</div>';
                        codeStr += '</div>';
                    }
                        codeStr += '</div>';
                    codeStr += '</template>';
                    this.showCodeData = codeStr;
                } else if(type == 2) {//生成vue的表单代码
                    this.showCodeData = this.$refs["dbrb-form"].outerHTML;
                } else if(type == 3) {//生成thml的表单代码
                    var codeStr = '';
                    codeStr += '<template><div class="ddrb-form" ref="dbrb-form">';
                    if(this.formData.length > 0) {
                        this.formData.forEach((item, index) => {
                            codeStr += '<div class="ddrbf-row">';
                                if(item.Components && item.Components.length > 0) {
                                    item.Components.forEach((childItem, childIndex) => {
                                        codeStr += '<div class="ddrbfr-col">';
                                            if(childItem.Type == "button") {
                                                let btnType = "";
                                                if(childItem.BtnType == 1) {
                                                    btnType = "add";
                                                } else if(childItem.BtnType == 2) {
                                                    btnType = "edit";
                                                } else if(childItem.BtnType == 3) {
                                                    btnType = "update";
                                                } else if(childItem.BtnType == 4) {
                                                    btnType = "detail";
                                                } else if(childItem.BtnType == 5) {
                                                    btnType = "delete";
                                                }
                                                codeStr += '<vofill-button class="blue ' + btnType + '" title="' + childItem.Name + '"></vofill-button>';
                                            } else {
                                                if(childItem.Name.length > 0) {
                                                    codeStr += '<vofill-row name="' + childItem.Name + '：" class="' + (childItem.Required?"must" : "") + '">';
                                                    if(childItem.Type == "input") {
                                                        codeStr += '<input type="text" />';
                                                    } else if(childItem.Type == "textarea") {
                                                        codeStr += '<textarea type="text"></textarea>';
                                                    } else if(childItem.Type == "radio") {
                                                        radioStr += "radioList_" + index + "_" + childIndex + ":" + JSON.stringify(childItem.Options) + ","
                                                        codeStr += '<vofill-radio :list="radioList_' + index + "_" + childIndex + '" :sel-obj="formData" sel-key="RadioId"></vofill-radio>';
                                                    } else if(childItem.Type == "checkbox") {
                                                        checkBoxStr += "checkboxList_" + index + "_" + childIndex + ":" + JSON.stringify(childItem.Options) + ",";
                                                        codeStr += '<vofill-checkbox :list="checkboxList_' + index + "_" + childIndex + '" :sel-obj="formData" sel-key="CheckboxId"></vofill-checkbox>';
                                                    } else if(childItem.Type == "select") {
                                                        selctStr += "selectList_" + index + "_" + childIndex + ":" + JSON.stringify(childItem.Options) + ",";
                                                        codeStr += '<vofill-select :list="selectList_' + index + "_" + childIndex + '" :sel-obj="formData" sel-key="SelectId"></vofill-select>';
                                                    } else if(childItem.Type == "time") {
                                                        codeStr += '<vofill-time :type=2></vofill-time>';
                                                    } else if(childItem.Type == "date") {
                                                        codeStr += '<vofill-date :type=1></vofill-date>';
                                                    }
                                                    codeStr += '</vofill-row>';
                                                }
                                            }
                                        codeStr += '</div>';
                                    });
                                }
                            codeStr += '</div>';
                        });
                    }
                    codeStr += '</div></template>';
                    this.showCodeData = codeStr;
                }

                let jsStr = '';
                jsStr += '<script>';
                    jsStr += 'import vofillScroll from "@/components/scroll";';
                    jsStr += 'import vofillRow from "@/components/row";';
                    jsStr += 'import vofillRadio from "@/components/radio";';
                    jsStr += 'import vofillSwitch from "@/components/switch";';
                    jsStr += 'import vofillCheckbox from "@/components/checkbox";';
                    jsStr += 'import vofillSelect from "@/components/select";';
                    jsStr += 'import vofillTime from "@/components/time";';
                    jsStr += 'import vofillDate from "@/components/date";';
                    jsStr += 'import vofillButton from "@/components/button";';
                    jsStr += 'import vofill from "@/js/common/vofill.js";';
                    jsStr += 'export default {';
                        jsStr += 'name: "Template",';
                        jsStr += 'components: {';
                            jsStr += 'vofillRow,';
                            jsStr += 'vofillScroll,';
                            jsStr += 'vofillRadio,';
                            jsStr += 'vofillSwitch,';
                            jsStr += 'vofillCheckbox,';
                            jsStr += 'vofillSelect,';
                            jsStr += 'vofillTime,';
                            jsStr += 'vofillDate,';
                            jsStr += 'vofillButton,';
                        jsStr += '},';
                        jsStr += 'data () {';
                            jsStr += 'return {';
                                jsStr += 'scrollHeight: "",';
                                jsStr += radioStr;
                                jsStr += checkBoxStr;
                                jsStr += selctStr;
                                jsStr += '';
                                jsStr += 'formData: {RadioId:"1", CheckboxId: "1", SelectId: "1"},';
                            jsStr += '}';
                        jsStr += '},';
                        jsStr += 'mounted() {},';
                        jsStr += 'created() {},';
                        jsStr += 'mounted() {},';
                        jsStr += 'methods: {},';
                        jsStr += 'watch: {}';
                    jsStr += '}';
                jsStr += '<\/script>';
                this.showCodeData += jsStr;
                
                this.popupFlag = true;
                this.popupTitle = "查看表单代码";
            },
            //行控件操作（左右移动，上下移动，删除）
            colOperate(type, rowData, colData) {
                if(type == 1) {//控件左移操作
                    if(colData.Index == 1) {//如果已经处在最左端，则不作操作
                        return false;
                    } else {
                        let lastCol = rowData.Components.find(item => item.Index == colData.Index - 1);
                        this.formData.forEach((item, ind) => {
                            if(item.Key == rowData.Key) {
                                item.Components.forEach((childItem, childInd) => {
                                    if(childItem.Key == colData.Key) {
                                        this.$set(this.formData[ind].Components[childInd], 'Index', colData.Index - 1);
                                    }
                                    if(childItem.Key == lastCol.Key) {
                                        this.$set(this.formData[ind].Components[childInd], 'Index', lastCol.Index + 1);
                                    }
                                });
                                item.Components.sort(this.sortByIndex);
                            }
                        });
                    }
                } else if(type == 2) {//控件右移操作
                    if(colData.Index == rowData.length) {//如果处在最右端，则不作操作
                        return false;
                    } else {
                        let nextCol = rowData.Components.find(item => item.Index == colData.Index + 1);
                        this.formData.forEach((item, ind) => {
                            if(item.Key == rowData.Key) {
                                item.Components.forEach((childItem, childInd) => {
                                    if(childItem.Key == colData.Key) {
                                        this.$set(this.formData[ind].Components[childInd], 'Index', colData.Index + 1);
                                    }
                                    if(childItem.Key == nextCol.Key) {
                                        this.$set(this.formData[ind].Components[childInd], 'Index', nextCol.Index - 1);
                                    }
                                });
                                item.Components.sort(this.sortByIndex);
                            }
                        });
                    }
                } else if(type == 3) {//控件上移操作,
                    if(rowData.Index == 1) {//如果处在最上端，则不作操作
                        return false;
                    }
                    let lastRow = this.formData.find(item => item.Index == rowData.Index - 1);
                    this.formData.forEach((item, ind) => {
                        if(item.Key == rowData.Key) {
                            this.$set(this.formData[ind], 'Index', rowData.Index - 1);
                        }
                        if(item.Key == lastRow.Key) {
                            this.$set(this.formData[ind], 'Index', lastRow.Index + 1);
                        }
                    });
                    this.formData.sort(this.sortByIndex);
                } else if(type == 4) {//控件下移操作
                    if(rowData.Index == this.formData.length) {//如果处在最下端，则不作操作
                        return false;
                    }
                    let nextRow = this.formData.find(item => item.Index == rowData.Index + 1);
                    this.formData.forEach((item, ind) => {
                        if(item.Key == rowData.Key) {
                            this.$set(this.formData[ind], 'Index', rowData.Index + 1);
                        }
                        if(item.Key == nextRow.Key) {
                            this.$set(this.formData[ind], 'Index', nextRow.Index - 1);
                        }
                    });
                    this.formData.sort(this.sortByIndex);
                } else if(type == 5) {//控件删除操作
                    this.formData.forEach((item, ind) => {
                        if(item.Key == rowData.Key) {
                            item.Components.forEach((childItem, childInd) => {
                                if(childItem.Key == colData.Key) {
                                    let colDataTemp = this.createColData(colData.Index);
                                    this.formData[ind].Components.splice(childInd, 1);
                                    this.formData[ind].Components.push(colDataTemp);
                                }
                            });
                            item.Components.sort(this.sortByIndex);
                        }
                    });
                }
                
            },
            //对JSON数组，按Index字段排序
            sortByIndex(a, b) {
                return a.Index - b.Index;
            },
            //修改单选框、多选框、下拉列表添加选项设置
            updateOption(type, index) {
                this.formData.forEach((item, ind) => {
                    if(item.Key == this.rowKey) {
                        item.Components.forEach((childItem, childInd) => {
                            if(childItem.Key == this.colKey) {
                                let optionTemp = childItem.Options;
                                if(type == 1) {//新增选项
                                    optionTemp.push({Id: optionTemp.length + 1, Name: "选项"});
                                } else {//删除选项
                                    optionTemp.splice(index, 1);
                                    //重新定义数组ID
                                    optionTemp.forEach((item, indexTemp) => {
                                        item.Id = indexTemp + 1;
                                    });
                                }
                                this.$set(this.formData[ind].Components[childInd], 'Options', optionTemp);
                            }
                        });
                    }
                });
            }
        },
        watch: {
            // "settingData.Required": {
            //     handler: function() {
            //         console.log("switch：", this.settingData.Required);
            //     }
            // }
        }
    }
</script>

<style scoped>

</style>