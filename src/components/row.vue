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
        },
        watch: {
            name(nv) {
                this.localkey = nv;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
