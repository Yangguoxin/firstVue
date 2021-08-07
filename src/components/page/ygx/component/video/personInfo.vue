<template>
  <div class="container" v-html="htmlText"></div>
</template>

<script>
  export default {
    name: 'personInfo',
    data () {
      return {
        htmlText: '<div class="control"><p>我</p><br><p>我</p><br><p>我</p><br><p>我</p></div>'
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 0.4rem;
    height: auto;
    position: fixed;
    z-index: 2;
    background: green;
    right: 0.2rem;
    bottom: 1.5rem;
  }
</style>

<style lang="less">
  .control {
    p {
      color: #f6f6f6;
    }
  }
</style>
