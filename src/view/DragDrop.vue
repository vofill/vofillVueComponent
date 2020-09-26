<template>
    <div class="dragdrop-box">
        <vofill-drag-drop></vofill-drag-drop>
    </div>
</template>

<script>
    import vofillDragDrop from '../components/dragdrop'
    import vofillScroll from '../components/scroll'
    import vofill from "../js/common/vofill.js";

    export default {
        name: 'DragDrop',
        components: {
            vofillDragDrop,
            vofillScroll
        },
        data () {
            return {
                
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
        },
        watch: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dragdrop-box {
        width: 100%;
        height: 100%;
    }
</style>
