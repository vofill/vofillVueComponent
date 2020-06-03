/**
**按钮组件
**vofill
**2020-05-10
**/

<template>
    <div class="button">
        <button :class="[{'disabled': localDisabled==1}]" @click="buttonClick()"><i></i>{{localTitle}}</button>
    </div>
</template>

<script>
    export default {
        name: "vofill-button",
        props: {              //prop接收传过来的参数
            title: String,
            disabled: Number
        },
        data () {
            return {
                localDisabled: this.disabled ? this.disabled : 0,
                localTitle: this.title ? this.title : "按钮"
            }
        },
        methods: {
            buttonClick() {
                if(this.localDisabled) {
                    return false;
                }
                this.$emit('buttonClickToParent');
            }
        },
        watch: {
            disabled(nv) {
                this.localDisabled = nv;
            },
            title(nv) {
                this.localTitle = nv;
            }
        }
    }
</script>