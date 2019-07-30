<template>
  <div id="app" v-rem="true">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
      name: 'app'
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.bottom-to-top-enter-active, .bottom-to-top-leave-active {
  transition: transform 0.6s;
}
.bottom-to-top-enter {
  transform: translateY(100%);
}
.bottom-to-top-leave-to {
  transform: translateY(100%);
}
</style>
