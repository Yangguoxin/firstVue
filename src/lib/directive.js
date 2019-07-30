import Vue from 'vue'
import {setMetaTitle} from '@/util'
// rem base iphone6
import {bindRem, unBindRem} from './rem'
// 动态设置 文档title
Vue.directive('title', function (el, binding) {
  if (binding.value !== binding.oldValue) {
    setMetaTitle(binding.value)
  }
})
// rem 动态适配
Vue.directive('rem', {
  inserted: function (el, binding) {
    if (binding.value === true) {
      bindRem()
    } else {
      unBindRem()
    }
  },
  unbind: function (el) {
    unBindRem()
  }
})
