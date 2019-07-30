<template>
  <div style="width: 100%;display: flex;align-items: center;justify-content: center">
    <div style="width: 50vw; height: 10vw;background: darkorange; color: white;display: flex;align-items: center;justify-content: center" @click.stop="openHandle">提交订单</div>
    <pay :payShowFlag="payShowFlag"></pay>
  </div>
</template>

<script>
  import pay from '../components/pay'
  export default {
    name: 'submit',
    components: {
      pay
    },
    data () {
      return {
        payShowFlag: {
          flag: false
        }
      }
    },
    methods: {
      openHandle () {
        this.payShowFlag.flag = true
      }
    }
  }
</script>

<style scoped>

</style>
