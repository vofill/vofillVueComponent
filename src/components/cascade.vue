/**
**级联下拉选择组件
**vofill
**2020-05-11
**/

<template>
    <div class="cascade">
        <div class="cc-item">
            <vofill-row :name="titleList[0] + '：'"><vofill-select :type=2 :list="localFirList" :sel-obj="localSelObj" sel-key="FirVal" @select-item-click="toGetSecList"></vofill-select></vofill-row>
        </div>
        <div class="cc-item">
            <vofill-row :name="titleList[1] + '：'"><vofill-select :type=2 :list="localSecList" :sel-obj="localSelObj" sel-key="SecVal" @select-item-click="toGetThdList"></vofill-select></vofill-row>
        </div>
        <div class="cc-item">
            <vofill-row :name="titleList[2] + '：'"><vofill-select :type=2 :list="localThdList" :sel-obj="localSelObj" sel-key="ThdVal" @select-item-click="toChangeThdVal"></vofill-select></vofill-row>
        </div>
    </div>
</template>

<script>
    import vofillRow from './row'
    import vofillSelect from './select'

    export default {
        name: "vofill-cascade",
        components: {
            vofillRow,
            vofillSelect
        },
        props: {              //prop接收传过来的参数
            "titleList": Array,
            "firList": Array,
            "secList": Array,
            "thdList": Array,
            "selObj": Object,
            "selKey": String
        },
        data () {
            return {
                localFirList: this.firList ? this.firList : [],
                localSecList: this.secList ? this.secList : [],
                localThdList: this.thdList ? this.thdList : []
            }
        },
        computed:{
            localSelObj() {
                if(this.selObj && this.selKey && this.selObj[this.selKey].length > 0) {
                    return {FirVal: this.selObj[this.selKey][0], SecVal: this.selObj[this.selKey][1], ThdVal: this.selObj[this.selKey][2]};
                } else {
                    return {FirVal: "", SecVal: "", ThdVal: ""};
                }
            }
        },
        methods: {
            toGetSecList(id) {
                this.$emit('notice-to-parent1', id);
            },
            toGetThdList(id) {
                this.$emit('notice-to-parent2', id);
            },
            toChangeThdVal(id) {
                this.$emit('notice-to-parent3', id);
            }
        },
        watch: {
            firList(nv) {
                this.localFirList = nv;
            },
            secList(nv) {
                this.localSecList = nv;
            },
            thdList(nv) {
                this.localThdList = nv;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .cascade {
        width: 100%;
        display: flex;
        color: var(--font-color);
    }

    .cascade .cc-item {
        width: 33.3%;
        display: flex;
    }

    .cc-item .row {
        padding: 0;
    }
</style>
