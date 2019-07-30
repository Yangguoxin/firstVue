import Vue from 'vue'
import Index from './index.vue'
const Component = Vue.extend(Index)
let instance

let Self = {
  open(option) {
    if (!instance) {
      instance = new Component({
        el: document.createElement('div')
      })
    }
    if (instance.showFlag) return
    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      if (option) {
        instance.Obj = option
      }
      instance.showFlag = true
    })
  },

  close() {
    if (instance) {
      instance.showFlag = false
    }
  }
}
// 好货采用定制loading，其他平台依旧
export default Self
