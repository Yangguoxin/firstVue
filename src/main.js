import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './lib/directive'
import messageBox from './components/baseUi/messageBox/index'
import Toast from './components/baseUi/Toast/index'
import Vconsole from 'vconsole'
import BaiduMap from 'vue-baidu-map'

if (process.env.EGG_SERVER_ENV !== 'prod') {
  new Vconsole()
}
// 开启调试工具
// if (process.env.EGG_SERVER_ENV !== 'prod') {
//   var script = document.createElement('script')
//   script.src = '//static.blackfish.cn/lib/eruda/1.3.1/eruda.min.js'
//   script.async = true
//   document.getElementsByTagName('head')[0].appendChild(script)
//   script.onload = function () {
//     window.eruda.init()
//   }
// }
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'HlQBObc4VDLpXaOtsuLI5ZaqU6p1TDay'
})
Vue.prototype.$messageBox = messageBox
Vue.prototype.$Toast = Toast
Vue.config.productionTip = false

setTimeout(() => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}, 0)
