<template>
  <div>
    <video id="video" class="video-c"
           @click.stop="clickHandle"
           playsinline
           crossorigin="anonymous"
           preload="false"
           src="https://fb.blackfish.cn/fb/t1/YWI2M2NmMTgtYjY1Mi00MjA2LWFjMzktZWI0ZWY2Yjc3NDM5.mp4"></video>
    <div v-if="showPlayFlag" class="turnOff" @click.stop="clickHandle"></div>
  </div>
</template>

<script>
  export default {
    name: 'myVideo',
    data() {
      return {
        showPlayFlag: true
      }
    },
    methods: {
      clickHandle () {
        let video = window.document.getElementById('video')
        if (this.showPlayFlag) {
          this.showPlayFlag = false
          video.play()
          return
        }
        this.showPlayFlag = true
        video.pause()
        console.log('点击视频')
      }
    },
    mounted() {
      let video = window.document.getElementById('video')
      video.addEventListener('ended', (res) => {
        this.showPlayFlag = true
      })
    }
  }
</script>

<style scoped>
  .video-c {
    width: 3.75rem;
    height: auto;
  }
  .turnOff {
    position: fixed;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 0.52rem;
    height: 0.52rem;
    background-image: url("../../img/icon_play@2x.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
