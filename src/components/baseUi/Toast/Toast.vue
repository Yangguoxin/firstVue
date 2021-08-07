<template>
  <div>
    <div class="container" v-if="showFlag">
      <div class="text-container">{{obj.text}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        showFlag: false,
        obj: {
          text: '我是默认文字'
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.08rem;
  }
  .text-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
</style>
