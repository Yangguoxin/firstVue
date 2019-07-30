<template>
  <transition name="bf-toast-pop">
    <div class="bf-toast"
         v-show="visible"
         :class="customClass">
      <img class="bf-toast__icon"
         :class="iconClass"
         :src="finalImageUrl"
         v-if="finalImageUrl">
      <span class="bf-toast__text" >{{ message }}</span>
    </div>
  </transition>
</template>



<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: require('./icon-complete@2x.png')
    },
    message: String,
    className: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    customClass() {
      var classes = []
      switch (this.position) {
        case 'top':
          classes.push('placetop')
          break
        case 'bottom':
          classes.push('placebottom')
          break
        default:
          classes.push('placemiddle')
      }
      classes.push(this.className)
      return classes.join(' ')
    },
    finalImageUrl() {
      if (this.imgUrl === 'success') {
        return require('./icon-complete@2x.png')
      } else if (this.imgUrl === 'fail') {
        return require('./icon_fail@2x.png')
      } else {
        return this.imgUrl
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bf-toast {
  position: fixed;
  max-width: 80%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  transition: opacity 0.3s linear;
  padding: 12px 36px;

  &__icon {
    display: inline-block;
    text-align: center;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    vertical-align: middle;
  }

  &__text {
    font-size: 16px;
    text-align: center;
    line-height: 24px;
    vertical-align: middle;
  }

  &.bf-toast.placetop {
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &.bf-toast.placemiddle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &.bf-toast.placebottom {
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &-pop-enter, &-pop-leave-active {
    opacity: 0;
  }
}
</style>
