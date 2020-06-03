<template>
    <div>
        <h1>{{ msg }}</h1>
        <div class="time-axis1">
        </div>
    </div>
</template>

<script>
    import vofillTimeAxis from '../components/timeaxis'
    import vofillScroll from '../components/scroll'

    export default {
        name: 'Table',
        components: {
            vofillTimeAxis,
            vofillScroll
        },
        data () {
            return {
                msg: 'Welcome to Your 时间轴组件页',
                scrollHeight: "780px"
            }
        },
        created() {
        },
        methods: {
        },
        watch: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .table-box {
        width: 800px;
        height: 700px;
    }
</style>
