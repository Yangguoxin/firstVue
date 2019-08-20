<template>
  <div>
    <transition name="fade">
      <div class="test">{{nickName}}</div>
    </transition>
    <!--skeleton测试-->
    <div class="skeleton-c" action="http://www.baidu.com"></div>
    <button class="btn-click" @click="routerTest">点击测试{{mixinRes}}</button>
    <div class="border-test" ref="preInput" @click="openInput"></div>
    <input class="input-view" v-if="ishow" v-focus="ishow"/>
    <div @click.stop="preViewHandle" class="loading-img"></div>
    <div class="row-item">
      <div class="row-display">
        <div class="item">
          <div class="cycle"></div>
          <div class="line"></div>
        </div>
        <div class="content"></div>
      </div>
      <div class="item">
        <div class="cycle"></div>
        <div class="line"></div>
      </div>
      <div class="item"></div>
      <input type="checkbox"/>
    </div>
    <img style="width: 0.4rem; height: 0.4rem;background: white;" src="https://fb.blackfish.cn/fb/t1/G1/M00/01/B3/CiAgxVyCG-CIDWBjAAAXzO6OwGAAAGKngNpA-AAABfk714.png"/>
    <img style="width: 0.4rem; height: 0.4rem;background: white;" src="https://fb.blackfish.cn/fb/t1/G1/M00/01/B3/CiAgxVyCG-CIDWBjAAAXzO6OwGAAAGKngNpA-AAABfk714.png"/>
    <img style="width: 0.4rem; height: 0.4rem;background: white;" src="https://fb.blackfish.cn/fb/t1/G1/M00/01/B3/CiAgxVyCG-CIDWBjAAAXzO6OwGAAAGKngNpA-AAABfk714.png"/>
    <!--浮动和清除浮动-->
    <div class="float-c">
      <div class="float-item"></div>
      <div class="float-text">我爱神的箭静安寺简单介绍</div>
    </div>
    <div v-html="testEnter"></div>
    <!--盒子模型-->
    <div class="box-c">
      <div class="box-item"></div>
    </div>
    <div class="mid-c">
      <div class="mid">A</div>
    </div>
    <!--三角形-->
    <div class="trangle"></div>
    <!--canvas裁剪的图片-->
    <img class="img-container" :src="imgUrl"/>
    <baidu-map class="bm-view" :center="pointL" :zoom="20" :scroll-wheel-zoom="true">
      <bm-label v-if="positionL.lat" content="我" :position="positionL" :labelStyle="{color: 'red', fontSize : '24px'}" title="Hover me"/>
    </baidu-map>
  </div>
</template>

<script>

  let test = require('../js/module')
  import * as xiaohong from '../js/test'
  let newTest = () => require('../js/test')
  import { preView } from '../js/preView'
  import fMixins from '../mixins/firstMixins'
  import ajax from '../../../../util/ajax/index'
  import { loadingImg } from '../../../../util/canvas/index'
  import JSONP from '../../../../util/jsonp/index'
  export default {
    mixins: [fMixins],
    name: 'first',
    components: {
    },
    data() {
      return {
        ishow: true,
        pointL: {lng: 118.77807441, lat: 32.0572355},
        positionL: {lng: 0, lat: 0},
        imgUrl: '',
        testEnter: '1232131<br>llllllsdadasldaldla'
      }
    },
    methods: {
      routerTest () {
        this.$Toast.open({text: '我不是默认文字'})
        this.test()
        window.location.replace(`${window.location.href}#123`)
        console.log(this.positionL)
        // this.$router.push({
        //   path: '/submit/ygx'
        // })
      },
      preViewHandle () {
        preView()
      },
      openInput () {

        console.log('111111111111')
      },
      locationHandle () {
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((r) => {
          this.pointL.lng = r.point.lng
          this.pointL.lat = r.point.lat
          this.$set(this.positionL,'lng', this.pointL.lng)
          this.$set(this.positionL,'lat', this.pointL.lat)
          console.log(r.point.lng, r.point.lat)
        })
      },
      promise1 (res) {
        console.log(res)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('setTimeout1')
            resolve('promise1')
          }, 1000)
        })
      },
      promise2 (res) {
        console.log(res)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('setTimeout2')
            resolve('promise2')
          }, 2000)
        })
      },
      promise3 (res) {
        console.log(res)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('setTimeout3')
            resolve('promise3')
          }, 3000)
        })
      },
      test() {
        let data = {
          baseId: '1247087'
        }
        let postData = {
          data: JSON.stringify({baseId: '1247087'}),
          url: 'http://10.32.16.34:10300/ioi-web/fsh/ioi/shop/searchShopQq',
          method: 'POST',
          sync: true,
          success: (res) => {
            console.log('数据回调', res)
          }
        }
        let jsonpData = {
          url: 'http://10.11.32.230:7001/test',
          data: {baseId: '1247087'},
          callback: (data) => {
            console.log(data)
          }
        }
        JSONP(jsonpData)
        // ajax(postData)
        // fetch('http://10.32.16.34:10300/ioi-web/fsh/ioi/shop/searchShopQq', {
        //   body: JSON.stringify(data), // must match 'Content-Type' header
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   credentials: 'same-origin', // include, same-origin, *omit
        //   headers: {
        //     'user-agent': 'Mozilla/4.0 MDN Example',
        //     'content-type': 'application/json'
        //   },
        //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //   mode: 'cors', // no-cors, cors, *same-origin
        //   redirect: 'follow', // manual, *follow, error
        //   referrer: 'no-referrer', // *client, no-referrer
        // }).then(res => res.json()).then((res) => {
        //   console.log(res)
        // })
      }
    },
    computed: {
      nickName() {
        return decodeURIComponent(`test`)
      },
      mixinRes() {
        return this.mA + this.mB
      }
    },
    created() {
      this.locationHandle()
      console.log(newTest().default)
      setTimeout(() => {
        // this.$messageBox.open({title: '你是大狼狗'})
        // setTimeout(() => {
        //   this.$messageBox.close()
        // }, 2000)
      }, 3000)
      this.promise3().then(this.promise1).then(this.promise2).then((res) => {
        console.log(res)
      })
      loadingImg('https://ww3.sinaimg.cn/bmiddle/61e7f4aaly1g5hq7v8lf2j213l0m3kjl.jpg').then((res) => {
        this.imgUrl = res
      })
    },
    mounted () {
      this.$refs.preInput.click()
    }
  }
</script>

<style scoped>
  .bm-view {
    width: 3.75rem;
    height: 3rem;
  }
  .test{
    width: 3.75rem;
    height: 3.75rem;
    background: #ffffff;
    font-size: 0.3rem;
  }
  .border-test {
    width: 1px;
    border-style: solid;
    border-width: 3px 3px 3px 3px;
    border-color: red transparent transparent transparent;
  }

  .input-view {
    width: 1rem;
    height: 0.2rem;
  }

  .loading-img {
    background-image: url("https://fb.blackfish.cn/fb/t1/G1/M00/01/B3/CiAgxVyCG-CIDWBjAAAXzO6OwGAAAGKngNpA-AAABfk714.png");
    background-size: 100%;
    background-repeat: no-repeat;
    width: 0.4rem;
    height: 0.4rem;
    animation-name: cyclo;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: both;
    animation-play-state: running;
    /*animation: 3s ease-in 1s infinite reverse both running cyclo;*/
  }
  @keyframes cyclo {
    0% {transform: rotate(90deg)}
    100% {transform: rotate(360deg)}
  }
  .row-item {
    width: 3.75rem;
    padding: 0.12rem;
  }
  .item {
    width: 0.3rem;
    height: initial;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .line {
    height: 100%;
    width: 1px;
    background: black;
  }
  .row-display {
    width: 3.75rem;
    display: flex;
    flex-direction: row;
  }
  .cycle {
    width: 0.05rem;
    height: 0.05rem;
    border-radius: 0.3rem;
    background: red;
  }
  .row-display {
    flex: 1;
    height: 0.7rem;
    background: darkorange;
  }
  .float-c {
    background: darkorange;
    width: 100%;
    overflow: auto;
  }
  .float-item {
    float: left;
    width: 1.6rem;
    height: 0.4rem;
    background: rosybrown;
    box-sizing: border-box;
  }
  .float-text {

  }
  .box-c {
    width: 100px;
    height: 100px;
    padding: 10px 20px;
    border: 10px solid red;
    background: rebeccapurple;
  }
  .box-item {
    width: 100%;
    height: 100%;
    background: #ffffff;
  }
  .trangle {
    width: 1px;
    height: 1px;
    border-width: 10px 10px 0 10px;
    border-style: solid;
    border-color: red transparent transparent transparent;
  }
  .btn-click {
    width: 0.9rem;
    height: 0.44rem;
    border-radius: 0.04rem;
    border: none;
    background: darkorange;
    text-align: center;
    color: #f6f6f6;
    overflow: hidden;
    position: relative;
  }
  .btn-click:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
  }
  .btn-click:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
  }
  .skeleton-c {
    width: 1rem;
    height: 0.4rem;
    background-color: darkorange;
    position: relative;
  }
  .skeleton-c:before {
    content: '';
    width: 1rem;
    height: 0.4rem;
    background: black;
    opacity: 0.5;
  }
  .skeleton-c:after {
    content: '';
    width: 1rem;
    height: 0.4rem;
    background: black;
    opacity: 0.5;
  }
  .img-container {
    width: 1rem;
    height: 1rem;
  }
  .mid {
    width: calc(100vw - 20px);
    height: calc(50vw - 10px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: darkorange;
    font-size: 20px;
  }
  .mid-c {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .iframe-css {
    width: 3.75rem;
    border-radius: 0.2rem;
    border: none;
  }
</style>
