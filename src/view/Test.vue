<template>
  <div class="ddrb-form" ref="dbrb-form">
    <div class="ddrbf-row">
      <div class="ddrbfr-col">
        <vofill-row name="单行文本：" class=""><input type="text" /></vofill-row>
      </div>
    </div>
    <div class="ddrbf-row">
      <div class="ddrbfr-col">
        <vofill-row name="多行文本：" class=""><textarea type="text"></textarea></vofill-row>
      </div>
    </div>
    <div class="ddrbf-row">
      <div class="ddrbfr-col">
        <vofill-row name="单选框：" class="">
          <vofill-radio :list="radioList_2_0" :sel-obj="formData" sel-key="RadioId"></vofill-radio>
        </vofill-row>
      </div>
    </div>
    <div class="ddrbf-row">
      <div class="ddrbfr-col">
        <vofill-row name="多选框：" class="">
          <vofill-checkbox :list="checkboxList_3_0" :sel-obj="formData" sel-key="CheckboxId"></vofill-checkbox>
        </vofill-row>
      </div>
    </div>
    <div class="ddrbf-row">
      <div class="ddrbfr-col">
        <vofill-row name="下拉选择：" class="">
          <vofill-select :list="selectList_4_0" :sel-obj="formData" sel-key="SelectId"></vofill-select>
        </vofill-row>
      </div>
    </div>
    <div class="ddrbf-row">
      <div class="ddrbfr-col">
        <vofill-row name="时间选择：" class="">
          <vofill-time :type=2></vofill-time>
        </vofill-row>
      </div>
    </div>
    <div class="ddrbf-row">
      <div class="ddrbfr-col">
        <vofill-row name="日期选择：" class="">
          <vofill-date :type=1></vofill-date>
        </vofill-row>
      </div>
    </div>
    <div class="ddrbf-row">
      <div class="ddrbfr-col"></div>
      <div class="ddrbfr-col"></div>
      <div class="ddrbfr-col">
        <vofill-button class="blue add" title="按钮"></vofill-button>
      </div>
    </div>
  </div>
</template>
<script>
  import vofillScroll from "@/components/scroll";
  import vofillRow from "@/components/row";
  import vofillRadio from "@/components/radio";
  import vofillSwitch from "@/components/switch";
  import vofillCheckbox from "@/components/checkbox";
  import vofillSelect from "@/components/select";
  import vofillTime from "@/components/time";
  import vofillDate from "@/components/date";
  import vofillButton from "@/components/button";
  import vofill from "@/js/common/vofill.js";
  export default {
    name: "Template",
    components: {
      vofillRow,
      vofillScroll,
      vofillRadio,
      vofillSwitch,
      vofillCheckbox,
      vofillSelect,
      vofillTime,
      vofillDate,
      vofillButton,
    },
    data() {
      return {
        scrollHeight: "",
        radioList_2_0: [{
          "Id": 1,
          "Name": "男"
        }, {
          "Id": 2,
          "Name": "女"
        }],
        checkboxList_3_0: [{
          "Id": 1,
          "Name": "跑步"
        }, {
          "Id": 2,
          "Name": "篮球"
        }, {
          "Id": 3,
          "Name": "羽毛球"
        }],
        selectList_4_0: [{
          "Id": 1,
          "Name": "江苏"
        }, {
          "Id": 2,
          "Name": "云南"
        }, {
          "Id": 3,
          "Name": "广东"
        }],
        formData: {
          RadioId: "1",
          CheckboxId: "1",
          SelectId: "1"
        },
      }
    },
    mounted() {},
    created() {},
    mounted() {},
    methods: {},
    watch: {}
  }
</script>