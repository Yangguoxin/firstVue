export default {
  data() {
    return {
      mA: 1,
      mB: 2
    }
  },
  created() {
    console.log('我是mixins')
    this.add()
  },
  methods: {
    add() {
      console.log(this.mA + this.mB)
    }
  }
}
