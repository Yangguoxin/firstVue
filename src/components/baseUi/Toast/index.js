import Vue from 'vue'
import Toast from './Toast'
const ToastVue = Vue.extend(Toast)

let instance

let Self = {
  open(option) {
    if (!instance) {
      instance = new ToastVue({
        el: document.createElement('div')
      })
    }
    if (instance.showFlag) return
    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      if (option) {
        instance.obj = option
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
