<template>
  <div>
    <my-video></my-video>
    <ad-info></ad-info>
    <person-info></person-info>
  </div>
</template>

<script>
  import adInfo from '../component/video/adInfo'
  import personInfo from '../component/video/personInfo'
  import myVideo from '../component/video/myVideo'
  export default {
    components: {
      adInfo: adInfo,
      personInfo: personInfo,
      myVideo: myVideo
    },
    name: 'shareVideo'
  }
</script>

<style scoped>

</style>
