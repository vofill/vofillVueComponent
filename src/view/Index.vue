<style>
    @import "../style/reset.css";
    @import "../style/index.css";
</style>

<template>
    <div>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
  export default {
      name: 'HelloWorld',
      data () {
          return {
            msg: 'Welcome to Your 首页'
          }
      }
  }
</script>