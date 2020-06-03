/**
**表单行组件
**vofill
**2020-05-03
**/

<template>
    <div class="row">
        <div class="r-key">{{localkey}}</div>
        <div class="r-val">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vofill-row",
        props: {              //prop接收传过来的参数
            "name": String
        },
        data () {
            return {
                localkey: this.name
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .row {
        width: 100%;
        display: flex;
        padding: 10px 0;
        color: var(--font-color);
    }
    
    .row .r-key {
        width: 120px;
        line-height: 40px;
        text-align: right;
    }

    .row .r-val {
        width: 100%;
    }

    .row.must .r-key:before {
        content: "*";
        color: var(--alert-color);
    }
</style>
