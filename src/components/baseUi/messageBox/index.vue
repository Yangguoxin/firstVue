<template>
  <div>
    <transition name="fade">
      <div v-show="showFlag" class="mask"></div>
    </transition>
    <transition name="bottom-to-top">
      <div v-show="showFlag" class="container">{{Obj.title}}</div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        showFlag: false,
        Obj: {}
      }
    }
  }
</script>

<style scoped>
  .mask {
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .container {
    background: #ffffff;
    position: fixed;
    z-index: 10001;
    height: 4rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .bottom-to-top-enter-active, .bottom-to-top-leave-active {
    transition: transform .4s;
  }
  .bottom-to-top-enter {
    transform: translateY(100%);
  }
  .bottom-to-top-leave-to {
    transform: translateY(100%);
  }
</style>
