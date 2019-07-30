<template>
  <div>
    <transition name="fade">
      <div class="container">
        <!--支付输入框容器-->
        <div class="pay-p">
          <div class="pay-c">
            <!--关闭按钮-->
            <div class="close">
              <img src="../img/share_close.png"/>
            </div>
            <!--title-->
            <div class="title">请输入支付密码</div>
            <div class="input-c">
              <template v-for="(item,index) in numList">
                <div :key="index" class="password">{{passwordDisplay(item.value)}}</div>
                <div v-if="index<numList.length - 1" class="interval"></div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="bottom-to-top">
      <div class="keyboard-c">
        <div class="keyboard" v-for="(item, index) in mapNum" :key="index">
          <template v-for="(citem, cindex) in item">
            <button :key="cindex" v-if="citem > 0" class="item" @click.stop="inputHandle(citem)">{{citem}}</button>
            <div v-if="citem === ''" class="item-black"></div>
            <button v-if="citem === 0" class="item" @click.stop="inputHandle(citem)">{{citem}}</button>
            <button v-if="citem === 'back'" class="item-delete" @click.stop="backHandle">
              <img src="../img/back.png"/>
            </button>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'pay',
    data () {
      return {
        numList: [{
          key:1,
          value:''
        }, {
          key:2,
          value:''
        }, {
          key:3,
          value:''
        }, {
          key:4,
          value:''
        }, {
          key:5,
          value:''
        }, {
          key:6,
          value:''
        }],
        currentNumber: 0,
        mapNum: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          ['', 0, 'back']
        ]
      }
    },
    methods: {
      inputHandle (item) {
        if ( this.currentNumber <= 5) {
          this.numList[this.currentNumber].value = item
          this.currentNumber ++
          return
        }
      },
      backHandle () {
        if (this.currentNumber <= 0) {
          return
        }
        this.numList[this.currentNumber - 1].value = ''
        this.currentNumber--
      },
      outputPassword () {
        let password = []
        this.numList.forEach((item) => {
          password.push(item.value)
        })
        console.log(password)
      }
    },
    computed: {
      passwordDisplay () {
        return (value) => {
          if (value === '') {
            return ''
          }
          return '*'
        }
      }
    },
    watch: {
      currentNumber: {
        handler (newVal, oldVal) {
          if (newVal === 6) {
            this.outputPassword()
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(170, 170, 170, 1);
    height: 100vh;
    width: 100vw;
  }
  .pay-p {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 15vh;
  }
  .pay-c {
    width: 80vw;
    padding: 0.3rem 0.1rem 0.5rem 0.1rem;
    background: #FFFFFF;
    position: relative;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .title {
    margin-bottom: 0.1rem;
  }
  .close {
    width: 0.4rem;
    height: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .close img{
    width: 0.13rem;
    height: 0.13rem;
  }
  .input-c {
    border: 1px solid #AAAAAA;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
  }
  .password {
    width: 0.4rem;
    height: 0.4rem;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 0.16rem;
  }
  .interval {
    width: 1px;
    height: 0.4rem;
    background: #AAAAAA;
  }
  .keyboard-c {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: #ffffff;
    z-index: 2;
  }
  .keyboard {
    background: #AAAAAA;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .item {
    width: 33vw;
    height: 0.44rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    background: #ffffff;
    margin-bottom: 2px;
    position: relative;
    border: none;
    overflow: hidden;
  }
  .item:after {
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
  .item:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
  }
  .item-black {
    width: 33vw;
    height: 0.44rem;
    background: #AAAAAA;
    border: none;
  }
  .item-delete {
    width: 33vw;
    height: 0.44rem;
    background: #AAAAAA;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: none;
    overflow: hidden;
  }
  .item-delete:after {
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
  .item-delete:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
  }
  .item-delete img {
    width: 0.3rem;
    height: 0.3rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
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
